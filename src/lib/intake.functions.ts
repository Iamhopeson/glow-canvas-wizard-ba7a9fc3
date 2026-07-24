import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const FileRefSchema = z.object({
  name: z.string().max(255),
  size: z.number().int().nonnegative(),
  type: z.string().max(120),
  path: z.string().max(500), // storage path inside intake-uploads bucket
  token: z.string().max(200), // HMAC token proving this path was issued by the server
});

const IntakeSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(40).optional().default(""),
  businessName: z.string().trim().max(160).optional().default(""),
  tier: z.string().trim().max(40).optional().default(""),
  description: z.string().trim().max(4000).optional().default(""),
  competitorUrl: z.string().trim().max(500).optional().default(""),
  timeline: z.string().trim().max(80).optional().default(""),
  biggestProblem: z.string().trim().max(1000).optional().default(""),
  files: z.array(FileRefSchema).max(15).default([]),
});

export type IntakeInput = z.infer<typeof IntakeSchema>;

// HMAC-sign a storage path so submitIntake can verify the caller actually
// obtained the path from us (rather than guessing another visitor's path).
async function signPath(path: string): Promise<string> {
  const secret = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!secret) throw new Error("Server misconfigured: missing signing key");
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(path));
  const bytes = new Uint8Array(sig);
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function timingSafeEqualStr(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let out = 0;
  for (let i = 0; i < a.length; i++) out |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return out === 0;
}

const IssueUploadInput = z.object({
  filename: z.string().trim().min(1).max(255),
  contentType: z.string().trim().max(120).optional().default(""),
});

// Issues a server-generated storage path (client cannot influence the folder)
// plus an HMAC token that submitIntake requires to accept the path.
export const issueUploadTarget = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => IssueUploadInput.parse(data))
  .handler(async ({ data }) => {
    const safeName = data.filename.replace(/[^\w.\-]+/g, "_").slice(0, 120);
    const path = `${Date.now()}-${crypto.randomUUID()}/${safeName}`;
    const token = await signPath(path);
    return { path, token };
  });

export const submitIntake = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => IntakeSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    // Verify every path was issued by this server before signing URLs for it.
    // Prevents callers from submitting arbitrary/guessed paths belonging to other visitors.
    const verifiedFiles: typeof data.files = [];
    for (const f of data.files) {
      const expected = await signPath(f.path);
      if (timingSafeEqualStr(expected, f.token)) {
        verifiedFiles.push(f);
      } else {
        console.warn("[intake] rejected unverified file path");
      }
    }

    // Generate signed URLs (7 days) for verified paths — server-side use only.
    const fileUrls: string[] = [];
    for (const f of verifiedFiles) {
      const { data: signed } = await supabaseAdmin.storage
        .from("intake-uploads")
        .createSignedUrl(f.path, 60 * 60 * 24 * 7);
      if (signed?.signedUrl) fileUrls.push(signed.signedUrl);
    }

    // Insert into submissions table.
    const { error: insertError } = await supabaseAdmin.from("submissions" as never).insert({
      name: data.name,
      email: data.email,
      phone: data.phone,
      business_name: data.businessName,
      tier: data.tier,
      payload: { ...data, files: verifiedFiles } as unknown as Record<string, unknown>,
      file_urls: fileUrls,
    } as never);
    if (insertError) {
      console.error("[intake] insert error:", insertError.message);
      throw new Error("Could not save your request. Please try again.");
    }

    // Forward to Formspree (best-effort).
    try {
      await fetch("https://formspree.io/f/mqeobdnz", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `New project request — ${data.businessName || data.name}`,
          ...data,
          files: verifiedFiles,
          fileUrls,
        }),
      });
    } catch (e) {
      console.error("[intake] formspree error:", e);
    }

    return { ok: true as const };
  });
