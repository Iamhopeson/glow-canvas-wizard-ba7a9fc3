import { CONTACT } from "@/content/site";
import { Calendar, MessageCircle } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 py-12 px-6 mt-20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6 justify-between items-center text-sm text-muted-foreground">
        <div className="font-display font-bold text-foreground text-lg">{CONTACT.brand}</div>
        <div className="flex gap-3 flex-wrap justify-center">
          <a
            href={CONTACT.calendly}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 hover:bg-white/10 transition-colors"
          >
            <Calendar className="w-4 h-4" /> Book a call
          </a>
          <a
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 hover:bg-white/10 transition-colors"
          >
            <MessageCircle className="w-4 h-4" /> WhatsApp
          </a>
        </div>
        <div>© {new Date().getFullYear()} {CONTACT.brand}. Made in 60fps.</div>
      </div>
    </footer>
  );
}
