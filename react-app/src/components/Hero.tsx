import { HERO, STATS } from "../data/site";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden border-b border-steel-500/40">
      {/* Decorative wash -- keeps the fold from reading as a flat block. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(46,125,190,0.35),transparent_55%),radial-gradient(ellipse_at_bottom_right,rgba(91,196,245,0.18),transparent_55%)]"
      />
      <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-20 sm:pb-28 sm:pt-28">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-accent">
          {HERO.eyebrow}
        </p>
        <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl lg:text-6xl">
          {HERO.heading}
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-ink-muted sm:text-xl">
          {HERO.body}
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a
            href={HERO.primaryCta.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-md bg-steel-700 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-steel-600"
          >
            {HERO.primaryCta.label}
          </a>
          <a
            href={HERO.secondaryCta.href}
            className="inline-flex items-center justify-center rounded-md border border-steel-500 px-6 py-3 text-base font-semibold text-ink transition-colors hover:border-cyan-accent hover:text-cyan-accent"
          >
            {HERO.secondaryCta.label}
          </a>
        </div>

        <dl className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-steel-500/60 bg-steel-500/40 sm:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="bg-navy-900 px-5 py-6">
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="block text-3xl font-bold text-cyan-accent">{stat.value}</span>
                <span className="mt-1 block text-sm text-ink-faint">{stat.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
