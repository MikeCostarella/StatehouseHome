import { CONTACT_EMAIL, ORG } from "../data/site";

/**
 * The build stamp is formatted in Eastern time with the zone shown, not in
 * the visitor's locale.
 *
 * It exists so a deploy can be confirmed at a glance, and that only works if
 * it reads the same to everyone looking at it — a browser-local time makes
 * the same build appear to be several different builds depending on who
 * asks. Matches how StatehouseUI stamps its header (constants.ts).
 */
const STAMP_FORMAT = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/New_York",
  // Explicit components, NOT dateStyle/timeStyle: the spec forbids combining
  // those with timeZoneName and Intl throws if you try. Same field list as
  // StatehouseUI's header stamp, for the same reason.
  month: "short",
  day: "numeric",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
  timeZoneName: "short",
});

export default function Footer() {
  const built = new Date(__BUILD_TIME__);
  const stamp = Number.isNaN(built.valueOf())
    ? __BUILD_TIME__
    : STAMP_FORMAT.format(built);

  return (
    <footer className="border-t border-steel-500/60 bg-navy-950">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="font-bold text-ink">{ORG.name}</p>
          <p className="mt-1 text-sm text-ink-faint">{ORG.tagline}</p>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-faint">
            Statehouse is an independent project. It is not a government website, and the apps
            it publishes are community references — always confirm anything consequential with
            the county office that holds the record.
          </p>
        </div>

        <nav aria-label="Footer" className="text-sm">
          <ul className="space-y-2">
            <li>
              <a
                href={ORG.countyHub}
                target="_blank"
                rel="noreferrer"
                className="text-ink-muted transition-colors hover:text-cyan-accent"
              >
                Ohio Counties map
              </a>
            </li>
            <li>
              <a
                href={ORG.github}
                target="_blank"
                rel="noreferrer"
                className="text-ink-muted transition-colors hover:text-cyan-accent"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-ink-muted transition-colors hover:text-cyan-accent"
              >
                {CONTACT_EMAIL}
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div className="border-t border-steel-500/40">
        <div className="mx-auto flex max-w-6xl flex-col gap-1 px-6 py-5 text-xs text-ink-faint sm:flex-row sm:justify-between">
          <p>
            &copy; {built.getFullYear() || new Date().getFullYear()} {ORG.company}
          </p>
          <p>Built {stamp}</p>
        </div>
      </div>
    </footer>
  );
}
