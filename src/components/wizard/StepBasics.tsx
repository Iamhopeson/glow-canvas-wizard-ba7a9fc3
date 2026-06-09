import type { WizardData } from "./Wizard";

function Field({
  label,
  children,
  required,
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-widest text-muted-foreground mb-1.5">
        {label} {required && <span className="text-accent">*</span>}
      </span>
      {children}
    </label>
  );
}

export const inputCls =
  "w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/60 focus:bg-white/10 transition-colors";

export function StepBasics({
  data,
  update,
}: {
  data: WizardData;
  update: (p: Partial<WizardData>) => void;
}) {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-2xl font-display font-bold">Let's start with the basics.</h3>
        <p className="text-sm text-muted-foreground mt-1">
          So I know who you are and how to reach you.
        </p>
      </div>
      {data.tier && (
        <div className="text-xs glass rounded-full px-3 py-1.5 inline-block">
          Selected plan: <span className="font-semibold text-foreground">{data.tier}</span>
        </div>
      )}
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Your name" required>
          <input
            className={inputCls}
            value={data.name}
            onChange={(e) => update({ name: e.target.value })}
            placeholder="Alex Rivera"
            maxLength={120}
          />
        </Field>
        <Field label="Email" required>
          <input
            type="email"
            className={inputCls}
            value={data.email}
            onChange={(e) => update({ email: e.target.value })}
            placeholder="you@company.com"
            maxLength={255}
          />
        </Field>
        <Field label="Phone">
          <input
            className={inputCls}
            value={data.phone}
            onChange={(e) => update({ phone: e.target.value })}
            placeholder="+1 555 123 4567"
            maxLength={40}
          />
        </Field>
        <Field label="Business name">
          <input
            className={inputCls}
            value={data.businessName}
            onChange={(e) => update({ businessName: e.target.value })}
            placeholder="Acme Studio"
            maxLength={160}
          />
        </Field>
      </div>
    </div>
  );
}
