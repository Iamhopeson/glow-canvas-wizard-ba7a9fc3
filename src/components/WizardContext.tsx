import { createContext, useContext, useState, type ReactNode } from "react";

type Ctx = {
  open: boolean;
  initialTier?: string;
  openWizard: (tier?: string) => void;
  closeWizard: () => void;
};

const WizardCtx = createContext<Ctx | null>(null);

export function WizardProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [initialTier, setInitialTier] = useState<string | undefined>();

  return (
    <WizardCtx.Provider
      value={{
        open,
        initialTier,
        openWizard: (tier) => {
          setInitialTier(tier);
          setOpen(true);
        },
        closeWizard: () => setOpen(false),
      }}
    >
      {children}
    </WizardCtx.Provider>
  );
}

export function useWizard() {
  const ctx = useContext(WizardCtx);
  if (!ctx) throw new Error("useWizard must be used inside WizardProvider");
  return ctx;
}
