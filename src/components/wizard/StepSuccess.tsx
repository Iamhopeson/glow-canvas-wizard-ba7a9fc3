import { motion } from "framer-motion";
import { Calendar, Check } from "lucide-react";
import type { WizardData } from "./Wizard";
import { CONTACT } from "@/content/site";

export function StepSuccess({
  data,
  onClose,
}: {
  data: WizardData;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center py-6"
    >
      <motion.div
        initial={{ scale: 0, rotate: -90 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 220, damping: 14, delay: 0.1 }}
        className="mx-auto w-24 h-24 rounded-full bg-primary text-primary-foreground flex items-center justify-center neon-glow relative"
      >
        <motion.span
          className="absolute inset-0 rounded-full border-2 border-accent/60"
          initial={{ scale: 0.6, opacity: 0.8 }}
          animate={{ scale: 1.4, opacity: 0 }}
          transition={{ duration: 1.4, repeat: Infinity }}
        />
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 260 }}
        >
          <Check className="w-10 h-10" strokeWidth={3} />
        </motion.div>
      </motion.div>

      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-6 text-3xl font-display font-bold"
      >
        Request sent.
      </motion.h3>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-2 text-muted-foreground"
      >
        Thanks {data.name?.split(" ")[0] || "friend"} — I'll reply within 24 hours. Want to lock
        in a time now?
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mt-7 flex flex-col sm:flex-row gap-2 justify-center"
      >
        <a
          href={CONTACT.calendly}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground font-semibold px-6 py-3 neon-glow"
        >
          <Calendar className="w-4 h-4" /> Book a Strategy Call
        </a>
        <button
          onClick={onClose}
          className="inline-flex items-center justify-center rounded-full glass px-6 py-3 hover:bg-white/10"
        >
          Close
        </button>
      </motion.div>
    </motion.div>
  );
}
