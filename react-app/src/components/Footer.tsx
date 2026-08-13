import { CONTACT_EMAIL, ORG } from "../data/site";

export default function Footer() {
  const built = new Date(__BUILD_TIME__);
  const stamp = Number.isNaN(built.valueOf())
    ? __BUILD_TIME__
    : built.toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" });

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
