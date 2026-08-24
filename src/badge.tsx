import React from 'react'
import ReactDOM from 'react-dom/client'
import Nav from './components/Nav'
import Badge from './components/Badge'
import Footer from './components/Footer'
import BrickDivider from './components/BrickDivider'
import { useDCEffects } from './hooks/useDCEffects'
import { A } from './lib/assets'
import './styles/global.css'

function BadgePage() {
  useDCEffects()

  return (
    <div id="dc-root">
      {/* Same spacer trick as the CFP page: the nav is `position: fixed` and transparent
          until 40px of scroll, so a navy band its height has to sit above the light section. */}
      <div id="badge-page" style={{ position: 'relative', width: '100%', overflow: 'hidden', background: '#131C56', paddingTop: '110px' }}>
        <Nav hashPrefix="/" />

        <Badge />
        <BrickDivider src={A['6310b061-eeb8-4ae2-a75c-7a329ad216e1']} />
        <Footer showSponsorCta={false} />
      </div>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BadgePage />
  </React.StrictMode>,
)
