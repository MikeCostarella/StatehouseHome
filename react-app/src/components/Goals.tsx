import Section from "./Section";
import { GOALS } from "../data/site";

export default function Goals() {
  return (
    <Section
      id="goals"
      tint
      eyebrow="What we're trying to do"
      heading="Four goals, applied to all 88 counties"
      lede="Statehouse is not a portal for one county. It is a repeatable way of turning a county's public record into something a person can actually use, run across the whole state."
    >
      <ol className="grid gap-6 sm:grid-cols-2">
        {GOALS.map((goal, i) => (
          <li
            key={goal.title}
            className="rounded-lg border border-steel-500/60 bg-white/[0.03] p-6"
          >
            <span className="text-sm font-bold text-cyan-accent">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-2 text-xl font-semibold text-ink">{goal.title}</h3>
            <p className="mt-3 leading-relaxed text-ink-muted">{goal.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
