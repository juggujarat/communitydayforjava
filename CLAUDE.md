# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

The website for **Community Day for Java (CDJ 2026)** — a Vite + React 18 + TypeScript
static site deployed to GitHub Pages on the custom domain in `CNAME`
(`www.communitydayforjava.com`). There is no backend. Brand palette: navy `#131C56`,
red `#FF384B`, yellow `#FEC400`.

Two pages, two Rollup entries (see `vite.config.ts`):

- `/` — `index.html` → `src/main.tsx` → `src/App.tsx`: the long single-page marketing site.
  Section order is `Nav → Hero → WhyImpact → Agenda → Gallery →
  Speakers → SponsorsWall → Partners → CommunityPartners → Footer` (kept deliberately lean: the Venue
  section and the sponsorship deck were removed; the deck, `components/Sponsor.tsx`, lives only on
  `/sponsors/`, and `Organizers` / `Committee` / `Volunteers` live on `/team/` (`pages/TeamPage.tsx`),
  which the nav "Team" link opens), with `BrickDivider` separators between several of
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
`<TicketsCta>` (Nav sticky bar, Hero, Footer) that opens `TicketsModal`: a
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

## Standalone pages (multi-page Vite build)

Besides the single-page `index.html`, the build has two extra entries registered in
`vite.config.ts` under `build.rollupOptions.input`:

- `cfp/index.html` -> `src/cfp.tsx` -> `components/CFP` (`/cfp/`)
- `badge/index.html` -> `src/badge.tsx` -> `components/Badge` (`/badge/`)

Both follow the same shell: `#dc-root` > a navy wrapper with `paddingTop` for the fixed
nav (`#cfp-page` / `#badge-page`, both stepped down in `global.css` at 768px where the
nav logo shrinks) > `Nav hashPrefix="/"` > the section > `BrickDivider` >
`Footer showSponsorCta={false}`. Adding a page means adding the entry, an `index.html`
with its own meta tags, a `src/<page>.tsx` bootstrap, a `public/sitemap.xml` row, and a
`MENU_LINKS` entry in `Nav.tsx`.

**The badge builder** (`/badge/`) renders a shareable 1080x1350 attendee badge into a
`<canvas>`: `components/Badge.tsx` holds the form/preview UI, `lib/badge.ts` holds the
canvas renderer plus the PNG export/download helpers. It is deliberately
dependency-free — no html-to-image library — so all layout is in badge coordinates and
the exported PNG is identical across browsers. Notes for changing it:

- Photos never leave the browser (object URL -> `<img>` -> `drawImage`). Every image the
  badge draws is same-origin, so the canvas is never tainted and `toBlob` keeps working.
- `loadBadgeFonts()` must resolve before the first paint, otherwise canvas text silently
  falls back to a system font. Any new `ctx.font` size/weight needs a matching entry in
  `FONT_SPECS`.
- `photoFrame()` is the single source of truth for the crop: it clamps the pan so the
  photo always covers the circle. Both the renderer and the drag handler go through it.
- LinkedIn/X/WhatsApp cannot attach an image from a link, so those buttons download the
  PNG first and then open the composer. `navigator.share` with files is offered
  separately for phones.
- `BADGE_EVENT_YEAR` is drawn under the logo in the top-left masthead (`LOGO` in
  `lib/badge.ts`) — it is the badge's one statement of which edition this is. The rule
  between the slogan and the place is now a plain divider.
- `BADGE_EVENT_PLACE` duplicates the still-tentative venue from the `FACTS` block in
  `components/CFP.tsx` — update both together. The event date is intentionally left off
  the badge while it is tentative.

## Programme pages (agenda + speakers) — generated, prerendered

`/agenda/`, `/agenda/<session>/`, `/speakers/` and `/speakers/<speaker>/` are **generated
from data**, not hand-written entries. The sessions are the sales pitch (the speakers are
not household names), so every card leads with the *outcome* the attendee takes away, the
real talk title second, and the speaker as a small supporting line.

