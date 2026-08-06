import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { REVIEWS } from "@/content/site";

export function Reviews() {
  return (
    <section className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold">
            What clients <span className="sky-text">actually say.</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {REVIEWS.map((r, i) => (
            <motion.figure
              key={r.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: (i % 2) * 0.08 }}
              className="card-soft rounded-3xl p-7"
            >
              <Quote className="w-6 h-6 sky-text mb-4" />
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
