import { motion } from "framer-motion";
import { Code2, Layout, ShoppingBag, Sparkles, ArrowUpRight } from "lucide-react";
import { SERVICES, type Service } from "@/content/site";

const ICONS = {
  code: Code2,
  layout: Layout,
  shop: ShoppingBag,
  spark: Sparkles,
};

const TINTS: Record<Service["tint"], string> = {
  sky: "color-mix(in oklab, var(--sky) 22%, white)",
  warm: "color-mix(in oklab, var(--warm) 30%, white)",
  mint: "color-mix(in oklab, var(--mint) 45%, white)",
  lilac: "color-mix(in oklab, var(--lilac) 45%, white)",
};

export function Services() {
  return (
    <section id="services" className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <span className="chip">Services</span>
            <h2 className="mt-3 text-3xl md:text-5xl font-bold">
              What I build for you.
            </h2>
          </div>
          <p className="text-muted-foreground max-w-md">
            Focused offerings — no bloat, no filler. Pick one, or combine them.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SERVICES.map((s, i) => {
            const Icon = ICONS[s.icon];
            return (
              <motion.article
                key={s.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                whileHover={{ y: -4 }}
                className="card-soft rounded-3xl p-6 flex flex-col group"
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                  style={{ background: TINTS[s.tint] }}
                >
                  <Icon className="w-5 h-5 text-foreground" />
                </div>
                <h3 className="font-display text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground flex-1">
                  {s.description}
                </p>
                <div className="mt-5 inline-flex items-center gap-1 text-sm font-medium sky-text opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more <ArrowUpRight className="w-4 h-4" />
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
