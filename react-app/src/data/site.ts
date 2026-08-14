/**
 * Every piece of copy and every outbound link on the home page lives here.
 * Edit this file to change the site's content -- the components are layout only.
 */

/** Where the contact form's mailto: lands. Change this one line to redirect enquiries. */
export const CONTACT_EMAIL = "costarellainnovationsllc@gmail.com";

export const ORG = {
  name: "Statehouse",
  tagline: "Ohio county public records, made usable.",
  company: "Costarella Innovations, LLC",
  countyHub: "https://mikecostarella.github.io/OhioCounties/",
  github: "https://github.com/MikeCostarella",
};

export const HERO = {
  eyebrow: "Public records · 88 Ohio counties",
  heading: "County records belong to the public. We make them usable.",
  body:
    "Ohio's county governments already publish an enormous amount of data — parcels, " +
    "jurisdictions, hydrants, school districts, water providers, tax rates. It is scattered " +
    "across dozens of portals, buried in PDFs, or locked behind viewers that fall apart on a " +
    "phone. Statehouse gathers it, standardizes it, and publishes it as fast, free, " +
    "mobile-friendly maps and directories — one app per county, per subject. It started " +
    "with a public records request in Girard: water service accounts and registered rental " +
    "locations, mapped. The Trumbull County Combined Health District saw the work and " +
    "commissioned the next one. The infrastructure built for those now runs more than 200 " +
    "applications across all 88 counties.",
  primaryCta: { label: "Explore the county map", href: ORG.countyHub },
  secondaryCta: { label: "Talk to us", href: "#contact" },
};

export const STATS: { value: string; label: string }[] = [
  { value: "88", label: "Ohio counties in scope" },
  { value: "200+", label: "Applications published" },
  { value: "100%", label: "Free to read, no account" },
  { value: "0", label: "Trackers or ads" },
];

export const GOALS: { title: string; body: string }[] = [
  {
    title: "Make the record findable",
    body:
      "A resident should not need to know which county office owns a dataset to find it. " +
      "Statehouse indexes public records by county and by subject, so the question is " +
      '"what do I want to know about this place?" — not "which portal holds it?"',
  },
  {
    title: "Make it work on a phone",
    body:
      "Most county GIS viewers were designed for a desktop in an office. Ours are built " +
      "mobile-first: they load in seconds on a cell connection, work with one thumb, and " +
      "stay usable standing in a parking lot or a field.",
  },
  {
    title: "Keep the record free",
    body:
      "Looking is free, and stays free. Every app that publishes a county's own public " +
      "record is free to use — no advertising, no trackers, no reselling the public's data " +
      "back to the public. What carries a price is work the app does for you: sending a " +
      "notice to your customers, keeping a dataset current, a private deployment on your " +
      "own servers, the heavy transformation it sometimes takes to make a record usable at " +
      "all. That is how this started, and it is what pays for everything given away since.",
  },
  {
    title: "One pattern, every county",
    body:
      "Each county gets the same shape of application built on the same stack, so a tool " +
      "that works in Trumbull works identically in Butler. That consistency is what makes " +
      "88-county coverage achievable rather than aspirational.",
  },
];

export const APPS: { name: string; body: string }[] = [
  {
    name: "Parcels",
    body:
      "Searchable parcel maps with owner, acreage, valuation and address, drawn from the " +
      "county auditor's own published data.",
  },
  {
    name: "Information directories",
    body:
      "A curated, filterable index of the meaningful links in a county — government, " +
      "schools, health, business, community, recreation and news.",
  },
  {
    name: "Jurisdictions & boundaries",
    body:
      "Townships, municipalities, precincts and school districts drawn as clickable " +
      "boundaries so you can see exactly which lines a property falls inside.",
  },
  {
    name: "Infrastructure layers",
    body:
      "Fire stations, hydrants, address points and water providers — the operational " +
      "layers that first responders and utility crews actually ask for.",
  },
  {
    name: "Statewide topics",
    body:
      "Cross-county datasets published once for all of Ohio: libraries, public water " +
      "systems, learning institutions, data centers and income tax rates.",
  },
  {
    name: "Custom builds",
    body:
      "Have a dataset that matters to your community and nowhere good to put it? That is " +
      "the conversation we most want to have.",
  },
];

export const AUDIENCE: { title: string; body: string }[] = [
  {
    title: "County & municipal government",
    body:
      "You publish the data already. We turn it into something residents can actually use " +
      "— without a new procurement, a new server, or a per-seat licence.",
  },
  {
    title: "Utilities & first responders",
    body:
      "Hydrants, address points, service boundaries and jurisdiction lookups, in the field, " +
      "on the device already in your hand.",
  },
  {
    title: "Journalists & researchers",
    body:
      "Standardized, cross-county data with the provenance kept intact, so a story or a " +
      "study can span counties without re-doing the plumbing 88 times.",
  },
  {
    title: "Residents & businesses",
    body:
      "Who owns that lot, which township am I in, which school district, who provides the " +
      "water — answered in a few seconds, for free.",
  },
];

export const PROCESS: { step: string; title: string; body: string }[] = [
  {
    step: "01",
    title: "Tell us the county and the question",
    body:
      "Which county, which dataset, and what someone should be able to answer with it. " +
      "That is enough to start.",
  },
  {
    step: "02",
    title: "We locate and standardize the source",
    body:
      "We work from the authoritative public source — the auditor, the GIS department, " +
      "the state agency — and normalize it into the fleet's common shape.",
  },
  {
    step: "03",
    title: "You get a working app",
    body:
      "A deployed, public, mobile-friendly site at its own address, plus the source code, " +
      "plus a repeatable path to refresh it when the underlying data changes.",
  },
  {
    step: "04",
    title: "What it costs",
    body:
      "Nothing, to publish a county's public record and put it online for residents. Work " +
      "beyond that — a deployment on your own servers, a dataset kept current, features " +
      "that send, notify or act on the data rather than display it — is quoted directly. " +
      "The first of those was the Trumbull County Combined Health District in June 2026.",
  },
];

export const CONTACT = {
  heading: "Let's talk about your county",
  body:
    "Whether you are a county office with data that deserves a better front door, a utility " +
    "that needs a field tool, or a resident who has spotted something we got wrong — " +
    "send a note. Messages go straight to a person, not a queue.",
  subjects: [
    "General enquiry",
    "New county or dataset",
    "Partnership / government",
    "Report a data problem",
    "Press or research",
  ],
};
