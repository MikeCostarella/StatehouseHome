import Section from "./Section";
import { PROCESS } from "../data/site";

export default function Process() {
  return (
    <Section
      id="process"
      eyebrow="How it works"
      heading="From a conversation to a live site"
      lede="There is no procurement cycle here and no platform to buy into. The path from asking to a working, public application is short on purpose."
    >
      <ol className="grid gap-6 md:grid-cols-3">
        {PROCESS.map((step) => (
          <li
            key={step.step}
            className="relative rounded-lg border border-steel-500/60 bg-white/[0.03] p-6"
          >
            <span
              aria-hidden="true"
              className="text-4xl font-bold text-steel-700/80"
            >
              {step.step}
            </span>
            <h3 className="mt-2 text-lg font-semibold text-ink">{step.title}</h3>
            <p className="mt-3 leading-relaxed text-ink-muted">{step.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
