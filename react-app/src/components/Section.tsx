import type { ReactNode } from "react";

type Props = {
  id?: string;
  eyebrow?: string;
  heading: string;
  lede?: string;
  children: ReactNode;
  /** Slightly darker background, used to alternate bands down the page. */
  tint?: boolean;
};

/** Shared section chrome: consistent width, spacing, and heading treatment. */
export default function Section({ id, eyebrow, heading, lede, children, tint }: Props) {
  return (
    <section id={id} className={tint ? "bg-navy-900" : "bg-navy-800"}>
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <div className="max-w-3xl">
          {eyebrow && (
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-accent">
              {eyebrow}
            </p>
          )}
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            {heading}
          </h2>
          {lede && <p className="mt-4 text-lg leading-relaxed text-ink-muted">{lede}</p>}
        </div>
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}
