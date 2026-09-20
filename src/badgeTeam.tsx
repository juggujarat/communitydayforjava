import React from 'react'
import ReactDOM from 'react-dom/client'
import Nav from './components/Nav'
import Badge from './components/Badge'
import Footer from './components/Footer'
import BrickDivider from './components/BrickDivider'
import { useDCEffects } from './hooks/useDCEffects'
import { A } from './lib/assets'
import { PRIVATE_BADGE_ROLE_IDS } from './lib/badge'
import './styles/global.css'

/**
 * Unlisted twin of /badge/ (src/badge.tsx) for Speaker/Sponsor/Organizer/Crew badges.
 * Not linked from Nav, not in sitemap.xml, and disallowed in robots.txt — its only
 * distribution is the direct URL shared manually. Restricted to PRIVATE_BADGE_ROLE_IDS
 * so Attendee/Java Enthusiast (the public page's roles) don't also show up here.
 */
function BadgeTeamPage() {
  useDCEffects()

  return (
    <div id="dc-root">
      <div id="badge-page" style={{ position: 'relative', width: '100%', overflow: 'hidden', background: '#131C56', paddingTop: '110px' }}>
        <Nav hashPrefix="/" />

        <Badge roleIds={PRIVATE_BADGE_ROLE_IDS} />
        <BrickDivider src={A['6310b061-eeb8-4ae2-a75c-7a329ad216e1']} />
        <Footer showSponsorCta={false} />
      </div>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BadgeTeamPage />
  </React.StrictMode>,
)
