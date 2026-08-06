import { motion } from "framer-motion";
import { useWizard } from "@/components/WizardContext";
import { CONTACT } from "@/content/site";
import logo from "@/assets/me-studio-logo.png.asset.json";


const LINKS = [
  { href: "#services", label: "Services" },
  { href: "#work", label: "Work" },
  { href: "#capabilities", label: "About" },
  { href: "#packages", label: "Pricing" },
];

export function Nav() {
  const { openWizard } = useWizard();
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-4 inset-x-4 z-40 flex justify-center"
    >
      <nav className="card-float w-full max-w-5xl rounded-full pl-5 pr-2 py-2 flex items-center gap-4">
        <a href="#top" className="flex items-center gap-2 font-display font-bold text-base sm:text-lg tracking-tight">
          <img src={logo.url} alt="me.studio logo" className="w-8 h-8 object-contain" width={32} height={32} />
          {CONTACT.brand}
        </a>

        <ul className="hidden md:flex items-center gap-6 text-sm text-muted-foreground ml-4">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="hover:text-foreground transition-colors">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="ml-auto flex items-center gap-2">
          <a
            href={CONTACT.calendly}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-block text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-2"
          >
            Book a call
          </a>
          <button
            onClick={() => openWizard()}
            className="rounded-full bg-primary text-primary-foreground text-sm font-semibold px-4 py-2 sky-glow hover:opacity-95 transition-opacity"
          >
            Start a project
          </button>
        </div>
      </nav>
    </motion.header>
  );
}
