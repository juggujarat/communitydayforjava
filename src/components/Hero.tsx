import { h } from '../lib/handlers'
import FollowSocials from './FollowSocials'

const MARQUEE = [
  { src: '/assets/a9f77f1d-2ab1-4ba1-bfe1-83eb58901df7.jpg', alt: 'CDJ 2025 audience' },
  { src: '/assets/df6fc632-a5b7-45b8-a218-9148611860d3.jpg', alt: 'CDJ 2025 speaker' },
  { src: '/assets/91a5000f-6574-4f94-9fce-6e9351cac8a1.jpg', alt: 'CDJ 2025 registration' },
  { src: '/assets/ade1caa9-b56c-47f1-90a3-a112a68dbbc5.jpg', alt: 'CDJ 2025 team' },
  { src: '/assets/e62bea37-d070-4854-823e-39ed8e9b4dbf.jpg', alt: 'CDJ 2025 swag' },
]

const tile: React.CSSProperties = {
  flex: 'none', width: 'clamp(240px,24vw,400px)', height: 'clamp(320px,30vw,440px)',
  borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,.1)',
}
const img: React.CSSProperties = { width: '100%', height: '100%', objectFit: 'cover', display: 'block' }

export default function Hero() {
  return (
    <header id="top" style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', padding: '116px 40px 0', background: 'radial-gradient(120% 90% at 50% 4%, #20307a 0%, #131C56 50%, #0E1667 100%)', overflow: 'hidden' }}>
      <div style={{ position: 'relative', zIndex: '3', flex: '1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', maxWidth: '1280px', margin: '0 auto', width: '100%' }}>
        <h1 data-reveal data-reveal-d="60" style={{ margin: '0 auto', maxWidth: 'none', fontWeight: '600', lineHeight: '1.05', letterSpacing: '-1.5px', color: '#fff', fontSize: 'clamp(28px,4.6vw,56px)', textTransform: 'uppercase' }}>Gujarat's BIGGEST<br /><span style={{ color: '#FEC400' }}>Java</span> Community <span style={{ color: '#FEC400' }}>Conference</span></h1>

        <p data-reveal data-reveal-d="160" style={{ margin: '14px auto 0', maxWidth: '720px', fontSize: 'clamp(15px,1.6vw,19px)', fontWeight: '500', lineHeight: '1.55', color: '#c9d0ef' }}>
          <strong id="hero-stats" style={{ color: '#fff', whiteSpace: 'nowrap' }}>600+ Java Developers • 20+ Expert Speakers • 3 Parallel Tracks</strong><br />Built by the community, for the community.
        </p>

        <div id="hero-ctas" data-reveal data-reveal-d="220" style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '14px', justifyContent: 'center' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: '#FF384B', color: '#fff', fontWeight: '500', textTransform: 'uppercase', fontSize: '15px', letterSpacing: '1px', padding: '13px 28px', borderRadius: '46px', textDecoration: 'none', boxShadow: '0 14px 36px rgba(255,56,75,.36)', cursor: 'default' }} data-cta="1" onMouseEnter={h.btnOn} onMouseLeave={h.btnOff}>Tickets Coming Soon</span>
          <a href="#sponsor" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'transparent', color: '#fff', fontWeight: '700', fontSize: '15px', padding: '13px 28px', borderRadius: '46px', textDecoration: 'none', border: '1.5px solid rgba(255,255,255,.32)' }} onMouseEnter={h.ghostOn} onMouseLeave={h.ghostOff}>Become a sponsor →</a>
        </div>

        <div id="hero-follow" data-reveal data-reveal-d="250" style={{ marginTop: '16px' }}>
          <FollowSocials caption="Registration opens soon — follow us for ticket updates." />
        </div>

        <div data-reveal data-reveal-d="260" style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <img src="/assets/48ee4d89-31eb-41e2-925d-db02be348059.svg" alt="Java User Group Gujarat" style={{ height: '56px', width: 'auto', display: 'block' }} />
          <span style={{ fontSize: '13px', lineHeight: '1.4', color: '#9aa3d6', textAlign: 'left' }}>Organized by<br /><strong style={{ color: '#fff', fontWeight: '700' }}> <a href="https://www.gujaratjug.org" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none' }}>Java User Group Gujarat</a></strong></span>
        </div>
      </div>

      <div data-reveal data-reveal-d="120" style={{ position: 'relative', zIndex: '3', width: '100vw', margin: '46px 0 0', marginLeft: 'calc(50% - 50vw)', overflow: 'hidden' }}>
        <div style={{ display: 'flex', gap: '14px', width: 'max-content', alignItems: 'flex-end', animation: 'cdj-marquee 38s linear infinite', willChange: 'transform' }} onMouseEnter={h.mqPause} onMouseLeave={h.mqPlay}>
          {MARQUEE.map((m, i) => (
            <div key={'a' + i} style={tile}><img src={m.src} alt={m.alt} style={img} /></div>
          ))}
          {MARQUEE.map((m, i) => (
            <div key={'b' + i} style={tile} aria-hidden="true"><img src={m.src} alt="" style={img} /></div>
          ))}
        </div>
      </div>

      <div style={{ position: 'relative', zIndex: '2', height: '110px' }} />
    </header>
  )
}
