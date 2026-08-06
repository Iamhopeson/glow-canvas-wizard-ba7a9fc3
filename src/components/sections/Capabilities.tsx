import { motion } from "framer-motion";
import { CAPABILITIES } from "@/content/site";
import { useWorkFilter } from "@/components/WorkFilterContext";

export function Capabilities() {
  const { filter, setFilter } = useWorkFilter();

  const handleSelect = (name: (typeof CAPABILITIES)[number]["name"]) => {
    setFilter(name);
    // Scroll the portfolio grid into view for a clear cause → effect
    requestAnimationFrame(() => {
      const el = document.getElementById("work");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <section id="capabilities" className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[0.9fr_1.1fr] gap-14 items-start">
        <div className="lg:sticky lg:top-28">
          <h2 className="text-3xl md:text-5xl font-bold">
            Select a category. <br />
            <span className="sky-text">The portfolio responds.</span>
          </h2>
          <p className="mt-5 text-muted-foreground max-w-md">
            Each bar is a live portfolio filter. Tap one to reveal the
            projects built in that category — from websites and storefronts
            to POS, web apps, and custom systems.
          </p>
          <p className="mt-4 text-xs uppercase tracking-widest text-muted-foreground">
            Currently viewing:{" "}
            <span className="sky-text font-semibold">{filter}</span>
          </p>
        </div>

        <div className="space-y-4">
          {CAPABILITIES.map((c, i) => {
            const active = filter === c.name;
            return (
              <motion.button
                key={c.name}
                type="button"
                onClick={() => handleSelect(c.name)}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                whileHover={{ x: 4 }}
                aria-pressed={active}
                className={`w-full text-left rounded-2xl p-4 transition-all ${
                  active ? "card-float sky-glow" : "card-soft hover:card-float"
                }`}
              >
                <div className="flex items-baseline justify-between mb-2 gap-3">
                  <span
                    className={`font-semibold text-sm md:text-base truncate ${
                      active ? "sky-text" : ""
                    }`}
                  >
                    {c.name}
                  </span>
                  <span className="text-xs md:text-sm font-bold sky-text tabular-nums shrink-0">
                    {c.value}%
                  </span>
                </div>
                <div className="h-2.5 rounded-full bg-secondary overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${c.value}%` }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{
                      duration: 1.1,
                      delay: 0.1 + i * 0.06,
                      ease: "easeOut",
                    }}
                    className="h-full rounded-full"
                    style={{
                      background: active
                        ? "linear-gradient(90deg, var(--sky), color-mix(in oklab, var(--sky) 60%, white))"
                        : "linear-gradient(90deg, color-mix(in oklab, var(--sky) 70%, white), color-mix(in oklab, var(--sky) 40%, white))",
                    }}
                  />
                </div>
                <div className="mt-2 text-[11px] uppercase tracking-widest text-muted-foreground">
                  {active ? "Active filter" : "Tap to filter portfolio"}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
