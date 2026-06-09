import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion";
import { useEffect, useRef } from "react";
import { TECH_STACK } from "@/content/site";

function TechBadge({
  tech,
  index,
  total,
  sx,
  sy,
}: {
  tech: (typeof TECH_STACK)[number];
  index: number;
  total: number;
  sx: MotionValue<number>;
  sy: MotionValue<number>;
}) {
  const angle = (index / total) * Math.PI * 2;
  const radius = 170;
  const baseX = Math.cos(angle) * radius;
  const baseY = Math.sin(angle) * radius * 0.55;
  const depth = (index % 3) * 0.6 + 0.5;
  const x = useTransform(sx, (v) => baseX + v * 60 * depth);
  const y = useTransform(sy, (v) => baseY + v * 50 * depth);

  return (
    <motion.div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 will-change-transform"
      style={{ x, y }}
      animate={{ y: [baseY, baseY - 8, baseY] }}
      transition={{ duration: 4 + index * 0.3, repeat: Infinity, ease: "easeInOut" }}
    >
      <div
        className="glass rounded-2xl px-4 py-2.5 font-display font-semibold text-sm whitespace-nowrap"
        style={{
          boxShadow: `0 0 30px -10px ${tech.color}55, inset 0 1px 0 ${tech.color}30`,
          color: tech.color,
        }}
      >
        {tech.name}
      </div>
    </motion.div>
  );
}

export function TechStack() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 80, damping: 20 });
  const sy = useSpring(my, { stiffness: 80, damping: 20 });

  useEffect(() => {
    let raf = 0;
    let pending: { x: number; y: number } | null = null;
    const onMove = (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      // Skip when section is offscreen.
      if (r.bottom < 0 || r.top > window.innerHeight) return;
      pending = {
        x: (e.clientX - r.left - r.width / 2) / r.width,
        y: (e.clientY - r.top - r.height / 2) / r.height,
      };
      if (!raf) {
        raf = requestAnimationFrame(() => {
          if (pending) {
            mx.set(pending.x);
            my.set(pending.y);
          }
          raf = 0;
        });
      }
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
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
          {TECH_STACK.map((t, i) => (
            <TechBadge key={t.name} tech={t} index={i} total={TECH_STACK.length} sx={sx} sy={sy} />
          ))}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(closest-side,transparent,var(--background)_85%)]" />
        </div>
      </div>
    </section>
  );
}
