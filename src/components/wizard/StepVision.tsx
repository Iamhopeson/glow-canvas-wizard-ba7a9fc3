import type { WizardData } from "./Wizard";
import { inputCls } from "./StepBasics";
import { SpeechButton } from "./SpeechButton";

const TIMELINES = ["ASAP", "2-4 weeks", "1-2 months", "3+ months", "Just exploring"];

export function StepVision({
  data,
  update,
}: {
  data: WizardData;
  update: (p: Partial<WizardData>) => void;
}) {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-2xl font-display font-bold">Tell me your vision.</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Type it out, or hit the mic and speak naturally.
        </p>
      </div>

      <div>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs uppercase tracking-widest text-muted-foreground">
            Project description
          </span>
          <SpeechButton
            onTranscript={(text) =>
              update({
                description: (data.description ? data.description + " " : "") + text,
              })
            }
          />
        </div>
        <textarea
          className={inputCls + " min-h-[140px] resize-y"}
          value={data.description}
          onChange={(e) => update({ description: e.target.value })}
          placeholder="Describe what you want to build, your audience, and what success looks like…"
          maxLength={4000}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="block text-xs uppercase tracking-widest text-muted-foreground mb-1.5">
            Competitor / inspiration URL
          </span>
          <input
            className={inputCls}
            value={data.competitorUrl}
            onChange={(e) => update({ competitorUrl: e.target.value })}
            placeholder="https://stripe.com"
            maxLength={500}
          />
        </label>
        <label className="block">
          <span className="block text-xs uppercase tracking-widest text-muted-foreground mb-1.5">
            Timeline
          </span>
          <select
            className={inputCls}
            value={data.timeline}
            onChange={(e) => update({ timeline: e.target.value })}
          >
            <option value="">Pick one…</option>
            {TIMELINES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="block">
        <span className="block text-xs uppercase tracking-widest text-muted-foreground mb-1.5">
          Biggest problem to solve
        </span>
        <textarea
          className={inputCls + " min-h-[80px] resize-y"}
          value={data.biggestProblem}
          onChange={(e) => update({ biggestProblem: e.target.value })}
          placeholder="My site is slow, doesn't convert, looks outdated…"
          maxLength={1000}
        />
      </label>
    </div>
  );
}
