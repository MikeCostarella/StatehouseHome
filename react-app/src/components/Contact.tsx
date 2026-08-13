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
 * The message this form produces. One composition, three ways to send it -
 * see the note on the fallbacks below.
 */
function compose(f: Fields): { subject: string; body: string } {
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
  return { subject, body };
}

/**
 * Hands off to whatever the visitor has registered for mail links.
 *
 * The catch, and the reason the fallbacks below exist: if nothing is
 * registered - webmail users, or a machine where the mail client never
 * claimed the mailto: protocol - this navigation does NOTHING. No error, no
 * draft, no feedback. The visitor concludes the site is broken. That failure
 * is silent by design of the protocol, and cannot be detected from script,
 * so the only honest answer is to offer alternatives the moment we hand off.
 */
function buildMailto(f: Fields): string {
  const { subject, body } = compose(f);
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/**
 * A Gmail compose tab, which needs no mail handler at all. Same approach the
 * health-access apps in the fleet use (providerUpdateEmail.ts).
 */
function buildGmailUrl(f: Fields): string {
  const { subject, body } = compose(f);
  const params = new URLSearchParams({
    view: "cm",
    fs: "1",
    to: CONTACT_EMAIL,
    su: subject,
    body,
  });
  return `https://mail.google.com/mail/?${params.toString()}`;
}

/** The whole message as text, for the visitor who uses neither. */
function asPlainText(f: Fields): string {
  const { subject, body } = compose(f);
  return `To: ${CONTACT_EMAIL}\nSubject: ${subject}\n\n${body}`;
}

/** Clipboard with a fallback for browsers that refuse the async API. */
async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* fall through to the textarea trick */
  }
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}

const inputClass =
  "w-full rounded-md border border-steel-500 bg-navy-950/60 px-3 py-2 text-ink placeholder:text-ink-faint/70 transition-colors focus:border-cyan-accent focus:outline-none";

export default function Contact() {
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [handedOff, setHandedOff] = useState(false);
  const [copied, setCopied] = useState<boolean | null>(null);

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
    setCopied(null);
  }

  async function onCopy() {
    setCopied(await copyText(asPlainText(fields)));
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

          {/* Revealed only after handing off. A mailto: that goes nowhere gives
              no signal we can detect, so rather than guess, we say what should
              have happened and put the alternatives right where someone looks
              when it didn't. Cluttering the form with three buttons up front
              would cost every visitor to help the few. */}
          <div aria-live="polite" className="min-h-6">
            {handedOff && (
              <div className="rounded-md border border-steel-500/60 bg-white/[0.03] p-4">
                <p className="text-sm text-cyan-accent">
                  Your email app should have opened with a draft to {CONTACT_EMAIL}.
                </p>
                <p className="mt-2 text-sm text-ink-muted">Nothing happened? Two other ways:</p>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <a
                    href={buildGmailUrl(fields)}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-md border border-steel-500 px-4 py-2 text-sm font-semibold text-ink transition-colors hover:border-cyan-accent hover:text-cyan-accent"
                  >
                    Open in Gmail
                  </a>
                  <button
                    type="button"
                    onClick={onCopy}
                    className="rounded-md border border-steel-500 px-4 py-2 text-sm font-semibold text-ink transition-colors hover:border-cyan-accent hover:text-cyan-accent"
                  >
                    Copy the message
                  </button>
                  {copied === true && <span className="text-sm text-cyan-accent">Copied — paste it into any email.</span>}
                  {copied === false && (
                    <span className="text-sm text-orange-300">
                      Couldn't copy — select the message above and copy it by hand.
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
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
