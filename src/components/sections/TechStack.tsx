import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { TECH_STACK } from "@/content/site";

export function TechStack() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 80, damping: 20 });
  const sy = useSpring(my, { stiffness: 80, damping: 20 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      mx.set((e.clientX - r.left - r.width / 2) / r.width);
      my.set((e.clientY - r.top - r.height / 2) / r.height);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  return (
    <section className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="text-xs uppercase tracking-[0.3em] text-accent mb-3">The Stack</div>
          <h2 className="text-4xl md:text-5xl font-bold">
            Built with tools that <span className="neon-text">don't slow you down.</span>
          </h2>
        </div>

        <div
          ref={ref}
          className="relative h-[420px] glass-strong rounded-3xl overflow-hidden noise noise-overlay"
        >
          {TECH_STACK.map((t, i) => {
            const angle = (i / TECH_STACK.length) * Math.PI * 2;
            const radius = 170;
            const baseX = Math.cos(angle) * radius;
            const baseY = Math.sin(angle) * radius * 0.55;
            const depth = (i % 3) * 0.6 + 0.5;
            const x = useTransform(sx, (v) => baseX + v * 60 * depth);
            const y = useTransform(sy, (v) => baseY + v * 50 * depth);
            return (
              <motion.div
                key={t.name}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{ x, y }}
                animate={{ y: [baseY, baseY - 8, baseY] }}
                transition={{ duration: 4 + i * 0.3, repeat: Infinity, ease: "easeInOut" }}
              >
                <div
                  className="glass rounded-2xl px-4 py-2.5 font-display font-semibold text-sm whitespace-nowrap"
                  style={{
                    boxShadow: `0 0 30px -10px ${t.color}55, inset 0 1px 0 ${t.color}30`,
                    color: t.color,
                  }}
                >
                  {t.name}
                </div>
              </motion.div>
            );
          })}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(closest-side,transparent,var(--background)_85%)]" />
        </div>
      </div>
    </section>
  );
}
