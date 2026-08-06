import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Target, RotateCcw } from "lucide-react";
import { PROJECTS, PROJECT_FILTERS } from "@/content/site";
import { useWorkFilter } from "@/components/WorkFilterContext";

export function Portfolio() {
  const { filter, setFilter } = useWorkFilter();
  const visible = PROJECTS.filter((p) => filter === "All" || p.filter === filter);

  return (
    <section id="work" className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div className="min-w-0">
            <h2 className="text-3xl md:text-5xl font-bold">
              Projects built to <span className="sky-text">bring users back.</span>
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {PROJECT_FILTERS.map((f) => {
              const active = f === filter;
              return (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`rounded-full px-3.5 py-1.5 text-xs sm:text-sm font-medium transition-colors ${
                    active
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {f}
                </button>
              );
            })}
          </div>
        </div>

        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {visible.map((p, i) => (
              <motion.article
                key={p.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, delay: (i % 6) * 0.04 }}
                whileHover={{ y: -6 }}
                className="card-soft rounded-3xl p-5 flex flex-col overflow-hidden"
              >
                <div
                  className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${p.colors[0]}, ${p.colors[1]})`,
                  }}
                >
                  <div className="absolute inset-0 flex flex-col p-4 gap-2">
                    <div className="h-2 w-1/2 rounded-full bg-white/60" />
                    <div className="h-2 w-1/3 rounded-full bg-white/40" />
                    <motion.div
                      className="mt-2 flex-1 rounded-lg bg-white/50"
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <div className="grid grid-cols-3 gap-1.5">
                      <div className="h-6 rounded bg-white/40" />
                      <div className="h-6 rounded bg-white/40" />
                      <div className="h-6 rounded bg-white/40" />
                    </div>
                  </div>
                </div>

                <div className="pt-5 flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                      {p.type} · {p.filter}
                    </div>
                    <h3 className="mt-1 font-display text-lg font-semibold truncate">
                      {p.name}
                    </h3>
                  </div>
                  <span className="chip shrink-0">
                    <Sparkles className="w-3 h-3" /> Signature
                  </span>
                </div>

                <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>

                <dl className="mt-4 space-y-2.5 text-sm">
                  <div className="flex gap-2">
                    <Target className="w-4 h-4 sky-text shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <dt className="text-[10px] uppercase tracking-wider text-muted-foreground">
                        Business purpose
                      </dt>
                      <dd className="text-foreground/90">{p.purpose}</dd>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Sparkles className="w-4 h-4 sky-text shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <dt className="text-[10px] uppercase tracking-wider text-muted-foreground">
                        Signature feature
                      </dt>
                      <dd className="text-foreground/90">{p.signature}</dd>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <RotateCcw className="w-4 h-4 sky-text shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <dt className="text-[10px] uppercase tracking-wider text-muted-foreground">
                        Return value
                      </dt>
                      <dd className="text-foreground/90">{p.returnValue}</dd>
                    </div>
                  </div>
                </dl>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] uppercase tracking-wider rounded-full px-2 py-1 bg-secondary text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {visible.length === 0 && (
          <div className="mt-12 text-center text-muted-foreground">
            No projects in this category yet — new work ships every month.
          </div>
        )}
      </div>
    </section>
  );
}
