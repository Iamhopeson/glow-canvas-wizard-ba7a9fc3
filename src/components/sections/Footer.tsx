import { CONTACT } from "@/content/site";
import { Calendar, MessageCircle, ArrowRight } from "lucide-react";
import { useWizard } from "@/components/WizardContext";

export function Footer() {
  const { openWizard } = useWizard();
  return (
    <footer className="relative px-6 pb-14 pt-8">
      <div className="max-w-6xl mx-auto">
        {/* CTA card */}
        <div className="card-float rounded-[2rem] p-8 md:p-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10 overflow-hidden relative">
          <span
            aria-hidden
            className="absolute -top-20 -right-16 w-72 h-72 rounded-full"
            style={{
              background:
                "radial-gradient(closest-side, color-mix(in oklab, var(--sky) 40%, white), transparent)",
            }}
          />
          <div className="relative">
            <h3 className="text-2xl md:text-4xl font-bold max-w-xl">
              Ready to build something people come back to?
            </h3>
            <p className="mt-3 text-muted-foreground max-w-lg">
              Tell me about your project. I'll reply within 24 hours with a
              plan, a timeline, and a fixed quote.
            </p>
          </div>
          <button
            onClick={() => openWizard()}
            className="relative shrink-0 inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground font-semibold px-7 py-3.5 sky-glow hover:opacity-95 transition-opacity"
          >
            Start a project <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-6 justify-between items-center text-sm text-muted-foreground pt-6 border-t border-border">
          <div className="font-display font-bold text-foreground text-lg">{CONTACT.brand}</div>
          <div className="flex gap-3 flex-wrap justify-center">
            <a
              href={CONTACT.calendly}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-secondary rounded-full px-4 py-2 hover:bg-muted transition-colors"
            >
              <Calendar className="w-4 h-4" /> Book a call
            </a>
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-secondary rounded-full px-4 py-2 hover:bg-muted transition-colors"
            >
              <MessageCircle className="w-4 h-4" /> WhatsApp
            </a>
          </div>
          <div>© {new Date().getFullYear()} {CONTACT.brand}. Made in 60fps.</div>
        </div>
      </div>
    </footer>
  );
}
