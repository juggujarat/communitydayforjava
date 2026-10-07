import type { ReactNode } from 'react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import BrickDivider from '../components/BrickDivider'
import TicketsModal from '../components/TicketsModal'
import { useDCEffects } from '../hooks/useDCEffects'
import { closeTickets, useTicketsOpen } from '../hooks/useTicketsModal'
import { A } from '../lib/assets'

/**
 * Common frame for the programme pages (/agenda/..., /speakers/...): navy shell, nav
 * (in-page anchors rewritten to /#...), footer, and the shared ticket popup so every
 * "Register Now" on these pages opens checkout in place. `#program-page` carries the
 * spacer for the fixed nav (stepped down at 768px in global.css, like #cfp-page).
 */
export default function PageShell({ children }: { children: ReactNode }) {
  useDCEffects()
  const ticketsOpen = useTicketsOpen()
  return (
    <div id="dc-root">
      <div id="program-page" style={{ position: 'relative', width: '100%', overflow: 'hidden', background: '#131C56', paddingTop: '110px' }}>
        <Nav hashPrefix="/" />
        <main style={{ padding: '48px 24px 84px', background: 'radial-gradient(100% 80% at 85% 0%,#1a2670,#0E1667 72%)' }}>
          <div style={{ maxWidth: '1120px', margin: '0 auto' }}>{children}</div>
        </main>
        <BrickDivider src={A['6310b061-eeb8-4ae2-a75c-7a329ad216e1']} />
        <Footer />
      </div>
      {ticketsOpen && <TicketsModal onClose={closeTickets} />}
    </div>
  )
}

/** "Home / Agenda / …" trail. Visible text matches the BreadcrumbList JSON-LD. */
export function Crumbs({ items }: { items: [string, string?][] }) {
  return (
    <div role="navigation" aria-label="Breadcrumb" style={{ marginBottom: '26px', fontSize: '13.5px', fontWeight: 600, color: '#8890c8', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
      {items.map(([label, href], i) => (
        <span key={label} style={{ display: 'inline-flex', gap: '8px', minWidth: 0 }}>
          {i > 0 && <span aria-hidden="true">/</span>}
          {href ? <a href={href} style={{ color: '#FEC400', textDecoration: 'none' }}>{label}</a> : <span style={{ color: '#c4caf0' }} aria-current="page">{label}</span>}
        </span>
      ))}
    </div>
  )
}
