import { createFileRoute } from "@tanstack/react-router";
import { WizardProvider } from "@/components/WizardContext";
import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { StatsBar } from "@/components/sections/StatsBar";
import { Services } from "@/components/sections/Services";
import { Capabilities } from "@/components/sections/Capabilities";
import { Portfolio } from "@/components/sections/Portfolio";
import { MeStudioTag } from "@/components/sections/MeStudioTag";
import { Packages } from "@/components/sections/Packages";
import { About } from "@/components/sections/About";
import { Reviews } from "@/components/sections/Reviews";
import { Footer } from "@/components/sections/Footer";
import { Wizard } from "@/components/wizard/Wizard";
import { WorkFilterProvider } from "@/components/WorkFilterContext";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { Toaster } from "@/components/ui/sonner";
import { CookieConsent } from "@/components/CookieConsent";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Derrick Hopeson | Software Developer @ me.studio" },
      {
        name: "description",
        content:
          "Derrick Hopeson (mestudioo) builds custom websites, mobile apps and UI/UX design — fast, secure, conversion-focused products people come back to.",
      },
      { property: "og:title", content: "Derrick Hopeson | Software Developer @ me.studio" },
      {
        property: "og:description",
        content:
          "Derrick Hopeson (mestudioo) builds custom websites, mobile apps and UI/UX design — fast, secure, conversion-focused products people come back to.",
      },
      { property: "og:url", content: "https://mestudioo.com/" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Derrick Hopeson | Software Developer @ me.studio" },
      {
        name: "twitter:description",
        content:
          "Derrick Hopeson (mestudioo) builds custom websites, mobile apps and UI/UX design — fast, secure, conversion-focused products people come back to.",
      },

    ],
    links: [{ rel: "canonical", href: "https://mestudioo.com/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          provider: { "@type": "Organization", name: "me.studio", url: "https://mestudioo.com" },
          name: "Web development & design",
          areaServed: "Worldwide",
          description:
            "Custom websites, e-commerce, and web apps — each including a bespoke Signature Feature.",
          offers: [
            { "@type": "Offer", name: "Starter / Landing Page", price: "255", priceCurrency: "USD" },
            { "@type": "Offer", name: "Business / Growth", price: "510", priceCurrency: "USD" },
            { "@type": "Offer", name: "E-commerce / Enterprise", price: "680", priceCurrency: "USD" },
          ],
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <WizardProvider>
      <WorkFilterProvider>
        <Nav />
        <main className="relative">
          <Hero />
          <StatsBar />
          <Services />
          <Capabilities />
          <Portfolio />
          <MeStudioTag />
          <Packages />
          <About />
          <Reviews />
          <Footer />
        </main>
        <WhatsAppFab />
        <Wizard />
        <Toaster />
        <CookieConsent />
      </WorkFilterProvider>
    </WizardProvider>
  );
}
