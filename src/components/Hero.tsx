import { useState } from 'react'
import TicketsCta from './TicketsCta'
import { HeroVideoBackdrop, HighlightsModal } from './HeroVideo'

export default function Hero() {
  const [watching, setWatching] = useState(false)
  return (
    <header id="top" style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', padding: '116px 40px 72px', background: 'radial-gradient(120% 90% at 50% 4%, #20307a 0%, #131C56 50%, #0E1667 100%)', overflow: 'hidden' }}>
      <HeroVideoBackdrop />
      {watching && <HighlightsModal onClose={() => setWatching(false)} />}
      <div style={{ position: 'relative', zIndex: '3', flex: '1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', maxWidth: '1280px', margin: '0 auto', width: '100%' }}>
        <h1 data-reveal data-reveal-d="60" style={{ margin: '0 auto', maxWidth: 'none', fontWeight: '600', lineHeight: '1.05', letterSpacing: '-1.5px', color: '#fff', fontSize: 'clamp(28px,4.6vw,56px)', textTransform: 'uppercase' }}>Gujarat's BIGGEST<br /><span style={{ color: '#FEC400' }}>Java</span> Community <span style={{ color: '#FEC400' }}>Conference</span></h1>

        <div data-reveal data-reveal-d="220" style={{ marginTop: '36px', display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'center', justifyContent: 'center' }}>
        <button id="hero-watch" type="button" onClick={() => setWatching(true)} style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', padding: '8px 22px 8px 8px', borderRadius: '46px', border: '1px solid rgba(255,255,255,.28)', background: 'rgba(255,255,255,.1)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', color: '#fff', fontFamily: 'inherit', fontSize: '14px', fontWeight: '600', letterSpacing: '.4px', cursor: 'pointer' }} onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,.2)' }} onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,.1)' }}>
          <span style={{ position: 'relative', width: '40px', height: '40px', borderRadius: '50%', background: '#FF384B', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
            <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#FF384B', animation: 'cdj-pulse 1.8s ease-in-out infinite', opacity: 0.5 }} />
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff" aria-hidden="true" style={{ position: 'relative', marginLeft: '2px' }}><path d="M7 4.5v15l13-7.5z" /></svg>
          </span>
          Watch the teaser
        </button>

        <div id="hero-ctas" style={{ display: 'flex' }}>
          <TicketsCta style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', fontWeight: '500', textTransform: 'uppercase', fontSize: '15px', letterSpacing: '1px', padding: '16px 30px', borderRadius: '46px', boxShadow: '0 14px 36px rgba(255,56,75,.36)' }} />
        </div>
        </div>

        <div data-reveal data-reveal-d="260" style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <img id="hero-jug-logo" src="/assets/48ee4d89-31eb-41e2-925d-db02be348059.svg" alt="Java User Group Gujarat" style={{ height: '56px', width: 'auto', display: 'block' }} />
          <span style={{ fontSize: '13px', lineHeight: '1.4', color: '#9aa3d6', textAlign: 'left' }}>Organized by<br /><strong style={{ color: '#fff', fontWeight: '700' }}> <a href="https://www.gujaratjug.org" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none' }}>Java User Group Gujarat</a></strong></span>
        </div>
      </div>

    </header>
  )
}
