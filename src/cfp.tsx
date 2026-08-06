import React from 'react'
import ReactDOM from 'react-dom/client'
import CFP from './components/CFP'
import Footer from './components/Footer'
import BrickDivider from './components/BrickDivider'
import { CFP_SESSIONIZE } from './lib/links'
import { useDCEffects } from './hooks/useDCEffects'
import { A } from './lib/assets'
import './styles/global.css'

function CFPPage() {
  useDCEffects()

  return (
    <div id="dc-root">
      <div style={{ position: 'relative', width: '100%', overflow: 'hidden', background: '#131C56' }}>
        <header id="cfp-topbar" style={{ position: 'sticky', top: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', padding: '16px 40px', background: 'rgba(13,19,70,.88)', backdropFilter: 'blur(12px)', boxShadow: '0 8px 30px rgba(0,0,0,.22)' }}>
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '13px', textDecoration: 'none' }}>
            <img src="/assets/cd2b3de0-e87e-45cf-8bd3-459baf76597f.svg" alt="Community Day for Java" style={{ height: '58px', width: 'auto', display: 'block' }} />
          </a>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <a href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'transparent', color: '#fff', fontWeight: 700, fontSize: '13px', padding: '11px 18px', borderRadius: '40px', textDecoration: 'none', border: '1.5px solid rgba(255,255,255,.22)' }}>
              Back home
            </a>
            <a href={CFP_SESSIONIZE} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#FEC400', color: '#0E1667', fontWeight: 800, fontSize: '13px', padding: '11px 18px', borderRadius: '40px', textDecoration: 'none', boxShadow: '0 8px 24px rgba(254,196,0,.24)' }}>
              Submit on Sessionize
            </a>
          </div>
        </header>

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
