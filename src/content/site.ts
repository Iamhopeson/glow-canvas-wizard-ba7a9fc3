// =============================================================================
// me.studio — site content. Edit copy, pricing, and lists here.
// =============================================================================

export const CONTACT = {
  brand: "me.studio",
  tagline: "Build digital experiences that give people a reason to come back.",
  mission:
    "Every Me.Studio project includes one custom Signature Feature — a moment of delight, interaction, or utility engineered to make your site memorable.",
  hero:
    "Freelance web developer building fast, beautiful, and interactive websites for businesses that refuse to blend in.",
  whatsapp: "https://wa.me/message/BHTAM7LXUJE7I1",
  calendly: "https://calendly.com/dhopesond1/30min",
  formspree: "https://formspree.io/f/mqeobdnz",
  email: "hello@me.studio",
};

export const STATS = [
  { value: "6+", label: "Years experience" },
  { value: "40+", label: "Projects shipped" },
  { value: "24/7", label: "Client support" },
  { value: "60fps", label: "Every interaction" },
];

// -----------------------------------------------------------------------------
// Services — horizontal cards row
// -----------------------------------------------------------------------------
export type Service = {
  id: string;
  title: string;
  description: string;
  icon: "code" | "layout" | "shop" | "spark";
  tint: "sky" | "warm" | "mint" | "lilac";
};

export const SERVICES: Service[] = [
  {
    id: "web",
    title: "Web Development",
    description: "Custom sites built with React, Tailwind, and Framer Motion.",
    icon: "code",
    tint: "sky",
  },
  {
    id: "ui",
    title: "UI / UX Design",
    description: "Clean, conversion-focused interfaces with real design taste.",
    icon: "layout",
    tint: "warm",
  },
  {
    id: "ecom",
    title: "E-commerce",
    description: "Full storefronts with Stripe, subscriptions, and analytics.",
    icon: "shop",
    tint: "mint",
  },
  {
    id: "signature",
    title: "Signature Feature",
    description: "One custom interaction, tool, or delight built just for you.",
    icon: "spark",
    tint: "lilac",
  },
];

// -----------------------------------------------------------------------------
// Capabilities — percentage bars ("Why choose me")
// -----------------------------------------------------------------------------
export type Capability = { name: string; value: number };

export const CAPABILITIES: Capability[] = [
  { name: "Front-end Development", value: 96 },
  { name: "Interaction & Motion Design", value: 92 },
  { name: "E-commerce & Payments", value: 88 },
  { name: "Backend & Databases", value: 82 },
  { name: "SEO & Performance", value: 90 },
];

// -----------------------------------------------------------------------------
// Me.Studio Tag — layered pastel cards
// -----------------------------------------------------------------------------
export type Tag = {
  id: string;
  title: string;
  copy: string;
  tint: "sky" | "warm" | "mint" | "lilac";
  icon: "sparkles" | "compass" | "gift" | "crown";
};

export const ME_STUDIO_TAG: Tag[] = [
  {
    id: "signature",
    title: "Signature Feature",
    copy: "One custom interaction engineered to make your site unforgettable.",
    tint: "lilac",
    icon: "sparkles",
  },
  {
    id: "identity",
    title: "Brand Voice",
    copy: "Design and copy tuned to how your customers actually think.",
    tint: "sky",
    icon: "compass",
  },
  {
    id: "delivery",
    title: "Fast Delivery",
    copy: "Most projects ship in 5–14 days with daily preview links.",
    tint: "warm",
    icon: "gift",
  },
  {
    id: "care",
    title: "Post-launch Care",
    copy: "Real support after go-live — no ghosting, no ticket queues.",
    tint: "mint",
    icon: "crown",
  },
];

// -----------------------------------------------------------------------------
// Pricing
// -----------------------------------------------------------------------------
export type Package = {
  id: "starter" | "growth" | "enterprise";
  name: string;
  price: string;
  cadence: string;
  tagline: string;
  features: { label: string; hint?: string }[];
  highlighted?: boolean;
};

export const PACKAGES: Package[] = [
  {
    id: "starter",
    name: "Starter / Landing Page",
    price: "$255",
    cadence: "one-time",
    tagline: "A high-converting single page to launch fast.",
    features: [
      { label: "1-page custom design", hint: "Tailored to your brand" },
      { label: "Mobile-first responsive build" },
      { label: "Contact form + WhatsApp CTA" },
      { label: "Basic SEO + analytics", hint: "Meta tags, OG image, GA4" },
      { label: "5-day delivery" },
    ],
  },
  {
    id: "growth",
    name: "Business / Growth",
    price: "$510",
    cadence: "one-time",
    tagline: "Multi-page website built to grow leads and trust.",
    highlighted: true,
    features: [
      { label: "Up to 6 custom pages" },
      { label: "Booking / lead capture flow" },
      { label: "Framer Motion animations" },
      { label: "Blog or services CMS", hint: "Editable by you" },
      { label: "Performance + SEO pass" },
      { label: "2 weeks of post-launch support" },
    ],
  },
  {
    id: "enterprise",
    name: "E-commerce / Enterprise",
    price: "$680",
    cadence: "from",
    tagline: "Full storefront or web app with custom logic.",
    features: [
      { label: "Custom storefront or web app" },
      { label: "Payments + auth integration" },
      { label: "Admin dashboard" },
      { label: "Email + WhatsApp automations" },
      { label: "Realtime data + database design" },
      { label: "30 days of priority support" },
    ],
  },
];

