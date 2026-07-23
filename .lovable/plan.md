## Me.Studio — Light Portfolio Evolution

Thoughtful UI/UX evolution of the existing site. Preserves routing, wizard flow, Formspree/Cloud submission, WhatsApp/Calendly links, and content constants — replaces the dark neon aesthetic with a clean white + soft light-blue system, restructures the homepage to the reference layout, and repositions me.studio around "digital experiences with a Signature Feature."

### 1. Design system (`src/styles.css`)

Flip `:root` from dark to light:
- Background: near-white `oklch(0.99 0.006 240)`
- Foreground: deep slate `oklch(0.22 0.03 250)`
- Primary (light blue): `oklch(0.68 0.14 235)`
- Accent (soft sky): `oklch(0.88 0.07 230)`
- Card: pure white; border `oklch(0.22 0.03 250 / 8%)`
- New tokens: `--shadow-soft`, `--shadow-float`, `--gradient-sky` (white → very pale blue)
- Body background: swap violet/cyan radial orbs for one faint blue radial + subtle noise

Utilities:
- Replace `neon-glow` → `soft-glow` (light-blue shadow), `neon-text` → `blue-text` (blue→sky gradient clip). Keep old class names as aliases so unrelated components (wizard, packages) don't break.
- Add `float-card` utility (white bg, rounded-2xl, soft shadow, thin border).

### 2. Content (`src/content/site.ts`)

Extend, don't replace:
- Rewrite `CONTACT.hero` in direct voice: "Digital experiences built to give people a reason to come back. Websites, platforms, apps, POS systems, and custom systems — every build ships with a Signature Feature."
- New `SERVICES` array: 6 items (Business Websites, E-commerce Platforms, Web Applications, POS Systems, Digital Platforms, Custom Systems) with lucide icon name + short direct description.
- New `CAPABILITIES` array: same 6 categories with % values (95/90/85/80/75/70) — these represent portfolio depth, not personal skill.
- Extend `Project` type with `category` (union of the 6) and `signatureFeature: string`. Backfill the 3 existing projects and add 3 placeholders (POS, Web App, Digital Platform, Custom System) so every capability shows at least one project. Placeholder names/features flagged in code comments as "replace with real project".
- New `STATS` array (4 items) — truthful, non-numeric where numbers unknown: "Signature Feature in every build", "Custom code, no templates", "Mobile-first, 60fps", "Available for new projects".
- New `ME_STUDIO_TAG` array: 6 cards (title + uppercase description) matching the brief.
- Keep `CATEGORY_GROUPS`, `CATEGORIES`, `PACKAGES`, `REVIEWS`, `TECH_STACK` untouched so wizard + retained sections continue working.

### 3. Homepage structure (`src/routes/index.tsx`)

New section order:
1. `Nav` (new) — Home / Services / Works / Blog / Contact + me.studio wordmark; shadcn Sheet for mobile.
2. `Hero` (rewrite) — headline, direct supporting line, primary "Start a Project" (wizard), secondary "View Selected Work" (#portfolio), right-side visual = animated glass card stack hinting at Signature Feature.
3. `StatsBar` (new) — floating white rounded card with soft shadow, 4 cells, subtly overlapping hero/services divide.
4. `Services` (new) — horizontal snap-scroll row of 6 service cards on mobile, grid on desktop; hover lift + icon micro-motion.
5. `Capabilities` (new) — 6 interactive percentage bars; selecting one filters the portfolio grid below (state lifted into a `PortfolioSection` wrapper). `<button>` + `aria-pressed`, animated width via Framer Motion.
6. `Portfolio` (rewrite) — visual grid filtered by active capability; each card shows type, name, description, and a highlighted "SIGNATURE FEATURE: …" strip.
7. `MeStudioTag` (new) — 6 rounded cards with layered concentric circle background shapes (inspired by the uploaded card reference, but restricted to the white/blue palette), all-uppercase text, hover lift + soft expansion.
8. `FinalCTA` (new) — strong closing panel: "Start a project" (wizard) + WhatsApp secondary.
9. `Footer` (restyle to light).

Removed from homepage: `Categories` (industries filter) and `TechStack` — both replaced by the new `Services` + `Capabilities` sections per the reference structure. Files kept in the repo for potential reuse. `About`, `Packages`, `Reviews` retained but restyled to the light system and kept between `Portfolio` and `MeStudioTag` (Reviews) / after `MeStudioTag` (Packages, About) — see Q2 below.

### 4. Components

- **Rewrite for light system:** `Hero`, `Portfolio`, `Footer`, `About`, `Packages`, `Reviews`, `WhatsAppFab`.
- **New:** `Nav`, `StatsBar`, `Services`, `Capabilities`, `PortfolioSection` (wrapper owning `activeCategory` state), `MeStudioTag`, `FinalCTA`.
- **Untouched functionally (visual tokens only where they render):** Wizard steps, AudioPlayer, all `src/lib/*`, Supabase integration, server functions, routes.

### 5. Interaction & motion

- Framer Motion kept; all animations respect `useReducedMotion`.
- Capability bars animate width on view + on selection change; portfolio grid uses `AnimatePresence` with `layout` for filter transitions.
- Services row: horizontal snap on mobile with visible scroll cues, static grid on `md+`.
- Tag cards: `whileHover={{ y: -4 }}` + soft shadow bloom + faint scale on concentric background shape.

### 6. Responsive & a11y

- Mobile-first pass on every new section; tap targets ≥44px on capability bars; no horizontal overflow (services row uses `overflow-x-auto snap-x` on a padded container).
- Multi-widget rows use the grid + `min-w-0` + `shrink-0` pattern.
- Keyboard: nav uses shadcn Sheet; capability bars are `<button aria-pressed>`; portfolio filter changes announce via `aria-live="polite"` on the grid.
- Contrast checked: slate on white and blue on white ≥ AA.

### 7. SEO / head

- Update `/` route `head()` title + description to the new positioning:
  - title: "me.studio — Digital experiences built to give people a reason to come back."
  - description matches new hero copy.

### Out of scope

- No backend / schema / server-function / wizard-logic changes.
- No new npm dependencies.
- No changes to `/api/*`, Supabase files, or `src/integrations/*`.

### Technical notes

- Portfolio filtering: `PortfolioSection` owns `activeCategory` state and passes it to both `Capabilities` (for `aria-pressed` + visual active state) and `Portfolio` (for filtering). Default = first category with projects.
- Tag card layered visuals: pure CSS (absolutely-positioned concentric `rounded-full` divs with `bg-primary/8` etc.) — no images, no new deps.
- All colors via semantic tokens; no hardcoded hex outside `styles.css` and the project brand `colors` array (used inside device mockups only).

### Questions before I build

1. **Blog nav link** — there is no blog. Should it (a) route to a `/blog` "Coming soon" stub page, (b) be hidden from nav until real content exists, or (c) point to a #insights anchor on the homepage?
2. **Packages section on homepage** — the reference layout has no pricing. Keep the current Packages section on `/` (restyled light), move it into the wizard flow only, or drop from the homepage entirely?
3. **Placeholder projects** — 3 of the 6 capability categories (POS, Digital Platform, Custom System) have no real project. OK for me to add plausible placeholder cards clearly marked in code as "replace with real project", or should those categories show an empty state ("Projects coming soon — start a conversation") until you provide them?
