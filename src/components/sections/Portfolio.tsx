import { motion } from "framer-motion";
import { PROJECTS } from "@/content/site";

function DeviceMock({ project }: { project: (typeof PROJECTS)[number] }) {
  const isPhone = project.device === "phone";
  return (
    <div
      className={
        isPhone
          ? "relative mx-auto w-[180px] h-[360px] rounded-[2rem] bg-black border-[6px] border-zinc-800 shadow-2xl overflow-hidden"
          : "relative mx-auto w-full max-w-[440px] aspect-[16/10] rounded-xl bg-black border-[8px] border-zinc-800 shadow-2xl overflow-hidden"
      }
    >
      {/* fake screen */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${project.colors[0]}33, ${project.colors[1]}33), radial-gradient(at 20% 20%, ${project.colors[0]}88, transparent 50%), radial-gradient(at 80% 80%, ${project.colors[1]}88, transparent 50%)`,
        }}
      />
      {/* moving content (hover preview simulation) */}
      <motion.div
        className="absolute inset-0 flex flex-col p-3 gap-2"
        initial={{ opacity: 0.85 }}
        whileHover={{ opacity: 1 }}
      >
        <div className="h-2 w-1/2 rounded-full bg-white/30" />
        <div className="h-2 w-1/3 rounded-full bg-white/20" />
        <motion.div
          className="mt-2 flex-1 rounded-lg bg-white/10 backdrop-blur"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="grid grid-cols-3 gap-1.5">
          <motion.div
            className="h-6 rounded bg-white/15"
            animate={{ opacity: [0.4, 0.9, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="h-6 rounded bg-white/15"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, delay: 0.4, repeat: Infinity }}
          />
          <motion.div
            className="h-6 rounded bg-white/15"
            animate={{ opacity: [0.4, 0.9, 0.4] }}
            transition={{ duration: 2, delay: 0.8, repeat: Infinity }}
          />
        </div>
      </motion.div>
      {isPhone && (
        <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-16 h-4 rounded-full bg-black z-10" />
      )}
    </div>
  );
}

export function Portfolio() {
  return (
    <section id="portfolio" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="text-xs uppercase tracking-[0.3em] text-accent mb-3">Selected Work</div>
          <h2 className="text-4xl md:text-5xl font-bold">
            Projects that <span className="neon-text">move the needle.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {PROJECTS.map((p, i) => (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="group glass rounded-3xl p-6 noise noise-overlay overflow-hidden"
            >
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-4">
                {p.type}
              </div>
              <div className="py-4">
                <DeviceMock project={p} />
              </div>
              <h3 className="mt-6 text-xl font-semibold">{p.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] uppercase tracking-wider rounded-full px-2 py-1 bg-white/5 text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
