import { createFileRoute } from "@tanstack/react-router";
import { WizardProvider } from "@/components/WizardContext";
import { Hero } from "@/components/sections/Hero";
import { TechStack } from "@/components/sections/TechStack";
import { Portfolio } from "@/components/sections/Portfolio";
import { About } from "@/components/sections/About";
import { Packages } from "@/components/sections/Packages";
import { Categories } from "@/components/sections/Categories";
import { Reviews } from "@/components/sections/Reviews";
import { Footer } from "@/components/sections/Footer";
import { Wizard } from "@/components/wizard/Wizard";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "me.studio — Your Ideas, Brought to Life in 60fps." },
      {
        name: "description",
        content:
          "Freelance web developer building high-performing, interactive websites for businesses that refuse to blend in.",
      },
      { property: "og:title", content: "me.studio — Your Ideas, Brought to Life in 60fps." },
      {
        property: "og:description",
        content:
          "Custom websites, e-commerce, and web apps built with React, Tailwind, and Framer Motion.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <WizardProvider>
      <main className="relative">
        <Hero />
        <TechStack />
        <Portfolio />
        <About />
        <Packages />
        <Categories />
        <Reviews />
        <Footer />
      </main>
      <WhatsAppFab />
      <Wizard />
      <Toaster theme="dark" />
    </WizardProvider>
  );
}
