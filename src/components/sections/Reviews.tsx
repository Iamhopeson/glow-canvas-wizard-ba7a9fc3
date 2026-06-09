import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { REVIEWS } from "@/content/site";

export function Reviews() {
  return (
    <section className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="text-xs uppercase tracking-[0.3em] text-accent mb-3">Reviews</div>
          <h2 className="text-4xl md:text-5xl font-bold">
            What clients <span className="neon-text">actually say.</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {REVIEWS.map((r, i) => (
            <motion.figure
              key={r.name}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: (i % 2) * 0.1 }}
              className="glass-strong rounded-3xl p-7"
            >
              <Quote className="w-6 h-6 text-accent mb-4" />
              <blockquote className="text-lg leading-relaxed">"{r.quote}"</blockquote>
              <figcaption className="mt-5 text-sm">
                <div className="font-semibold">{r.name}</div>
                <div className="text-muted-foreground">{r.role}</div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
