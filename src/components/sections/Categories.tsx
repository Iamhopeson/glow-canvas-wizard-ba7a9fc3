import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { CATEGORIES, CATEGORY_GROUPS } from "@/content/site";

export function Categories() {
  const [filter, setFilter] = useState<(typeof CATEGORY_GROUPS)[number]>("All");
  const list = filter === "All" ? CATEGORIES : CATEGORIES.filter((c) => c.group === filter);

  return (
    <section className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-xs uppercase tracking-[0.3em] text-accent mb-3">Industries</div>
          <h2 className="text-4xl md:text-5xl font-bold">
            Built for businesses like <span className="neon-text">yours.</span>
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {CATEGORY_GROUPS.map((g) => (
            <button
              key={g}
              onClick={() => setFilter(g)}
              className={`text-sm px-4 py-1.5 rounded-full transition-all ${
                filter === g
                  ? "bg-primary text-primary-foreground neon-glow"
                  : "glass hover:bg-white/10"
              }`}
            >
              {g}
            </button>
          ))}
        </div>

        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
        >
          <AnimatePresence mode="popLayout">
            {list.map((c) => (
              <motion.div
                key={c.name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 260, damping: 24 }}
                whileHover={{ y: -3, scale: 1.03 }}
                className="glass rounded-2xl p-4 text-center"
              >
                <div className="text-2xl mb-1">{c.icon}</div>
                <div className="text-xs font-medium">{c.name}</div>
              </motion.div>
            ))}
            <motion.div
              key="more"
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass rounded-2xl p-4 text-center border-dashed border-accent/40"
            >
              <div className="text-2xl mb-1">✨</div>
              <div className="text-xs font-medium text-muted-foreground">and more</div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
