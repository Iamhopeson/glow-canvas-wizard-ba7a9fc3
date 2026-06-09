import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const FileRefSchema = z.object({
  name: z.string().max(255),
  size: z.number().int().nonnegative(),
  type: z.string().max(120),
  path: z.string().max(500), // storage path inside intake-uploads bucket
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

export const submitIntake = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => IntakeSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    // Generate signed URLs (7 days) for each uploaded file path.
    const fileUrls: string[] = [];
    for (const f of data.files) {
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
      payload: data as unknown as Record<string, unknown>,
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
          fileUrls,
        }),
      });
    } catch (e) {
      console.error("[intake] formspree error:", e);
    }

    return { ok: true as const, fileUrls };
  });
