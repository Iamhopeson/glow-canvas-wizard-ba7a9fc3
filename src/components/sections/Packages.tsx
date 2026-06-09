import { motion } from "framer-motion";
import { Check, Info } from "lucide-react";
import { PACKAGES } from "@/content/site";
import { useWizard } from "@/components/WizardContext";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function Packages() {
  const { openWizard } = useWizard();

  return (
    <section id="packages" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="text-xs uppercase tracking-[0.3em] text-accent mb-3">Service Packages</div>
          <h2 className="text-4xl md:text-5xl font-bold">
            Pick your <span className="neon-text">launchpad.</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Three transparent tiers. All include strategy, design, code, and launch — no surprises.
          </p>
        </div>

        <TooltipProvider delayDuration={150}>
          <div className="grid md:grid-cols-3 gap-6">
            {PACKAGES.map((pkg, i) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ scale: 1.02, y: -6 }}
                className={`relative glass-strong rounded-3xl p-7 flex flex-col group transition-shadow hover:shadow-[0_0_60px_-10px_var(--neon-violet)] ${
                  pkg.highlighted ? "neon-glow" : ""
                }`}
              >
                {pkg.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-widest rounded-full px-3 py-1 bg-primary text-primary-foreground font-semibold">
                    Most popular
                  </div>
                )}
                <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
                  {pkg.id}
                </div>
                <h3 className="text-2xl font-display font-bold">{pkg.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{pkg.tagline}</p>
                <div className="mt-6 flex items-baseline gap-2">
                  <span className="text-xs uppercase text-muted-foreground">{pkg.cadence}</span>
                  <span className="text-4xl font-display font-bold neon-text">{pkg.price}</span>
                </div>
                <ul className="mt-6 space-y-3 flex-1">
                  {pkg.features.map((f) => (
                    <li key={f.label} className="flex items-start gap-2.5 text-sm">
                      <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      <span className="text-foreground/90">{f.label}</span>
                      {f.hint && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button
                              type="button"
                              className="text-muted-foreground hover:text-foreground"
                              aria-label={`More info: ${f.label}`}
                            >
                              <Info className="w-3.5 h-3.5" />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">{f.hint}</TooltipContent>
                        </Tooltip>
                      )}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => openWizard(pkg.name)}
                  className={`mt-7 inline-flex items-center justify-center rounded-full px-5 py-3 font-semibold transition-transform active:scale-95 ${
                    pkg.highlighted
                      ? "bg-primary text-primary-foreground"
                      : "glass hover:bg-white/10"
                  }`}
                >
                  Select Plan
                </button>
              </motion.div>
            ))}
          </div>
        </TooltipProvider>
      </div>
    </section>
  );
}
