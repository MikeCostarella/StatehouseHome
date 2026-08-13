# StatehouseHome

The public front door for the [Statehouse](../Statehouse/) project — a single-page
site that explains what the Ohio county public-records fleet is for, what it
publishes, and how to get in touch about a county or a dataset.

**Live site:** https://mikecostarella.github.io/StatehouseHome/

Created by Mike Costarella, Costarella Innovations, LLC.

## What's here

```
StatehouseHome/
├─ .github/workflows/deploy.yml   GitHub Pages deploy (builds react-app/)
└─ react-app/
   └─ src/
      ├─ data/site.ts             ALL page copy and links — edit this, not the components
      ├─ components/              Header, Hero, Goals, Apps, Audience, Process, Contact, Footer
      ├─ index.css                Tailwind v4 + fleet design tokens
      └─ App.tsx                  Section order
```

Same stack as the rest of the fleet — **Vite + React + TypeScript**, deployed to
GitHub Pages — plus **Tailwind CSS v4** for layout. The fleet palette (dark navy,
cyan accent, Segoe UI) is redeclared as Tailwind theme tokens in
`src/index.css`, so this page reads as the same product as OhioCounties and the
per-county apps.

## Run it

```powershell
cd C:\projects\StatehouseHome\react-app
npm install
npm run dev
```

Vite prints a URL — usually <http://localhost:5173/StatehouseHome/>.

```powershell
npm run typecheck   # tsc --noEmit
npm run build       # production build to dist/
npm run preview     # serve the production build
```

## Editing the content

Everything a visitor reads lives in **`react-app/src/data/site.ts`** — the hero,
the four goals, the app catalogue, the audience blocks, the three process steps,
the contact copy, and the stat tiles. The components are layout only, so copy
changes never require touching JSX.

Two things worth knowing:

- **`CONTACT_EMAIL`** at the top of `site.ts` is where the contact form's
  `mailto:` lands. It is currently `mcosti@sprynet.com`. Changing that one
  constant redirects the form, the sidebar link, and the footer link together.
- **The `STATS` tiles are hand-maintained.** "200+ applications published" tracks
  the fleet manifest; update it when the count moves meaningfully.

## The contact form

No backend, no third-party form handler. The form validates client-side, then
composes a `mailto:` link with the message plus the sender's details in the body
and hands off to the visitor's own mail client. Nothing about a visitor leaves
the page until they press send themselves — which is also why there is no
tracking or analytics anywhere on this site.

The trade-off is the usual one for `mailto:`: visitors on webmail without a
registered mail handler will get nothing when they submit. The sidebar shows the
plain address for exactly that case. If enquiry volume ever justifies it, swap
`buildMailto()` in `src/components/Contact.tsx` for a POST to a form endpoint —
the validation and markup stay as they are.

## Deploying

Pushing to `main` triggers `.github/workflows/deploy.yml`. Set
**Settings → Pages → Source** to "GitHub Actions" once, after the repo is
published.

`vite.config.ts` sets `base: "/StatehouseHome/"` to match the Pages path. If the
site ever moves to a custom domain, that base has to change to `"/"`.

## Publishing this repo

Git mutations run natively on Mike's machine, per the fleet convention:

```powershell
cd C:\projects\StatehouseHome
git init -b main
git add .
git commit -m "Add StatehouseHome public home page"
gh repo create MikeCostarella/StatehouseHome --public --source . --push
```

Then add it to `Statehouse\data\repos.manifest.json` as category `meta` so
`status.ps1` and StatehouseUI see it.