// -----------------------------------------------------------------------------
// Projects — filterable grid
// -----------------------------------------------------------------------------
export const PROJECT_FILTERS = [
  "All",
  "Web",
  "E-commerce",
  "Small Business",
  "App",
] as const;
export type ProjectFilter = (typeof PROJECT_FILTERS)[number];

export type Project = {
  id: string;
  name: string;
  type: string;
  filter: Exclude<ProjectFilter, "All">;
  description: string;
  signature: string;
  tags: string[];
  colors: [string, string];
};

export const PROJECTS: Project[] = [
  {
    id: "tech",
    name: "Nimbus AI",
    type: "Tech Startup",
    filter: "Web",
    description: "Landing site and dashboard for an AI infra startup.",
    signature: "Live model latency ticker in the hero.",
    tags: ["React", "Framer Motion", "Vercel"],
    colors: ["#7dd3fc", "#a5b4fc"],
  },
  {
    id: "ecom",
    name: "Heritage Roasters",
    type: "E-commerce",
    filter: "E-commerce",
    description: "Custom storefront with subscriptions and live brew tutorials.",
    signature: "Interactive brew guide with grind-size slider.",
    tags: ["Next", "Stripe", "Shopify"],
    colors: ["#fdba74", "#f9a8d4"],
  },
  {
    id: "smb",
    name: "Rapid Plumbing Co.",
    type: "Local Service",
    filter: "Small Business",
    description: "Services site with instant WhatsApp booking flow.",
    signature: "One-tap emergency call handoff with pre-filled details.",
    tags: ["TanStack", "Tailwind", "Cloud"],
    colors: ["#86efac", "#7dd3fc"],
  },
  {
    id: "salon",
    name: "Studio 21 Salon",
    type: "Beauty",
    filter: "Small Business",
    description: "Booking-first site for a boutique salon.",
    signature: "Stylist-picker with real portfolio previews.",
    tags: ["React", "Supabase", "Calendly"],
    colors: ["#f9a8d4", "#c4b5fd"],
  },
  {
    id: "fit",
    name: "Northline Fitness",
    type: "Wellness App",
    filter: "App",
    description: "Habit tracker with weekly momentum charts.",
    signature: "Streak flame that reacts to your consistency.",
    tags: ["React", "Charts", "PWA"],
    colors: ["#fdba74", "#fca5a5"],
  },
  {
    id: "shop",
    name: "Loom & Lace",
    type: "Fashion Retail",
    filter: "E-commerce",
    description: "Editorial-style shop with lookbook storytelling.",
    signature: "Scroll-driven lookbook that plays like a film.",
    tags: ["Next", "Stripe", "Sanity"],
    colors: ["#fbcfe8", "#ddd6fe"],
  },
];

export const TECH_STACK = [
  { name: "React", color: "#38bdf8" },
  { name: "TypeScript", color: "#3178c6" },
  { name: "Tailwind", color: "#0ea5e9" },
  { name: "Framer", color: "#a78bfa" },
  { name: "Next.js", color: "#0f172a" },
  { name: "Supabase", color: "#10b981" },
  { name: "Node", color: "#65a30d" },
  { name: "Stripe", color: "#635bff" },
];

export const REVIEWS = [
  {
    name: "Priya N.",
    role: "Founder, Nimbus AI",
    quote:
      "He shipped a beautiful, fast site in 9 days. Our conversion rate doubled in the first month.",
  },
  {
    name: "Marco L.",
    role: "Owner, Heritage Roasters",
    quote:
      "The details make our brand feel premium. Customers actually screenshot pages and share them.",
  },
  {
    name: "Sarah K.",
    role: "Rapid Plumbing Co.",
    quote:
      "Bookings went through the roof. The WhatsApp flow he built is genius for a service business.",
  },
  {
    name: "Daniel V.",
    role: "CTO, FlowOps",
    quote:
      "Clean, modular code. Easy to hand off and extend. Best freelance dev experience we've had.",
  },
];

// Backwards-compat exports (legacy imports)
export const CATEGORY_GROUPS = ["All"] as const;
export const CATEGORIES: { name: string; group: string; icon: string }[] = [];
