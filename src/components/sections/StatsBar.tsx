import { motion } from "framer-motion";
import { STATS } from "@/content/site";

export function StatsBar() {
  return (
    <section className="relative px-6 -mt-4 mb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto card-float rounded-3xl px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-6"
      >
        {STATS.map((s) => (
          <div key={s.label} className="text-center">
            <div className="text-3xl md:text-4xl font-display font-bold sky-text">
              {s.value}
            </div>
            <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
              {s.label}
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
