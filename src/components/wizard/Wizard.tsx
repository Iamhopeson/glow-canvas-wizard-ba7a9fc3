import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Check, ChevronLeft, ChevronRight, MessageCircle, X } from "lucide-react";
import { useWizard } from "@/components/WizardContext";
import { CONTACT } from "@/content/site";
import { useServerFn } from "@tanstack/react-start";
import { submitIntake } from "@/lib/intake.functions";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { StepBasics } from "./StepBasics";
import { StepVision } from "./StepVision";
import { StepUpload, type UploadedFile } from "./StepUpload";
import { StepReview } from "./StepReview";
import { StepSuccess } from "./StepSuccess";

export type WizardData = {
  name: string;
  email: string;
  phone: string;
  businessName: string;
  tier: string;
  description: string;
  competitorUrl: string;
  timeline: string;
  biggestProblem: string;
  files: UploadedFile[];
};

const empty: WizardData = {
  name: "",
  email: "",
  phone: "",
  businessName: "",
  tier: "",
  description: "",
  competitorUrl: "",
  timeline: "",
  biggestProblem: "",
  files: [],
};

const STEPS = ["Basics", "Vision", "Inspiration", "Review"] as const;

export function Wizard() {
  const { open, closeWizard, initialTier } = useWizard();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<WizardData>(empty);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const submitFn = useServerFn(submitIntake);

  useEffect(() => {
    if (open) {
      setData({ ...empty, tier: initialTier ?? "" });
      setStep(0);
      setSuccess(false);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, initialTier]);

  const update = (patch: Partial<WizardData>) => setData((d) => ({ ...d, ...patch }));

  const canNext = (() => {
    if (step === 0) {
      return data.name.trim().length > 0 && /^\S+@\S+\.\S+$/.test(data.email);
    }
    return true;
  })();

  const handleSubmit = async () => {
    // Final guard: re-validate required fields before submitting.
    if (!data.name.trim() || !/^\S+@\S+\.\S+$/.test(data.email)) {
      toast.error("Please add your name and a valid email before submitting.");
      setStep(0);
      return;
    }
    if (data.competitorUrl && !/^https?:\/\/\S+\.\S+/.test(data.competitorUrl.trim())) {
      toast.error("Inspiration URL should start with http:// or https://");
      setStep(1);
      return;
    }
    setSubmitting(true);
    try {
      // Upload each file to storage now.
      const uploadedRefs: { name: string; size: number; type: string; path: string }[] = [];
      for (const f of data.files) {
        if (!f.file) continue;
        const path = `${Date.now()}-${crypto.randomUUID()}/${f.file.name}`;
        const { error } = await supabase.storage
          .from("intake-uploads")
          .upload(path, f.file, { contentType: f.file.type, upsert: false });
        if (error) {
          console.error("upload error", error);
          toast.error(`Couldn't upload ${f.file.name}`);
          continue;
        }
        uploadedRefs.push({
          name: f.file.name,
          size: f.file.size,
          type: f.file.type,
          path,
        });
      }

      await submitFn({
        data: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          businessName: data.businessName,
          tier: data.tier,
          description: data.description,
          competitorUrl: data.competitorUrl,
          timeline: data.timeline,
          biggestProblem: data.biggestProblem,
          files: uploadedRefs,
        },
      });

      setSuccess(true);
    } catch (e) {
      console.error(e);
      toast.error("Something went wrong. Please try again or message me on WhatsApp.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={closeWizard}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
            className="relative w-full max-w-2xl max-h-[92vh] flex flex-col glass-strong rounded-3xl overflow-hidden noise noise-overlay"
          >
            <button
              onClick={closeWizard}
              aria-label="Close"
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full glass flex items-center justify-center hover:bg-white/10"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <div className="px-6 pt-6 pb-4 border-b border-white/10">
              {success ? (
                <div className="text-xs uppercase tracking-widest text-accent">Success</div>
              ) : (
                <>
                  <div className="text-xs uppercase tracking-widest text-accent">
                    Project Planner · Step {step + 1} of {STEPS.length}
                  </div>
                  <div className="mt-3 flex gap-1.5">
                    {STEPS.map((s, i) => (
                      <div
                        key={s}
                        className={`h-1 flex-1 rounded-full transition-colors ${
                          i <= step ? "bg-primary" : "bg-white/10"
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-6">
              <AnimatePresence mode="wait">
                {success ? (
                  <StepSuccess key="success" data={data} onClose={closeWizard} />
                ) : (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.3 }}
                  >
                    {step === 0 && <StepBasics data={data} update={update} />}
                    {step === 1 && <StepVision data={data} update={update} />}
                    {step === 2 && <StepUpload data={data} update={update} />}
                    {step === 3 && <StepReview data={data} />}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {!success && (
              <div className="border-t border-white/10 px-6 py-4 flex items-center justify-between gap-3 flex-wrap">
                <a
                  href={CONTACT.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-xs rounded-full px-3 py-2 bg-[#25D366]/15 text-[#25D366] hover:bg-[#25D366]/25 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" /> Stuck? Message me on WhatsApp
                </a>
                <div className="flex gap-2 ml-auto">
                  {step > 0 && (
                    <button
                      onClick={() => setStep((s) => s - 1)}
                      className="inline-flex items-center gap-1.5 rounded-full glass px-4 py-2 text-sm hover:bg-white/10"
                    >
                      <ChevronLeft className="w-4 h-4" /> Back
                    </button>
                  )}
                  {step < STEPS.length - 1 && (
                    <button
                      disabled={!canNext}
                      onClick={() => setStep((s) => s + 1)}
                      className="inline-flex items-center gap-1.5 rounded-full bg-primary text-primary-foreground px-5 py-2 text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Next <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                  {step === STEPS.length - 1 && (
                    <button
                      disabled={submitting}
                      onClick={handleSubmit}
                      className="inline-flex items-center gap-1.5 rounded-full bg-primary text-primary-foreground px-5 py-2 text-sm font-semibold neon-glow disabled:opacity-60"
                    >
                      {submitting ? "Submitting…" : (<>Submit Request <Check className="w-4 h-4" /></>)}
                    </button>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
