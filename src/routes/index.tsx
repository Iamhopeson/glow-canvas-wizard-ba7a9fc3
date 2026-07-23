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
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "me.studio — Digital experiences worth coming back to." },
      {
        name: "description",
        content:
          "Freelance web developer building fast, interactive websites with a custom Signature Feature in every project.",
      },
      { property: "og:title", content: "me.studio — Digital experiences worth coming back to." },
      {
        property: "og:description",
        content:
          "Custom websites, e-commerce, and web apps built with React, Tailwind, and Framer Motion.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <WizardProvider>
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
    </WizardProvider>
  );
}
