# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

The website for **Community Day for Java (CDJ 2026)** — a single-page marketing site
(sections: hero, why/manifesto, speakers, agenda/schedule, venue, partners, sponsors,
tickets/register, gallery, footer). Deployed as a static site via GitHub Pages to the
custom domain in `CNAME` (`communitydayforjava.com`). Brand palette: navy `#131C56`,
red `#FF384B`, yellow `#FEC400`. Ticket registration is a `mailto:` link — there is no
backend.

## Current state: converted from a bundle to a real React app

The branch `feature/convert-in-react-deep-01` converted the site from a single generated
`index.html` bundle into a **Vite + React 18 + TypeScript** project. The port is now
essentially complete — `src/App.tsx` renders the **full** document in original order:
`Nav → Hero → Manifesto → WhyImpact → Goodies → Speakers → Venue → Agenda → Committee →
Organizers → Gallery → Sponsor → SponsorsWall → Partners → CommunityPartners → Volunteers
→ Footer`, with `BrickDivider` separators between several sections. Remaining work is
polish, not porting whole sections.

The original design-tool bundle (`legacy/original-bundle.html`, a React app authored in
JSX and transpiled in-browser by Babel Standalone) was removed once the port was
verified complete — it's no longer available as a reference. If a ported section looks
off, work from the live design/content requirements directly rather than inventing markup.

- `index.html` (root) is now the **Vite entry point** (a `#root` div + `<script
  type="module" src="/src/main.tsx">`), not the bundle.

## Commands

```bash
npm install        # first-time setup
npm run dev        # Vite dev server (hot reload) — primary local workflow
npm run build      # tsc --noEmit (typecheck) then vite build -> dist/
npm run preview    # serve the production build from dist/
npm run typecheck  # tsc --noEmit only
```

There is no test suite or linter. TypeScript is `strict` with `noUnusedLocals` /
`noUnusedParameters`, so a stray import or unused param fails `build`; run `typecheck`
before considering a change done.

## Architecture & porting conventions

Source lives in `src/`: `main.tsx` (bootstrap) → `App.tsx` → `components/*` (one file per
section, plus small shared pieces `BrickDivider` and `LogoCard`), with shared helpers in
`lib/` and `hooks/`. (`src/data/` exists but is currently empty — content is inline in the
components.)

**Styling is almost entirely inline styles**, ported verbatim from the bundle's
`React.createElement` calls. `src/styles/global.css` holds only resets, `@keyframes`
(`cdj-*`), and responsive overrides — not per-component classes. Two hard constraints:

- **The root wrapper must keep `id="dc-root"`.** `global.css` targets `#dc-root h1/h2`,
  `#dc-root nav`, `#dc-root section`, etc. for typography and mobile layout. Renaming it
  silently breaks styling.
- **Mobile responsiveness is driven by attribute selectors that match inline style
  strings** — e.g. `#dc-root [style*="repeat(4, minmax(0px, 1fr)"]` collapses a 4-column
  grid on phones. When porting a section, the inline `gridTemplateColumns` (and similar)
  string must match these selectors **exactly**, or the responsive rules won't apply.
  Check `global.css` before changing any grid's inline style.

**Scroll/mount behaviors are DOM-driven and section-agnostic** — `hooks/useDCEffects.ts`
(ported from the bundle's `DCLogic`) queries the whole document by `data-*` attributes and
IDs on every scroll tick. A newly ported section **opts into effects by adding the right
attributes**, not by wiring refs:
- `data-reveal` (+ optional `data-reveal-d` delay ms) — fade/slide-in on scroll
- `data-count` (+ `data-suffix`) — animated count-up
- `data-cta` — gets the red/yellow gradient CTA styling applied at mount
- `data-zoom` / `data-zoomimg` / `data-zoomstage` / `data-zoomcap` — gallery zoom-scroll
- IDs the hook looks for by name: `#cdj-nav`, `#cdj-nav-links`, `#gallery`, `#cdj-intro`

**Shared helpers:**
- `lib/handlers.ts` — the `h` object: hover/interaction handlers that mutate inline styles
  (ported from the bundle's `onmouseenter`/`onmouseleave`). Attach via
  `onMouseEnter={h.btnOn}` / `onMouseLeave={h.btnOff}`, etc.
- `lib/decor.tsx` — generative/decorative pieces (floating `shape`s, `marqueeBand`s,
  per-section `*Shapes` layers, `SpeakerCards`, `Ticker`) and the extended `PALETTE`.
- `lib/icons.tsx` — social/brand icons (`linkedin`/`x`/`github`/`instagram`/`website`) and
  the round social-link chip used on people cards (committee, organizers, volunteers,
  footer). `<path>` data and sizes match the bundle exactly.
- `lib/links.ts` — the shared `mailto:` CTAs (`MAIL`, `TICKET_MAILTO`, `CFP_MAILTO`).
  Registration/CFP are mailto links; reuse these constants rather than hardcoding.

**Assets:** the bundle's UUID-keyed blobs are extracted to `public/assets/<uuid>.<ext>`
(mixed `.png`/`.jpg`/`.svg` extensions). Reference them through the `A` map in
`lib/assets.ts` (`A['<uuid>']` → `/assets/<uuid>.<ext>`), which keeps the varying
extension correct in one place — don't hardcode the path. `vite.config.ts` sets
`assetsInlineLimit: 0` to keep them as files. Fonts that were embedded woff2 blobs are now
a Google Fonts `@import` at the top of `global.css`.

## Deploy notes / known gaps

- `.github/workflows/deploy.yml` builds and publishes `dist/` to GitHub Pages on every
  push to `main` (checkout → `npm ci` → `npm run build` → upload/deploy the Pages
  artifact). `CNAME` lives in `public/CNAME`, so Vite copies it into `dist/CNAME`
  automatically as part of the build — no manual step needed there.
- `dist/` is a local build artifact (from `npm run build`); outside of the CI workflow
  above, it is not published anywhere automatically.
