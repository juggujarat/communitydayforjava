import React from 'react'
import ReactDOM from 'react-dom/client'
import Nav from './components/Nav'
import CFP from './components/CFP'
import Footer from './components/Footer'
import BrickDivider from './components/BrickDivider'
import { useDCEffects } from './hooks/useDCEffects'
import { A } from './lib/assets'
import './styles/global.css'

function CFPPage() {
  useDCEffects()

  return (
    <div id="dc-root">
      {/* The nav is `position: fixed` and stays transparent until 40px of scroll, so the
          page needs a navy spacer its height before the (light) CFP section starts. */}
      <div id="cfp-page" style={{ position: 'relative', width: '100%', overflow: 'hidden', background: '#131C56', paddingTop: '110px' }}>
        <Nav hashPrefix="/" />

        <CFP />
        <BrickDivider src={A['6310b061-eeb8-4ae2-a75c-7a329ad216e1']} />
        <Footer showSponsorCta={false} />
      </div>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CFPPage />
  </React.StrictMode>,
)
