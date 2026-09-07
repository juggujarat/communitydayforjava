import React from 'react'
import ReactDOM from 'react-dom/client'
import Nav from './components/Nav'
import Tickets from './components/Tickets'
import Footer from './components/Footer'
import BrickDivider from './components/BrickDivider'
import TicketsModal from './components/TicketsModal'
import { useDCEffects } from './hooks/useDCEffects'
import { closeTickets, useTicketsOpen } from './hooks/useTicketsModal'
import { A } from './lib/assets'
import './styles/global.css'

function TicketsPage() {
  useDCEffects()
  const ticketsOpen = useTicketsOpen()

  return (
    <div id="dc-root">
      {/* The nav is `position: fixed` and stays transparent until 40px of scroll, so the
          page needs a navy spacer its height before the hero starts — same as /cfp/. The
          bottom padding clears the page's own full-width sticky ticket bar. */}
      <div id="tickets-page" style={{ position: 'relative', width: '100%', overflow: 'hidden', background: '#131C56', paddingTop: '110px', paddingBottom: '86px' }}>
        <Nav hashPrefix="/" />

        <Tickets />
        <BrickDivider src={A['6310b061-eeb8-4ae2-a75c-7a329ad216e1']} />
        <Footer showSponsorCta={false} />
      </div>
      {ticketsOpen && <TicketsModal onClose={closeTickets} />}
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TicketsPage />
  </React.StrictMode>,
)