- **Data:** `scripts/sync-sessionize.mjs` (`npm run sync:sessionize`) pulls Sessionize
  event `8gzqf0q3` into the committed snapshot `src/data/sessionize.json`. That endpoint is
  an *embed* (HTML), so the script parses markup and fails loudly if it changes. The build
  never calls Sessionize — it reads the snapshot. Sessionize has **no day/format/category
  data**, so `src/data/program.ts` layers that on: `SESSION_EXTRAS` (keyed by Sessionize
  session id: day, kind, outcome headline, takeaways, audience, tags, slug) and
  `SPEAKER_EXTRAS` (curated bio, links, cutout image/bg). A session with no
  `SESSION_EXTRAS` entry throws at build — add one when a session appears in Sessionize.
  Speakers **not** in the embed (Mala Gupta's invited keynote; Harshvardhan Parmar, accepted but
  not yet published there) live in `LOCAL_SPEAKERS` / `LOCAL_SESSIONS`. `SPEAKER_ORDER` lists every
  speaker slug (local ones included). If a local speaker later shows up in the snapshot, move them
  to the `*_EXTRAS` maps and delete the local entry, or they appear twice.
- **Two days, one system:** `DAYS` in `program.ts` — Workshop (17 Oct, green `#02CF70`,
  "Build") and Conference (24 Oct, yellow `#FEC400`, "Learn"). `DayChip` / `SessionCard` /
  `DayLegend` / `TicketBand` in `components/program/parts.tsx` are the only places a day
  is styled; never add a third colour per day. Ticket copy there references the "Regular +
  Workshop Pass" (see `TICKET_PLANS`) — keep in step if KonfHub tiers change.
- **Timetable + venue:** `SCHEDULE` in `program.ts` is the organisers' running order per day (24h
  `HH:MM`, IST). Conference: 8:00 AM to 6:00 PM, back-to-back 30-min talks; the 2:00–3:00 PM slot is
  `tbc` ("Session to be revealed soon"). Non-session slots get an icon + one-line explanation from
  `SLOT_INFO` in `components/program/Timetable.tsx`, keyed by the slot **title** — rename a slot in
  both places. Welcome/closing notes carry `hosts` (keys into `HOSTS`, organiser photos). `VENUE` holds each day's venue: the two days are at **different venues** — workshop at smartSense,
  GIFT One, GIFT City, Gandhinagar (venue partner logo `public/assets/smartsense-logo.svg`), conference at
  the Gujarat University Centre for Professional Courses, Ahmedabad. Each entry carries the venue partner
  (logo + site) and Google Maps links built from a text query; the agenda page shows both days up front
  with a `VenueCard` (partner logo, address, map buttons, embedded map) under each day header. Never
  assume "Ahmedabad" for a workshop page — use `VENUE[day].city` / `.short`. A session's page, cards and JSON-LD times all come from its `SCHEDULE` slot
  via `slotOf()`. The agenda page's ticket cards render `TICKET_PLANS` verbatim, so don't
  hand-copy inclusions there.
- **Speaker line-up:** `LINEUP` in `program.ts` drives both the home "Meet the speakers" grid and
  `/speakers/`: conference speakers in running order, then the workshop's, then every unconfirmed slot
  last as a "revealed soon" placeholder (`components/program/Mystery.tsx`: blurred silhouette + light
  sweep, shimmering name bars). Confirming a slot (adding its session) promotes it automatically.
