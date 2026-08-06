import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const STORAGE_KEY = "mestudio-cookie-consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      // storage blocked — stay hidden rather than nagging every render
    }
  }, []);

  const decide = (choice: "accepted" | "declined") => {
    try {
      localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      /* ignore */
    }
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.aside
          role="dialog"
          aria-live="polite"
          aria-label="Cookie consent"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.35 }}
          className="fixed bottom-4 inset-x-4 z-50 flex justify-center"
        >
          <div className="card-float w-full max-w-3xl rounded-2xl px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-4">
            <p className="text-sm text-muted-foreground flex-1">
              This site uses cookies to understand how visitors use it and to
              improve your experience. You can accept or decline — the site
              works either way.
            </p>
            <div className="flex gap-2 shrink-0">
              <button
                type="button"
                onClick={() => decide("declined")}
                className="rounded-full bg-secondary text-foreground text-sm font-medium px-4 py-2 hover:bg-muted transition-colors"
              >
                Decline
              </button>
              <button
                type="button"
                onClick={() => decide("accepted")}
                className="rounded-full bg-primary text-primary-foreground text-sm font-semibold px-5 py-2 hover:opacity-95 transition-opacity"
              >
                Accept
              </button>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
