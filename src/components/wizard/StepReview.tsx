import { ChevronDown } from "lucide-react";
import { useState } from "react";
import type { WizardData } from "./Wizard";

function Row({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-4 py-2 border-b border-white/5">
      <div className="text-xs uppercase tracking-widest text-muted-foreground sm:w-40 shrink-0">
        {label}
      </div>
      <div className="text-sm text-foreground/90 break-words">{value}</div>
    </div>
  );
}

export function StepReview({ data }: { data: WizardData }) {
  const [showJson, setShowJson] = useState(false);

  const payload = {
    name: data.name,
    email: data.email,
    phone: data.phone,
    businessName: data.businessName,
    tier: data.tier,
    description: data.description,
    competitorUrl: data.competitorUrl,
    timeline: data.timeline,
    biggestProblem: data.biggestProblem,
    files: data.files.map((f) => ({
      name: f.file.name,
      size: f.file.size,
      type: f.file.type,
    })),
  };

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-2xl font-display font-bold">Review your project.</h3>
        <p className="text-sm text-muted-foreground mt-1">
          One last look before I get notified.
        </p>
      </div>

      <div className="glass rounded-2xl p-4">
        <Row label="Name" value={data.name} />
        <Row label="Email" value={data.email} />
        <Row label="Phone" value={data.phone} />
        <Row label="Business" value={data.businessName} />
        <Row label="Plan" value={data.tier} />
        <Row label="Description" value={data.description} />
        <Row label="Competitor URL" value={data.competitorUrl} />
        <Row label="Timeline" value={data.timeline} />
        <Row label="Biggest problem" value={data.biggestProblem} />
        {data.files.length > 0 && (
          <div className="flex flex-col sm:flex-row gap-1 sm:gap-4 py-2">
            <div className="text-xs uppercase tracking-widest text-muted-foreground sm:w-40 shrink-0">
              Files
            </div>
            <ul className="text-sm space-y-1">
              {data.files.map((f) => (
                <li key={f.id} className="text-foreground/90">
                  · {f.file.name}{" "}
                  <span className="text-muted-foreground text-xs">
                    ({(f.file.size / 1024).toFixed(0)} KB)
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={() => setShowJson((v) => !v)}
        className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
      >
        <ChevronDown
          className={`w-4 h-4 transition-transform ${showJson ? "rotate-180" : ""}`}
        />
        {showJson ? "Hide" : "View"} JSON payload
      </button>
      {showJson && (
        <pre className="text-[11px] glass rounded-2xl p-4 overflow-auto max-h-64 text-muted-foreground">
{JSON.stringify(payload, null, 2)}
        </pre>
      )}
    </div>
  );
}
