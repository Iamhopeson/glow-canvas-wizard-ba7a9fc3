import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useWizard } from "@/components/WizardContext";
import { CONTACT } from "@/content/site";

export function Hero() {
  const { openWizard } = useWizard();
  const reduce = useReducedMotion();

  return (
    <section id="top" className="relative pt-36 md:pt-44 pb-16 px-6 overflow-hidden">
      {!reduce && (
        <>
          <motion.div
            aria-hidden
            className="absolute -top-24 -left-24 w-[36rem] h-[36rem] rounded-full blur-3xl opacity-40"
            style={{ background: "radial-gradient(closest-side, var(--sky-soft), transparent)" }}
            animate={{ x: [0, 40, -30, 0], y: [0, -30, 20, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden
            className="absolute -bottom-32 right-0 w-[28rem] h-[28rem] rounded-full blur-3xl opacity-30"
            style={{ background: "radial-gradient(closest-side, color-mix(in oklab, var(--warm) 40%, transparent), transparent)" }}
            animate={{ x: [0, -30, 20, 0], y: [0, 20, -20, 0] }}
            transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}

      <div className="relative z-10 max-w-6xl mx-auto grid lg:grid-cols-[1.15fr_0.85fr] gap-14 items-center">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="chip"
          >
            <Sparkles className="w-3.5 h-3.5" /> Freelance · Available for new projects
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08 }}
            className="mt-5 text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.02]"
          >
            Digital experiences <br className="hidden md:block" />
            built to give people a{" "}
            <span className="sky-text">reason to come back.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 text-base md:text-lg text-muted-foreground max-w-xl"
          >
            {CONTACT.hero} Every project includes one custom{" "}
            <span className="font-semibold text-foreground">Signature Feature</span> —
            a moment of delight or utility built just for your brand.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.32 }}
            className="mt-8 flex flex-col sm:flex-row gap-3"
          >
            <button
              onClick={() => openWizard()}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground font-semibold px-7 py-3.5 sky-glow hover:opacity-95 transition-opacity"
            >
              Start a project
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            <a
              href="#work"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-secondary text-foreground px-7 py-3.5 font-medium hover:bg-muted transition-colors"
            >
              See selected work
            </a>
          </motion.div>
        </div>

        {/* Portrait / visual card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative aspect-[4/5] w-full max-w-md mx-auto"
        >
          <div
            aria-hidden
            className="absolute inset-0 rounded-[2.5rem] rotate-3"
            style={{
              background:
                "linear-gradient(135deg, color-mix(in oklab, var(--sky) 40%, white), color-mix(in oklab, var(--lilac) 60%, white))",
            }}
          />
          <div className="relative h-full w-full rounded-[2.25rem] card-float overflow-hidden flex flex-col">
            <div
              className="flex-1"
              style={{
                background:
                  "radial-gradient(120% 90% at 30% 20%, color-mix(in oklab, var(--sky) 35%, white), white 65%)",
              }}
            >
              <div className="h-full w-full flex items-end justify-center p-6">
                <div className="w-40 h-40 rounded-full bg-white/70 backdrop-blur border border-white flex items-center justify-center text-6xl">
                  👨🏽‍💻
                </div>
              </div>
            </div>
            <div className="p-5 border-t border-border/60 bg-card">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">
                Currently
              </div>
              <div className="mt-1 font-semibold">
                Building a Signature Feature for a fintech dashboard.
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
