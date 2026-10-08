import type { ReactElement } from 'react'
import { sessionBySlug, speakerBySlug } from './data/program'
import { sponsorBySlug } from './data/sponsors'
import AgendaPage from './pages/AgendaPage'
import SessionPage from './pages/SessionPage'
import SpeakersPage from './pages/SpeakersPage'
import SpeakerPage from './pages/SpeakerPage'
import SponsorsPage from './pages/SponsorsPage'
import SponsorPage from './pages/SponsorPage'
import TeamPage from './pages/TeamPage'

/**
 * Maps a URL path to its page body. The metadata for the same paths (title, description,
 * structured data) lives in data/routes.ts; the two are driven by the same programme data,
 * so a session or speaker added there gets both a page and a sitemap entry automatically.
 */
export function resolvePage(pathname: string): ReactElement | null {
  const path = pathname.endsWith('/') ? pathname : `${pathname}/`
  if (path === '/agenda/') return <AgendaPage />
  if (path === '/speakers/') return <SpeakersPage />
  if (path === '/sponsors/') return <SponsorsPage />
  if (path === '/team/') return <TeamPage />

  const session = path.match(/^\/agenda\/([^/]+)\/$/)
  if (session) {
    const s = sessionBySlug(session[1])
    return s ? <SessionPage session={s} /> : null
  }
  const speaker = path.match(/^\/speakers\/([^/]+)\/$/)
  if (speaker) {
    const s = speakerBySlug(speaker[1])
    return s ? <SpeakerPage speaker={s} /> : null
  }
  const sponsor = path.match(/^\/sponsors\/([^/]+)\/$/)
  if (sponsor) {
    const s = sponsorBySlug(sponsor[1])
    return s ? <SponsorPage sponsor={s} /> : null
  }
  return null
}
