import { motion } from "framer-motion";
import {
  Sparkles,
  Compass,
  Gift,
  Crown,
  Layout,
  ShoppingBag,
} from "lucide-react";
import { ME_STUDIO_TAG, type Tag } from "@/content/site";

const ICONS: Record<Tag["icon"], typeof Sparkles> = {
  sparkles: Sparkles,
  compass: Compass,
  gift: Gift,
  crown: Crown,
  layout: Layout,
  shop: ShoppingBag,
};

export function MeStudioTag() {
  return (
    <section id="me-studio-tag" className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl md:text-5xl font-bold">
            What makes a project <br />
            <span className="sky-text">a Me.Studio project.</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            A visual standard applied to every build — not a checklist, a
            way of thinking about digital experience.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {ME_STUDIO_TAG.map((t, i) => {
            const Icon = ICONS[t.icon];
            return (
              <motion.article
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                whileHover={{ y: -6 }}
                className="group relative rounded-[2rem] p-7 overflow-hidden card-soft transition-shadow hover:sky-glow"
                style={{
                  background:
                    "linear-gradient(160deg, white 0%, color-mix(in oklab, var(--sky) 10%, white) 100%)",
                }}
              >
                {/* soft concentric decor */}
                <span
                  aria-hidden
                  className="absolute -right-16 -bottom-16 w-56 h-56 rounded-full transition-transform duration-700 group-hover:scale-110"
                  style={{
                    background:
                      "color-mix(in oklab, var(--sky) 22%, white)",
                    opacity: 0.7,
                  }}
                />
                <span
                  aria-hidden
                  className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full transition-transform duration-700 group-hover:scale-125"
                  style={{ background: "white", opacity: 0.55 }}
                />
                <span
                  aria-hidden
                  className="absolute right-6 bottom-6 w-14 h-14 rounded-full"
                  style={{
                    background:
                      "color-mix(in oklab, var(--sky) 40%, white)",
                    opacity: 0.8,
                  }}
                />

                <div className="relative">
                  <div
                    className="w-14 h-14 rounded-2xl bg-white/90 backdrop-blur flex items-center justify-center shadow-sm mb-6 border"
                    style={{
                      borderColor:
                        "color-mix(in oklab, var(--sky) 25%, white)",
                    }}
                  >
                    <Icon className="w-6 h-6 sky-text" />
                  </div>
                  <h3 className="font-display text-sm font-bold uppercase tracking-widest text-foreground">
                    {t.title}
                  </h3>
                  <p className="mt-3 text-xs sm:text-sm font-medium uppercase tracking-wider leading-relaxed text-foreground/75">
                    {t.copy}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-14 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white card-soft px-5 py-3">
            <Sparkles className="w-4 h-4 sky-text" />
            <span className="text-xs sm:text-sm uppercase tracking-widest font-semibold">
              Every project carries the Me.Studio tag
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
