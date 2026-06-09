// =============================================================================
// me.studio — site content. Edit copy, pricing, and lists here.
// =============================================================================

export const CONTACT = {
  brand: "me.studio",
  tagline: "Your Ideas, Brought to Life in 60fps.",
  hero:
    "High-performing web development for businesses that refuse to blend in. Interactive, fast, and designed to grow your revenue.",
  whatsapp: "https://wa.me/message/BHTAM7LXUJE7I1",
  calendly: "https://calendly.com/dhopesond1/30min",
  formspree: "https://formspree.io/f/mqeobdnz",
  email: "hello@me.studio",
};

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

export type Category = { name: string; group: string; icon: string };

export const CATEGORY_GROUPS = [
  "All",
  "Trades",
  "Beauty",
  "Food",
  "Professional",
  "Auto",
  "Fitness",
] as const;

export const CATEGORIES: Category[] = [
  { name: "Plumbers", group: "Trades", icon: "🔧" },
  { name: "Roofing", group: "Trades", icon: "🏠" },
  { name: "Locksmiths", group: "Trades", icon: "🔑" },
  { name: "Electricians", group: "Trades", icon: "⚡" },
  { name: "Painters", group: "Trades", icon: "🎨" },
  { name: "Moving", group: "Trades", icon: "📦" },
  { name: "Hair / Beauty Salons", group: "Beauty", icon: "💇" },
  { name: "Barber Shops", group: "Beauty", icon: "💈" },
  { name: "Spas", group: "Beauty", icon: "🧖" },
  { name: "Florists", group: "Beauty", icon: "🌸" },
  { name: "Restaurants", group: "Food", icon: "🍽️" },
  { name: "Bakeries", group: "Food", icon: "🥐" },
  { name: "Cafes", group: "Food", icon: "☕" },
  { name: "Laundry", group: "Professional", icon: "🧺" },
  { name: "Accountants", group: "Professional", icon: "📊" },
  { name: "Dentists", group: "Professional", icon: "🦷" },
  { name: "Lawyers", group: "Professional", icon: "⚖️" },
  { name: "Auto Repairs", group: "Auto", icon: "🔩" },
  { name: "Car Wash", group: "Auto", icon: "🚿" },
  { name: "Gyms", group: "Fitness", icon: "🏋️" },
];

export type Project = {
  id: string;
  name: string;
  type: string;
  description: string;
  tags: string[];
  device: "laptop" | "phone";
  colors: [string, string];
};

export const PROJECTS: Project[] = [
  {
    id: "tech",
    name: "Nimbus AI",
    type: "Tech Startup",
    description: "Landing site and dashboard for an AI infra startup. Cut their bounce rate by 38%.",
    tags: ["React", "Framer Motion", "Vercel"],
    device: "laptop",
    colors: ["#8b5cf6", "#22d3ee"],
  },
  {
    id: "ecom",
    name: "Heritage Roasters",
    type: "E-commerce",
    description: "Custom Shopify storefront with subscriptions and live brewing tutorials.",
    tags: ["Next", "Stripe", "Shopify"],
    device: "phone",
    colors: ["#f59e0b", "#ef4444"],
  },
  {
    id: "smb",
    name: "Rapid Plumbing Co.",
    type: "Small Biz",
    description: "Local services site with instant WhatsApp booking. 3.2x lead increase.",
    tags: ["TanStack", "Tailwind", "Cloud"],
    device: "laptop",
    colors: ["#10b981", "#0ea5e9"],
  },
];

export const TECH_STACK = [
  { name: "React", color: "#61dafb" },
  { name: "TypeScript", color: "#3178c6" },
  { name: "Tailwind", color: "#38bdf8" },
  { name: "Framer", color: "#bf5af2" },
  { name: "Vercel", color: "#ffffff" },
  { name: "Next.js", color: "#ffffff" },
  { name: "Supabase", color: "#3ecf8e" },
  { name: "Node", color: "#8cc84b" },
  { name: "Stripe", color: "#635bff" },
  { name: "GitHub", color: "#ffffff" },
  { name: "Figma", color: "#f24e1e" },
  { name: "GSAP", color: "#88ce02" },
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
      "The animations make our brand feel premium. Customers actually screenshot pages and share them.",
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
