// =============================================================================
// me.studio — site content. Edit copy, pricing, and lists here.
// =============================================================================

export const CONTACT = {
  brand: "me.studio",
  tagline: "Digital experiences built to give people a reason to come back.",
  mission:
    "Every Me.Studio project includes one custom Signature Feature — a digital moment engineered around the business so users have a reason to return.",
  hero:
    "Websites, e-commerce, POS systems, dashboards, and custom platforms — built as digital experiences, not brochures.",
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
// Services — direct, descriptive copy
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
    title: "Business Websites",
    description:
      "Custom websites built for customer engagement, discovery, and trust.",
    icon: "code",
    tint: "sky",
  },
  {
    id: "ui",
    title: "UX & Interface Design",
    description:
      "Astonishing UX design for digital products people actually enjoy using.",
    icon: "layout",
    tint: "warm",
  },
  {
    id: "ecom",
    title: "E-commerce & POS",
    description:
      "Storefronts and POS systems built for repeat purchases and smarter operations.",
    icon: "shop",
    tint: "mint",
  },
  {
    id: "signature",
    title: "Signature Feature",
    description:
      "One custom digital experience designed to give users a reason to return.",
    icon: "spark",
    tint: "lilac",
  },
];

// -----------------------------------------------------------------------------
// Portfolio categories — displayed as interactive percentage bars.
// Selecting a bar filters the Portfolio grid below.
// -----------------------------------------------------------------------------
export const PROJECT_FILTERS = [
  "All",
  "Business Websites",
  "E-commerce Platforms",
  "POS Systems",
  "Web Applications",
  "Digital Platforms",
  "Custom Systems",
] as const;
export type ProjectFilter = (typeof PROJECT_FILTERS)[number];

export type Capability = { name: Exclude<ProjectFilter, "All">; value: number };

export const CAPABILITIES: Capability[] = [
  { name: "Business Websites", value: 95 },
  { name: "E-commerce Platforms", value: 90 },
  { name: "POS Systems", value: 85 },
  { name: "Web Applications", value: 80 },
  { name: "Digital Platforms", value: 75 },
  { name: "Custom Systems", value: 70 },
];

// -----------------------------------------------------------------------------
// Me.Studio Tag — visual quality standards (UPPERCASE content)
// -----------------------------------------------------------------------------
export type Tag = {
  id: string;
  title: string;
  copy: string;
  icon: "sparkles" | "compass" | "gift" | "crown" | "layout" | "shop";
};

