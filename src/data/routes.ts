/**
 * Route table for the generated pages (/agenda/, /agenda/<session>/, /speakers/,
 * /speakers/<speaker>/): title, description, canonical URL and structured data.
 *
 * Pure data — shared by the dev server (vite.config.ts), the client bootstrap and the
 * build-time prerender (scripts/prerender.mjs), so the <head> a crawler or link preview
 * reads is identical everywhere. Page bodies live in src/routes.tsx.
 */
import {
  DAYS, PROGRAM_UPDATED, SESSIONS, SPEAKERS, VENUE,
  sessionPath, speakerPath, speakersOf, sessionsOf,
  type DayId,
  type Session, type Speaker,
} from './program'

export const SITE = 'https://www.communitydayforjava.com'
const EVENT_NAME = 'Community Day for Java 2026'
const OG_IMAGE = `${SITE}/og-image.jpg`
const ORGANIZER = { '@type': 'Organization', name: 'Java User Group Gujarat', url: 'https://www.gujaratjug.org' }

export interface RouteMeta {
  path: string
  title: string
  description: string
  image: string
  ogType: 'website' | 'article' | 'profile'
  jsonLd: object[]
  lastmod: string
  changefreq: string
  priority: number
}

const abs = (path: string) => `${SITE}${path}`
const absImage = (src: string) => (src.startsWith('http') ? src : abs(encodeURI(src)))

const location = (dayId: DayId) => {
  const v = VENUE[dayId]
  return {
    '@type': 'Place',
    name: v.name,
    hasMap: v.mapUrl,
    address: { '@type': 'PostalAddress', streetAddress: v.address.replace(/, India$/, ''), addressLocality: v.city, addressRegion: 'Gujarat', postalCode: v.postalCode, addressCountry: 'IN' },
    ...(v.coords ? { geo: { '@type': 'GeoCoordinates', latitude: v.coords.lat, longitude: v.coords.lng } } : {}),
  }
}

const crumbs = (items: [string, string][]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: abs(path) })),
})

const person = (s: Speaker) => ({ '@type': 'Person', name: s.name, jobTitle: s.role, url: abs(speakerPath(s)) })

function sessionEvent(s: Session) {
  const day = DAYS[s.day]
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationEvent',
    name: s.title,
    description: s.summary,
    // Date only: session times are tentative, so they are shown on /agenda/ alone.
    startDate: day.iso,
    endDate: day.iso,
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    inLanguage: 'en',
    url: abs(sessionPath(s)),
    image: [OG_IMAGE],
    location: location(s.day),
    organizer: ORGANIZER,
    performer: speakersOf(s).map(person),
    keywords: s.tags.join(', '),
    superEvent: { '@type': 'Event', name: EVENT_NAME, url: `${SITE}/` },
  }
}

