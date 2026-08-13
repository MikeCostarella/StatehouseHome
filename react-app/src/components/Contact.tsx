import { useState, type FormEvent } from "react";
import Section from "./Section";
import { CONTACT, CONTACT_EMAIL, ORG } from "../data/site";

type Fields = {
  name: string;
  email: string;
  organization: string;
  county: string;
  subject: string;
  message: string;
};

const EMPTY: Fields = {
  name: "",
  email: "",
  organization: "",
  county: "",
  subject: CONTACT.subjects[0],
  message: "",
};

/** Deliberately permissive -- we only want to catch obvious typos, not police addresses. */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(f: Fields): Partial<Record<keyof Fields, string>> {
  const errors: Partial<Record<keyof Fields, string>> = {};
  if (!f.name.trim()) errors.name = "Please tell us your name.";
  if (!f.email.trim()) errors.email = "We need an address to reply to.";
  else if (!EMAIL_RE.test(f.email.trim())) errors.email = "That doesn't look like an email address.";
  if (f.message.trim().length < 10) errors.message = "A sentence or two is plenty — but we need something.";
  return errors;
}

/**
 * Composes a mailto: link and hands off to the visitor's mail client. No server,
 * no third-party form handler, and nothing about the visitor leaves the page
 * until they press send in their own email app.
 */
function buildMailto(f: Fields): string {
  const subject = `[Statehouse] ${f.subject}${f.county.trim() ? ` — ${f.county.trim()}` : ""}`;
  const body = [
    f.message.trim(),
    "",
    "—",
    `Name: ${f.name.trim()}`,
    `Email: ${f.email.trim()}`,
    f.organization.trim() ? `Organization: ${f.organization.trim()}` : null,
    f.county.trim() ? `County: ${f.county.trim()}` : null,
    "Sent from the Statehouse home page.",
  ]
    .filter((line): line is string => line !== null)
    .join("\n");

  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

const inputClass =
  "w-full rounded-md border border-steel-500 bg-navy-950/60 px-3 py-2 text-ink placeholder:text-ink-faint/70 transition-colors focus:border-cyan-accent focus:outline-none";

export default function Contact() {
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [handedOff, setHandedOff] = useState(false);

  const set = (key: keyof Fields) => (value: string) => {
    setFields((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validate(fields);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    window.location.href = buildMailto(fields);
    setHandedOff(true);
  }

  return (
    <Section
      id="contact"
      tint
      eyebrow="Contact"
      heading={CONTACT.heading}
      lede={CONTACT.body}
    >
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <form onSubmit={onSubmit} noValidate className="grid gap-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              id="name"
              label="Name"
              required
              value={fields.name}
              onChange={set("name")}
              error={errors.name}
              autoComplete="name"
            />
            <Field
              id="email"
              label="Email"
              type="email"
              required
              value={fields.email}
              onChange={set("email")}
              error={errors.email}
              autoComplete="email"
            />
            <Field
              id="organization"
              label="Organization"
              hint="optional"
              value={fields.organization}
              onChange={set("organization")}
              autoComplete="organization"
            />
            <Field
              id="county"
              label="County"
              hint="optional"
              placeholder="e.g. Trumbull"
              value={fields.county}
              onChange={set("county")}
            />
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-ink">
              What's this about?
            </label>
            <select
              id="subject"
              value={fields.subject}
              onChange={(e) => set("subject")(e.target.value)}
              className={`${inputClass} mt-2`}
            >
              {CONTACT.subjects.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-ink">
              Message <span className="text-cyan-accent">*</span>
            </label>
            <textarea
              id="message"
              rows={6}
              value={fields.message}
              onChange={(e) => set("message")(e.target.value)}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "message-error" : undefined}
              className={`${inputClass} mt-2 resize-y`}
              placeholder="Which county, which dataset, and what someone should be able to answer with it."
            />
            {errors.message && (
              <p id="message-error" className="mt-2 text-sm text-orange-300">
                {errors.message}
              </p>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              type="submit"
              className="rounded-md bg-steel-700 px-6 py-3 font-semibold text-white transition-colors hover:bg-steel-600"
            >
              Open in my email app
            </button>
            <p className="text-sm text-ink-faint">
              This opens a pre-filled draft in your own mail client — nothing is sent from this page.
            </p>
          </div>

          <p aria-live="polite" className="min-h-6 text-sm text-cyan-accent">
            {handedOff
              ? `Your email app should have opened with a draft to ${CONTACT_EMAIL}. If it didn't, write to us directly at that address.`
              : ""}
          </p>
        </form>

        <aside className="h-fit rounded-lg border border-steel-500/60 bg-white/[0.03] p-6">
          <h3 className="text-lg font-semibold text-ink">Prefer plain email?</h3>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="mt-2 block break-all font-semibold text-cyan-accent underline underline-offset-4 hover:text-white"
          >
            {CONTACT_EMAIL}
          </a>
          <hr className="my-6 border-steel-500/60" />
          <h3 className="text-lg font-semibold text-ink">Everything is open source</h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-muted">
            Every app in the fleet is public on GitHub. Issues and corrections are welcome there
            too.
          </p>
          <a
            href={ORG.github}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-block font-semibold text-cyan-accent underline underline-offset-4 hover:text-white"
          >
            View on GitHub
          </a>
        </aside>
      </div>
    </Section>
  );
}

type FieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
  hint?: string;
  error?: string;
  placeholder?: string;
  autoComplete?: string;
};

function Field({
  id,
  label,
  value,
  onChange,
  type = "text",
  required,
  hint,
  error,
  placeholder,
  autoComplete,
}: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-ink">
        {label}
        {required && <span className="text-cyan-accent"> *</span>}
        {hint && <span className="ml-1 text-ink-faint">({hint})</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`${inputClass} mt-2`}
      />
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm text-orange-300">
          {error}
        </p>
      )}
    </div>
  );
}