export const ME_STUDIO_TAG: Tag[] = [
  {
    id: "signature",
    title: "SIGNATURE FEATURE",
    copy: "A CUSTOM DIGITAL EXPERIENCE DESIGNED TO GIVE USERS A REASON TO RETURN.",
    icon: "sparkles",
  },
  {
    id: "ux",
    title: "USER-FRIENDLY UX",
    copy: "CLEAR, COMFORTABLE, AND INTUITIVE EXPERIENCES BUILT FOR EVERY USER.",
    icon: "compass",
  },
  {
    id: "return",
    title: "RETURN VALUE",
    copy: "DIGITAL EXPERIENCES DESIGNED TO KEEP USERS ENGAGED BEYOND THE FIRST VISIT.",
    icon: "gift",
  },
  {
    id: "conversion",
    title: "CONVERSION THINKING",
    copy: "EXPERIENCES DESIGNED TO TURN ATTENTION INTO DISCOVERY, ENGAGEMENT, AND SALES.",
    icon: "shop",
  },
  {
    id: "mobile",
    title: "MOBILE-FIRST EXPERIENCE",
    copy: "SEAMLESS DIGITAL EXPERIENCES BUILT FOR USERS ON EVERY SCREEN.",
    icon: "layout",
  },
  {
    id: "quality",
    title: "ME.STUDIO QUALITY",
    copy: "A DISTINCTIVE STANDARD OF DESIGN, INTERACTION, AND DIGITAL EXPERIENCE.",
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
export type Project = {
  id: string;
  name: string;
  type: string;
  filter: Exclude<ProjectFilter, "All">;
  description: string;
  purpose: string;
  signature: string;
  returnValue: string;
  tags: string[];
  colors: [string, string];
};

export const PROJECTS: Project[] = [
  {
    id: "tech",
    name: "Nimbus AI",
    type: "Tech Startup",
    filter: "Business Websites",
    description: "Marketing site and product dashboard for an AI infrastructure startup.",
    purpose: "Lead generation and product credibility.",
    signature: "Live model latency ticker in the hero.",
    returnValue: "Visitors return to watch performance evolve in real time.",
    tags: ["React", "Framer Motion", "Vercel"],
    colors: ["#7dd3fc", "#a5b4fc"],
  },
  {
    id: "ecom",
    name: "Heritage Roasters",
    type: "Specialty Coffee",
    filter: "E-commerce Platforms",
    description: "Custom storefront with subscriptions and brew education.",
    purpose: "Repeat purchases and coffee discovery.",
    signature: "Interactive brew guide with grind-size slider.",
    returnValue: "Customers return to learn, brew, and reorder.",
    tags: ["Next", "Stripe", "Shopify"],
    colors: ["#fdba74", "#f9a8d4"],
  },
  {
    id: "smb",
    name: "Rapid Plumbing Co.",
    type: "Local Service",
    filter: "Business Websites",
    description: "Services site with instant WhatsApp booking flow.",
    purpose: "Fast lead capture for urgent service requests.",
    signature: "One-tap emergency call handoff with pre-filled details.",
    returnValue: "Trusted go-to link saved in customer phones.",
    tags: ["TanStack", "Tailwind", "Cloud"],
    colors: ["#86efac", "#7dd3fc"],
  },
  {
    id: "salon",
    name: "Studio 21 Salon",
    type: "Beauty",
    filter: "Digital Platforms",
    description: "Booking-first platform for a boutique salon.",
    purpose: "Stylist discovery and effortless booking.",
    signature: "Stylist-picker with real portfolio previews.",
    returnValue: "Clients rebook their favorite stylist in two taps.",
    tags: ["React", "Supabase", "Calendly"],
    colors: ["#f9a8d4", "#c4b5fd"],
  },
  {
    id: "fit",
    name: "Northline Fitness",
    type: "Wellness App",
    filter: "Web Applications",
    description: "Habit tracker with weekly momentum charts.",
    purpose: "Daily engagement and behavior change.",
    signature: "Streak flame that reacts to your consistency.",
    returnValue: "The streak itself becomes the reason to open the app.",
    tags: ["React", "Charts", "PWA"],
    colors: ["#fdba74", "#fca5a5"],
  },
  {
    id: "shop",
    name: "Loom & Lace",
    type: "Fashion Retail",
    filter: "E-commerce Platforms",
    description: "Editorial shop with lookbook storytelling.",
    purpose: "Style discovery and brand affinity.",
    signature: "Scroll-driven lookbook that plays like a film.",
    returnValue: "New drops feel like a new episode worth watching.",
    tags: ["Next", "Stripe", "Sanity"],
    colors: ["#fbcfe8", "#ddd6fe"],
  },
  {
    id: "pos",
    name: "Ember & Oak POS",
    type: "Restaurant Operations",
    filter: "POS Systems",
    description: "Full-service restaurant POS with kitchen display and analytics.",
    purpose: "Faster orders, fewer errors, sharper operations.",
    signature: "Live table-heatmap showing turnover in real time.",
    returnValue: "Managers open the dashboard daily to run smarter shifts.",
    tags: ["React", "Realtime", "Print"],
    colors: ["#fca5a5", "#fdba74"],
  },
  {
    id: "mall",
    name: "Northgate Mall",
    type: "Retail Destination",
    filter: "Digital Platforms",
    description: "Digital platform for a multi-tenant mall.",
    purpose: "Store, dining, and event discovery.",
    signature: "Interactive store finder with daily deals.",
    returnValue: "Shoppers check in for new offers before every visit.",
    tags: ["React", "Maps", "Cloud"],
    colors: ["#93c5fd", "#c4b5fd"],
  },
  {
    id: "custom",
    name: "Fleetline Ops",
    type: "Logistics Platform",
    filter: "Custom Systems",
    description: "Custom operations platform for a regional fleet.",
    purpose: "Route planning, dispatch, and driver accountability.",
    signature: "Live route board with drag-and-drop reassignments.",
    returnValue: "Dispatchers live inside the tool every working hour.",
    tags: ["React", "Node", "Postgres"],
    colors: ["#7dd3fc", "#86efac"],
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
      "Shipped a beautiful, fast site in 9 days. Conversion rate doubled in the first month.",
  },
  {
    name: "Marco L.",
    role: "Owner, Heritage Roasters",
    quote:
      "The details make the brand feel premium. Customers actually screenshot pages and share them.",
  },
  {
    name: "Sarah K.",
    role: "Rapid Plumbing Co.",
    quote:
      "Bookings went through the roof. The WhatsApp flow is genius for a service business.",
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
