# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

The website for **Community Day for Java (CDJ 2026)** — a Vite + React 18 + TypeScript
static site deployed to GitHub Pages on the custom domain in `CNAME`
(`www.communitydayforjava.com`). There is no backend. Brand palette: navy `#131C56`,
red `#FF384B`, yellow `#FEC400`.

Two pages, two Rollup entries (see `vite.config.ts`):

- `/` — `index.html` → `src/main.tsx` → `src/App.tsx`: the long single-page marketing site.
  Section order is `Nav → Hero → Manifesto → Venue → Agenda → WhyImpact → Gallery →
  Speakers → SponsorsWall → Sponsor → Partners → CommunityPartners → Organizers →
  Committee → Volunteers → Footer`, with `BrickDivider` separators between several of
  them, plus a fixed `ScrollButtons` overlay.
- `/cfp/` — `cfp/index.html` → `src/cfp.tsx`: a standalone Call-for-Papers page that
  reuses `Nav` / `Footer` / `BrickDivider` around `components/CFP.tsx`. Adding another
  standalone page means adding a `<dir>/index.html` + entry `.tsx` **and** registering it
  in `rollupOptions.input` — otherwise it silently won't build.

Shared components take props so both pages can use them: `<Nav hashPrefix="/">` rewrites
in-page anchors (`#venue` → `/#venue`) for standalone pages, and
`<Footer showSponsorCta={false}>` drops the link to the `#sponsor` section that only
exists on `/`.

**Ticketing runs on KonfHub, embedded in the popup.** Every ticket CTA is a
`<TicketsCta>` (Nav sticky bar, Hero, Manifesto, Footer) that opens `TicketsModal`: a
popup whose body is an iframe of KonfHub's checkout **widget**
(`konfhub.com/widget/<slug>`, built by `widgetUrl()` in `lib/tickets.ts`). Ticket list,
quantities, discount code, attendee form and payment all happen in-frame so the visitor
stays on the site; `allow="payment"` is required for the payment step. **Do not turn
Register into a link to `konfhub.com/checkout/...`** — navigating away has been
rejected. Payment cannot move into our own UI either: static site, no backend, no
gateway.

Ticket names/prices are **not** mirrored in this repo (the widget is live); only
`KONFHUB_TICKET_IDS`, which tells the widget which tickets to show and pre-select
(`tickets=<ids>` comma-separated, `ticketId=<id>|<qty>` semicolon-separated). Add an id
there when a new ticket type is created on KonfHub, or it won't appear.

**Branding — the one open issue.** The widget renders a footer image from the event's
`checkout_footer_icon`, defaulting to a KonfHub logo. It cannot be removed from this
codebase: their code hides it only inside KonfHub's own admin dashboard, no URL
parameter disables it, a cross-origin frame can't be restyled, and it can't be cropped
(on phones their layout pins Total/Proceed to the frame bottom with the logo mid-page,
so trimming would hide their Proceed button). The fix is uploading our own artwork under
**White Labelling** in the KonfHub event dashboard (events.konfhub.com) — how TechSparks
shows "Powered by YourStory". Never attempt a markup hack for it here.

The button label still reads "Tickets Coming Soon" (`TICKETS_COMING_SOON` in
`lib/links.ts`) by explicit request; keep the wording identical across the four
placements. `TICKET_MAILTO`/`MAIL` are legacy and unused. CFP submissions go to
Sessionize via `CFP_SESSIONIZE`.

## Commands

```bash
npm install        # first-time setup
npm run dev        # Vite dev server (hot reload) — primary local workflow
npm run build      # tsc --noEmit (typecheck) then vite build -> dist/
npm run preview    # serve the production build from dist/
npm run typecheck  # tsc --noEmit only
```

There is no test suite and no linter. TypeScript is `strict` with `noUnusedLocals` /
`noUnusedParameters`, so a stray import or unused param fails `build`; run `typecheck`
before considering a change done.

## Origin and how to work on it

The site was converted from a design-tool bundle (a React app authored in JSX and
transpiled in-browser by Babel Standalone) into this project. That bundle has been
deleted — there is no `legacy/` reference copy. If a section looks off, work from the
live design/content requirements rather than inventing markup.

The conversion is why the codebase looks the way it does: **styling is almost entirely
inline styles**, ported verbatim from the bundle's `React.createElement` calls, and
scroll behaviors are DOM-queried rather than ref-wired. Match the surrounding style
instead of introducing CSS modules / class-based styling in one section.

## Architecture

`src/main.tsx` | `src/cfp.tsx` (bootstraps) → `App.tsx` / `CFPPage` → `components/*` (one
file per section, plus shared pieces `BrickDivider`, `LogoCard`, `FollowSocials`,
`ScrollButtons`), with helpers in `lib/` and `hooks/`. Content is inline in the
components, not in data files.

