import { motion } from "framer-motion";
import { CAPABILITIES } from "@/content/site";

export function Capabilities() {
  return (
    <section id="capabilities" className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[0.9fr_1.1fr] gap-14 items-center">
        <div>
          <span className="chip">Why choose me</span>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold">
            Craft you can measure.
          </h2>
          <p className="mt-5 text-muted-foreground max-w-md">
            Six years, dozens of shipped products, and a stubborn obsession
            with the details other developers skip.
          </p>
        </div>

        <div className="space-y-5">
          {CAPABILITIES.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <div className="flex items-baseline justify-between mb-2">
                <span className="font-medium text-sm md:text-base">{c.name}</span>
                <span className="text-xs md:text-sm font-semibold sky-text tabular-nums">
                  {c.value}%
                </span>
              </div>
              <div className="h-2 rounded-full bg-secondary overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${c.value}%` }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 1.1, delay: 0.1 + i * 0.06, ease: "easeOut" }}
                  className="h-full rounded-full"
                  style={{
                    background:
                      "linear-gradient(90deg, var(--warm), color-mix(in oklab, var(--warm) 55%, var(--sky)))",
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
