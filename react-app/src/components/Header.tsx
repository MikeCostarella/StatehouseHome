import { useEffect, useState } from "react";
import { ORG } from "../data/site";

const NAV = [
  { label: "Goals", href: "#goals" },
  { label: "What we build", href: "#apps" },
  { label: "Who it's for", href: "#audience" },
  { label: "How it works", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors ${
        scrolled
          ? "border-steel-500/60 bg-navy-950/95 backdrop-blur"
          : "border-transparent bg-navy-950/70 backdrop-blur"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="grid h-9 w-9 place-items-center rounded-md bg-steel-700 text-sm font-bold text-white"
          >
            SH
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-base font-bold text-ink">{ORG.name}</span>
            <span className="hidden text-xs text-ink-faint sm:block">Ohio Counties</span>
          </span>
        </a>

        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-ink-muted transition-colors hover:text-cyan-accent"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            className="rounded-md bg-steel-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-steel-600"
          >
            Get in touch
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="rounded-md border border-steel-500 px-3 py-2 text-sm text-ink-muted lg:hidden"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Main"
          className="border-t border-steel-500/60 bg-navy-950 lg:hidden"
        >
          <ul className="mx-auto max-w-6xl px-6 py-3">
            {NAV.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-sm text-ink-muted transition-colors hover:text-cyan-accent"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
