import { motion } from "framer-motion";
import { AudioPlayer } from "@/components/AudioPlayer";

export function About() {
  return (
    <section className="relative py-32 px-6">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="text-xs uppercase tracking-[0.3em] text-accent mb-3">The Human</div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Hi, I build the <span className="neon-text">interactive</span> web.
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            I'm a freelance web developer obsessed with motion, performance, and the small
            moments that make a site feel alive. For the last 6 years I've shipped sites for
            startups, e-commerce brands, and local businesses — all built with React, Tailwind,
            and Framer Motion.
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Press play to hear me explain how I work.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <AudioPlayer src="/audio/intro.mp3" title="A 30-second intro" />
        </motion.div>
      </div>
    </section>
  );
}