### Two hard constraints on styling

- **The root wrapper must keep `id="dc-root"`.** `src/styles/global.css` targets
  `#dc-root h1/h2`, `#dc-root nav`, `#dc-root section`, `#dc-root footer` etc. for
  typography and mobile layout. Renaming it silently breaks styling site-wide.
- **Mobile responsiveness is driven by attribute selectors that match inline style
  strings** — e.g. `#dc-root [style*="repeat(4, minmax(0px, 1fr)"]` collapses a
  4-column grid to 2 (and to a horizontal snap-scroller under 600px), and
  `[style*="margin-bottom: 48px"]` shrinks section spacing. React serializes inline
  styles in a specific form (`repeat(4, minmax(0px, 1fr))`, `margin-bottom: 48px`), so
  the inline value must match these selectors **character for character** or the
  responsive rule won't apply. Read `global.css` before changing any grid, gap, or
  margin that appears there.

`global.css` holds only resets, the Google Fonts `@import`, `@keyframes` (`cdj-*`), and
these responsive overrides — no per-component classes.

### Scroll/mount behaviors are DOM-driven and section-agnostic

`hooks/useDCEffects.ts` (ported from the bundle's `DCLogic`) queries the whole document
by `data-*` attributes and IDs on every scroll tick. A section **opts into an effect by
adding the attribute**, not by wiring refs:

- `data-reveal` (+ optional `data-reveal-d` delay ms) — fade/slide-in on scroll
- `data-cta` — red/yellow gradient CTA styling applied at mount
- `data-count` (+ `data-suffix`) — animated count-up
- `data-zoom` / `data-zoomimg` — gallery zoom-on-scroll
- IDs the hook looks for by name: `#cdj-nav` (scroll background), `#cdj-nav-links`
  (desktop/mobile switch), `#gallery` (click-to-open lightbox with keyboard nav),
  `#cdj-intro` (timed intro overlay)

The hook also honors `prefers-reduced-motion` by revealing everything immediately.
`data-count`, `data-zoom*` and `#cdj-intro` are supported but currently used by no
component — they still work if a new section opts in.

### Shared helpers

- `lib/handlers.ts` — the `h` object: hover/interaction handlers that mutate inline
  styles (ported from the bundle's `onmouseenter`/`onmouseleave`). Attach via
  `onMouseEnter={h.btnOn}` / `onMouseLeave={h.btnOff}`, `h.cardOn/Off`, `h.socOn/Off`, etc.
- `lib/decor.tsx` — decorative pieces (floating `shape`s, `marqueeBand`s, per-section
  `*Shapes` layers, `Ticker`) and the extended `PALETTE`.
- `lib/icons.tsx` — `Icon`, `SocialLink`, `SocialRow` and the `Social` type; `<path>`
  data and sizes match the bundle exactly.
- `lib/socials.ts` — `SOCIALS`, the single source of truth for the event's own
  LinkedIn/Instagram/X handles. Person-specific socials stay inline in their component.
- `lib/links.ts` — shared CTA link/copy constants (see "Tickets" above).

### Assets — two mechanisms, don't mix them up

- **Bundle-era images** live in `public/assets/<uuid>.<ext>` with mixed extensions
  (`.webp`, `.jpg`, `.png`, `.svg`, one `.MP4`). Reference them through the `A` map in
  `lib/assets.ts` (`A['<uuid>']`), which keeps the varying extension correct in one
  place — don't hardcode `/assets/...` paths.
- **New small icons** live in `src/assets/icons/*.svg` and are imported as modules
  (`import coffee from '../assets/icons/coffe.svg'`), so Vite fingerprints them.

`vite.config.ts` sets `assetsInlineLimit: 0` to keep assets as files rather than data URIs.

## Deploy notes / known gaps

- `.github/workflows/deploy.yml` builds and publishes `dist/` to GitHub Pages on every
  push to `main` (checkout → `npm ci` → `npm run build` → upload/deploy the Pages
  artifact). `base` stays `/` because the site is served from a domain root.
- `CNAME` exists at both the repo root and `public/CNAME`; the `public/` copy is the one
  that matters — Vite copies it into `dist/CNAME` as part of the build.
- SEO metadata (title/OG/Twitter tags + schema.org `Event` JSON-LD) is hand-maintained in
  root `index.html`. `cfp/index.html` has only a title/description and still points its
  favicon at a nonexistent `/vite.svg` — worth fixing if you touch that file.
- `dist/` is a local build artifact and is gitignored; outside the CI workflow above it
  is not published anywhere.
