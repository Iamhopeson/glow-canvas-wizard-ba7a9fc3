import { motion } from "framer-motion";
import { Sparkles, Compass, Gift, Crown } from "lucide-react";
import { ME_STUDIO_TAG, type Tag } from "@/content/site";

const ICONS = {
  sparkles: Sparkles,
  compass: Compass,
  gift: Gift,
  crown: Crown,
};

const TINTS: Record<Tag["tint"], { bg: string; ring: string }> = {
  sky: {
    bg: "color-mix(in oklab, var(--sky) 25%, white)",
    ring: "color-mix(in oklab, var(--sky) 40%, white)",
  },
  warm: {
    bg: "color-mix(in oklab, var(--warm) 32%, white)",
    ring: "color-mix(in oklab, var(--warm) 45%, white)",
  },
  mint: {
    bg: "color-mix(in oklab, var(--mint) 45%, white)",
    ring: "color-mix(in oklab, var(--mint) 60%, white)",
  },
  lilac: {
    bg: "color-mix(in oklab, var(--lilac) 45%, white)",
    ring: "color-mix(in oklab, var(--lilac) 60%, white)",
  },
};

export function MeStudioTag() {
  return (
    <section className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="chip">The Me.Studio tag</span>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold">
            More than a website. <br />
            <span className="sky-text">A reason to come back.</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Every project ships with these four commitments — the small
            differences that make sites feel handcrafted, not templated.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {ME_STUDIO_TAG.map((t, i) => {
            const Icon = ICONS[t.icon];
            const tint = TINTS[t.tint];
            return (
              <motion.article
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="relative rounded-[2rem] p-6 overflow-hidden card-soft"
                style={{ background: tint.bg }}
              >
                {/* concentric circles background */}
                <span
                  aria-hidden
                  className="absolute -right-16 -bottom-16 w-56 h-56 rounded-full"
                  style={{ background: tint.ring, opacity: 0.55 }}
                />
                <span
                  aria-hidden
                  className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full"
                  style={{ background: "white", opacity: 0.35 }}
                />

                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-white/80 backdrop-blur flex items-center justify-center shadow-sm mb-6">
                    <Icon className="w-6 h-6 text-foreground" />
                  </div>
                  <h3 className="font-display text-lg font-bold">{t.title}</h3>
                  <p className="mt-2 text-sm text-foreground/80">{t.copy}</p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
