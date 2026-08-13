import Section from "./Section";
import { APPS, ORG } from "../data/site";

export default function Apps() {
  return (
    <Section
      id="apps"
      eyebrow="What we build"
      heading="One county, many questions"
      lede="Every county gets the same family of applications, built on the same stack and deployed the same way. Some counties have all of them; every county can."
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {APPS.map((app) => (
          <article
            key={app.name}
            className="rounded-lg border border-steel-500/60 bg-white/[0.03] p-6 transition-colors hover:border-cyan-accent/70"
          >
            <h3 className="text-lg font-semibold text-cyan-accent">{app.name}</h3>
            <p className="mt-3 leading-relaxed text-ink-muted">{app.body}</p>
          </article>
        ))}
      </div>

      <p className="mt-10 text-ink-muted">
        Browse what is live today on the{" "}
        <a
          href={ORG.countyHub}
          target="_blank"
          rel="noreferrer"
          className="font-semibold text-cyan-accent underline underline-offset-4 hover:text-white"
        >
          Ohio Counties map
        </a>
        . Counties with published apps are colored and clickable; the rest are on the way.
      </p>
    </Section>
  );
}
