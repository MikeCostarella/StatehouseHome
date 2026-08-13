import Section from "./Section";
import { AUDIENCE } from "../data/site";

export default function Audience() {
  return (
    <Section
      id="audience"
      tint
      eyebrow="Who it's for"
      heading="Built for the people who need the record"
      lede="The same underlying data answers very different questions depending on who is asking. Each app is designed around the question, not the file format."
    >
      <div className="grid gap-8 sm:grid-cols-2">
        {AUDIENCE.map((item) => (
          <div key={item.title} className="border-l-2 border-steel-700 pl-6">
            <h3 className="text-xl font-semibold text-ink">{item.title}</h3>
            <p className="mt-3 leading-relaxed text-ink-muted">{item.body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