- **Sponsors:** `SponsorsWall` (#sponsors-wall, the nav's "Sponsor" target) is ONE side-by-side grid, two rows of
  two with mirrored widths so it stays symmetric: Platinum (wider, biggest logo) | Gold, then Venue Sponsor |
  Community Patreon (smaller logos), each with a colour-coded label and top edge, then a full-width
  **Community Supporter** row (an individual's contribution, a person card instead of a logo; the old
  standalone `CommunitySupporter` section is gone). It collapses to a single column below 900px
  (`#sponsor-tiers` + `data-tier` in `global.css`), keeping the size steps. Keep new sponsors in the right tier.
- **Sponsors pages:** `/sponsors/` is a short list (logo, tier, one line); each sponsor has a detail page `/sponsors/<slug>/` with about, products & services and a "Connect" section (website, public email or contact page, social profiles; no phone numbers or addresses, by request). All generated from `src/data/sponsors.ts` (`SponsorsPage.tsx`, `SponsorPage.tsx`; meta/JSON-LD/sitemap rows in `data/routes.ts`). The logo wall tiles link to the detail pages; keep the data in step with the tiers in `SponsorsWall.tsx`.
- **Routes/SEO:** `src/data/routes.ts` builds title/description/canonical/OG/JSON-LD
  (`EducationEvent` per session, `ProfilePage`/`Person` per speaker, breadcrumbs) and the
  sitemap, from the same data. `src/routes.tsx` maps path → page (`src/pages/*`).
  Everything shares one entry: `page.html` → `src/page.tsx`.
- **Build:** `npm run build` = typecheck → `vite build` → `vite build --ssr
  src/prerender.tsx` → `scripts/prerender.mjs`, which stamps the built `dist/page.html`
  into `dist/<route>/index.html` with real `<head>` tags and server-rendered body (so
  LinkedIn/WhatsApp/X previews and non-JS crawlers see content), writes `dist/sitemap.xml`
  (there is no `public/sitemap.xml` any more) and deletes the template. The client then
  mounts over it with `createRoot`. Dev serves the same routes via the
  `programmePages` plugin in `vite.config.ts` (client-rendered, no SSR).
- **SSR rules for these pages:** no `window`/`document` at render time, no module asset
  imports (use `/assets/...` public paths or inline SVG), no `<section>`/`<nav>` elements
  (`global.css` styles `#dc-root section|nav` globally — use `div`/`role="navigation"`),
  and avoid grid strings matched by the `[style*="minmax(180|220|260|320px, 1fr)"]`
  mobile rules (use `minmax(min(100%, Npx), 1fr)`).
- The old per-speaker entry files (`speakers/*/index.html`, `src/*-speaker.tsx`) are gone;
  speaker URLs are unchanged. The home `Agenda`/`Speakers` sections are glances that link
  into these pages. Nav "Agenda"/"Speakers" go to `/agenda/` and `/speakers/`.

## Navigation (floating glass nav)

`components/Nav.tsx` is one element (`#cdj-nav-pill`, inside a click-through fixed wrapper
`#cdj-nav`) that morphs between two states on scroll (>40px, tracked in Nav itself; both carry
`data-scrolled` and `global.css` keys the mobile overrides off it):

- **Top of page:** the original look — full-width, transparent, 74px logo, plain links
  (yellow on hover), red Register CTA.
- **Scrolled:** a centred frosted-glass pill (backdrop blur, red/yellow blobs drifting behind the
  glass, a highlight that slides to the hovered link and rests on the current page's link via
  `activeKey`). Every property transitions, so the change is smooth.

`useDCEffects` only toggles `#cdj-nav-links` by viewport width — it shows them above **1040px**
(the burger rule in `global.css` uses the same breakpoint; change both together). The mobile
menu panel and `#cdj-sticky-cta` are unchanged. Fixed-nav spacers (`#program-page`,
`#cfp-page`, hero) assume the ~110px top-state bar.

## Commands

```bash
npm install            # first-time setup
npm run dev            # Vite dev server (hot reload) — primary local workflow
npm run build          # typecheck, vite build, SSR build, prerender -> dist/
npm run preview        # serve the production build from dist/
npm run typecheck      # tsc --noEmit only
npm run sync:sessionize  # refresh src/data/sessionize.json from Sessionize
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
