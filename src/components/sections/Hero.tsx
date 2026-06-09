import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, PlayCircle } from "lucide-react";
import { useWizard } from "@/components/WizardContext";
import { CONTACT } from "@/content/site";

export function Hero() {
  const { openWizard } = useWizard();
  const reduce = useReducedMotion();

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      {/* aurora orbs */}
      {!reduce && (
        <>
          <motion.div
            aria-hidden
            className="absolute top-1/3 left-1/4 w-[40rem] h-[40rem] rounded-full blur-3xl opacity-40"
            style={{ background: "radial-gradient(closest-side, var(--neon-violet), transparent)" }}
            animate={{ x: [0, 60, -40, 0], y: [0, -40, 30, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden
            className="absolute bottom-10 right-10 w-[30rem] h-[30rem] rounded-full blur-3xl opacity-30"
            style={{ background: "radial-gradient(closest-side, var(--neon-cyan), transparent)" }}
            animate={{ x: [0, -50, 40, 0], y: [0, 30, -40, 0] }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs text-muted-foreground mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          Available for new projects · {CONTACT.brand}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05]"
        >
          Your Ideas, <br className="hidden md:block" />
          Brought to Life in{" "}
          <span className="neon-text">60fps.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-6 md:mt-8 text-base md:text-xl text-muted-foreground max-w-2xl mx-auto"
        >
          {CONTACT.hero}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-10 flex flex-col sm:flex-row gap-3 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => openWizard()}
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground font-semibold px-7 py-3.5 neon-glow"
          >
            Get Started
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </motion.button>
          <a
            href="#portfolio"
            className="inline-flex items-center justify-center gap-2 rounded-full glass px-7 py-3.5 font-medium hover:bg-white/10 transition-colors"
          >
            <PlayCircle className="w-4 h-4" /> See work
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-16 grid grid-cols-3 gap-4 max-w-md mx-auto text-center"
        >
          {[
            ["60fps", "Animations"],
            ["<1s", "Load time"],
            ["100%", "Custom code"],
          ].map(([v, l]) => (
            <div key={l} className="glass rounded-2xl py-3">
              <div className="text-xl md:text-2xl font-display font-semibold neon-text">{v}</div>
              <div className="text-[10px] md:text-xs uppercase tracking-widest text-muted-foreground mt-1">
                {l}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