export function getRoutes(): RouteMeta[] {
  const base = { lastmod: PROGRAM_UPDATED, changefreq: 'weekly' }
  const titles = SESSIONS.map((s) => s.title)

  const routes: RouteMeta[] = [
    {
      path: '/agenda/',
      title: `Agenda & Sessions | ${EVENT_NAME}, Ahmedabad`,
      description: `Full timetable, venue map and ticket details for ${EVENT_NAME}: a hands-on workshop (${DAYS.workshop.date}, ${VENUE.workshop.short}) and the main conference (${DAYS.conference.date}, ${VENUE.conference.short}). ${SESSIONS.length} sessions on AI agents, production RAG, JVM performance, Spring Modulith and zero-trust security.`,
      image: OG_IMAGE, ogType: 'website', ...base, priority: 0.9,
      jsonLd: [
        crumbs([['Home', '/'], ['Agenda', '/agenda/']]),
        {
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: `${EVENT_NAME} sessions`,
          itemListElement: SESSIONS.map((s, i) => ({ '@type': 'ListItem', position: i + 1, name: titles[i], url: abs(sessionPath(s)) })),
        },
      ],
    },
    {
      path: '/speakers/',
      title: `Speakers | ${EVENT_NAME}, Ahmedabad`,
      description: `Meet the ${SPEAKERS.length} speakers of ${EVENT_NAME}: engineers, architects and developer advocates teaching AI agents, RAG, JVM performance, Spring Modulith and zero-trust security.`,
      image: OG_IMAGE, ogType: 'website', ...base, priority: 0.8,
      jsonLd: [
        crumbs([['Home', '/'], ['Speakers', '/speakers/']]),
        {
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: `${EVENT_NAME} speakers`,
          itemListElement: SPEAKERS.map((s, i) => ({ '@type': 'ListItem', position: i + 1, name: s.name, url: abs(speakerPath(s)) })),
        },
      ],
    },
  ]

  for (const s of SESSIONS) {
    const day = DAYS[s.day]
    routes.push({
      path: sessionPath(s),
      title: `${s.title} | ${EVENT_NAME}`,
      description: `${s.summary} ${day.label}, ${day.date}, ${VENUE[s.day].short}. By ${speakersOf(s).map((p) => p.name).join(' & ')}.`,
      image: OG_IMAGE, ogType: 'article', ...base, priority: 0.8,
      jsonLd: [crumbs([['Home', '/'], ['Agenda', '/agenda/'], [s.title, sessionPath(s)]]), sessionEvent(s)],
    })
  }

  for (const sp of SPEAKERS) {
    const talks = sessionsOf(sp)
    routes.push({
      path: speakerPath(sp),
      title: `${sp.name} | Speaker at ${EVENT_NAME}`,
      description: `${sp.name}, ${sp.role}, speaks at ${EVENT_NAME}${talks.length ? `: "${talks[0].title}"` : ''}. ${sp.bio[0].slice(0, 110).replace(/\s+\S*$/, '')}…`,
      image: absImage(sp.image), ogType: 'profile', ...base, priority: 0.7,
      jsonLd: [
        crumbs([['Home', '/'], ['Speakers', '/speakers/'], [sp.name, speakerPath(sp)]]),
        {
          '@context': 'https://schema.org',
          '@type': 'ProfilePage',
          mainEntity: {
            '@type': 'Person',
            name: sp.name,
            jobTitle: sp.role,
            description: sp.bio[0],
            image: absImage(sp.image),
            url: abs(speakerPath(sp)),
            knowsAbout: sp.topics,
            sameAs: sp.links.map((l) => l.href).filter((h) => h.startsWith('http')),
          },
        },
        ...talks.map(sessionEvent),
      ],
    })
  }
  return routes
}

/** Static pages that live outside the generated set but belong in the same sitemap. */
const STATIC_PAGES = [
  { path: '/', lastmod: '2026-07-19', changefreq: 'weekly', priority: 1.0 },
  { path: '/cfp/', lastmod: '2026-08-21', changefreq: 'weekly', priority: 0.8 },
  { path: '/badge/', lastmod: '2026-08-24', changefreq: 'monthly', priority: 0.7 },
]

export function sitemapXml(): string {
  const rows = [...STATIC_PAGES, ...getRoutes()]
    .map((r) => `  <url>\n    <loc>${abs(r.path)}</loc>\n    <lastmod>${r.lastmod}</lastmod>\n    <changefreq>${r.changefreq}</changefreq>\n    <priority>${r.priority.toFixed(1)}</priority>\n  </url>`)
    .join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${rows}\n</urlset>\n`
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/** Everything that belongs in <head> for a route (the page shell has no title of its own). */
export function headTags(r: RouteMeta): string {
  const url = abs(r.path)
  return [
    `<title>${esc(r.title)}</title>`,
    `<meta name="description" content="${esc(r.description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:site_name" content="${EVENT_NAME}" />`,
    `<meta property="og:type" content="${r.ogType}" />`,
    `<meta property="og:title" content="${esc(r.title)}" />`,
    `<meta property="og:description" content="${esc(r.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${esc(r.image)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(r.title)}" />`,
    `<meta name="twitter:description" content="${esc(r.description)}" />`,
    `<meta name="twitter:image" content="${esc(r.image)}" />`,
    ...r.jsonLd.map((j) => `<script type="application/ld+json">${JSON.stringify(j).replace(/</g, '\\u003c')}</script>`),
  ].join('\n    ')
}
