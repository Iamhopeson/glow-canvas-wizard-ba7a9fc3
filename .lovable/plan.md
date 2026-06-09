
# me.studio — Portfolio & Client Onboarding Engine

A dark, glassmorphic single-site portfolio for **me.studio** with a 3-step client onboarding wizard, voice-to-text intake, file uploads, and Formspree delivery. Lovable Cloud handles file storage and a submissions log.

## Pages & sections (single route `/`)

1. **Hero** — full-viewport. Tagline: "Your Ideas, Brought to Life in 60fps." Subhead: "High-performing web development for businesses that refuse to blend in. Interactive, fast, and designed to grow your revenue." Primary CTA "Get Started" → opens wizard. Secondary "See work" → scrolls to portfolio. Subtle animated gradient/noise background, magnetic cursor on CTA.
2. **Tech Stack visualizer** — floating React/Tailwind/Vercel/TS/Framer/Supabase icon cloud that parallax-tracks the mouse (Framer Motion springs).
3. **Portfolio grid** — 3 polished placeholder projects (Tech Startup, E-commerce, Small Biz) in laptop/phone device mockups; on hover, a looping muted screen-capture preview plays inside the mockup frame.
4. **About + Audio** — short bio with a custom-built glass audio player (play/pause, scrub, waveform-style progress) for a voice-over file in `/public/audio/intro.mp3` (placeholder until user supplies).
5. **Service Packages** — 3 tiers ("Starter / Landing Page", "Business / Growth", "E-commerce / Enterprise"). Data lives in a single `PACKAGES` constant at top of the file (name, price, features[], cta). Cards: glass + neon glow on hover, hover-scale, tooltips on feature rows. Each "Select Plan" opens the wizard prefilled with that tier.
6. **Business Categories** — filterable grid (All / Trades / Beauty / Food / Professional / Auto / Fitness). Categories: Plumbers, Roofing, Locksmiths, Hair/Beauty Salons, Auto Repairs, Gyms, Laundry, Electricians, Painters, Moving, Barber Shops, Spas, Car Wash, Florists, Restaurants, Bakeries, Accountants, Cafes, Dentists, Lawyers (+"and more" tile).
7. **Reviews** — testimonial cards that slide/fade in on scroll (IntersectionObserver + Framer Motion).
8. **Footer** — quick links, socials, WhatsApp, Calendly.

## Client Onboarding Wizard (modal)

Triggered by any "Get Started" / "Select Plan" CTA. Framer Motion `AnimatePresence` for step transitions (slide + fade, 60fps spring).

- **Step 1 — Basics**: Name, Email, Phone, Business Name. Zod-validated.
- **Step 2 — The Vision**: Project description textarea + "🎙 Speak your idea" (Web Speech API `SpeechRecognition`, live transcript appended to textarea, graceful fallback message if unsupported). Competitor URL, Timeline (select), Biggest problem to solve.
- **Step 3 — Inspiration upload**: Drag-and-drop zone (react-dropzone) accepting images/PDF/logo files, visual chip list of attached files with thumbnails + remove. Files upload to Lovable Cloud Storage bucket `intake-uploads` (private, signed URLs).
- **Step 4 — Review**: Pretty summary of all fields + file list, plus a collapsible "View JSON" block showing the final payload.
- **Submit** → POSTs JSON to `https://formspree.io/f/mqeobdnz` (text fields + signed file URLs), inserts a row into `submissions` table via a server fn, then plays a morphing checkmark success animation.
- **Post-success screen**: "Book a Strategy Call" → opens `https://calendly.com/dhopesond1/30min` in a new tab.
- **Persistent in-modal help**: floating "Stuck? Message me on WhatsApp" pill → `https://wa.me/message/BHTAM7LXUJE7I1`.

A global floating WhatsApp button also sits bottom-right on the whole site.

## Design system

- Dark base `#07070b`, surfaces with glass (`backdrop-blur`, low-opacity white borders).
- Neon accents: electric violet `#8b5cf6` + cyan `#22d3ee`, used sparingly for glow/CTA.
- Typography: Space Grotesk (display) + Inter (body), loaded via `<link>` in `__root.tsx`, registered in `@theme` in `src/styles.css`.
- All colors as semantic tokens in `src/styles.css` (oklch), used via Tailwind classes — no hard-coded hex in components.
- Motion: Framer Motion springs everywhere; respect `prefers-reduced-motion`.

## Backend (Lovable Cloud)

- Storage bucket `intake-uploads` (private). Upload via server fn that returns signed URLs included in the Formspree payload.
- Table `public.submissions` (id, created_at, name, email, phone, business_name, tier, payload jsonb, file_urls text[]). RLS: no anon access; inserts via `supabaseAdmin` inside a server fn. Standard GRANTs + `service_role` ALL.
- Server fn `submitIntake` (createServerFn POST): validates with Zod, inserts row, forwards JSON to Formspree, returns `{ ok: true }`.
- No auth required for visitors.

## Technical notes

- TanStack Start, single `/` route with section components; `head()` set for SEO (title, description, OG).
- Framer Motion for all animation. `react-dropzone` for uploads. `zod` for validation. No Three.js / WebGL.
- File layout: `src/routes/index.tsx` orchestrates sections; each section in `src/components/sections/*`; wizard in `src/components/wizard/*` with one file per step; `PACKAGES`, `CATEGORIES`, `PROJECTS` constants exported from `src/content/site.ts` for easy editing.
- Server fn in `src/lib/intake.functions.ts` (admin import inside handler).
- Placeholder media generated with imagegen; portfolio "video previews" use short generated MP4s or animated CSS mock until real recordings are provided.

## Out of scope (call out)

- Real voice-over file — using a silent placeholder MP3 until you upload one.
- Real portfolio screen recordings — using animated mockup frames as stand-ins.
