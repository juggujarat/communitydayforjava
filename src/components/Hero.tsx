import { h } from '../lib/handlers'
import FollowSocials from './FollowSocials'
import { TICKETS_COMING_SOON, TICKETS_UPDATE_CAPTION } from '../lib/links'

const MARQUEE = [
  { src: '/assets/hero-marquee-venkat.webp', alt: 'CDJ 2025 speaker Venkat' },
  { src: '/assets/hero-marquee-vaibhav.webp', alt: 'CDJ 2025 speaker Vaibhav' },
  { src: '/assets/hero-marquee-auditorium.webp', alt: 'CDJ 2025 auditorium' },
  { src: '/assets/hero-marquee-banner.webp', alt: 'CDJ 2025 banner' },
  { src: '/assets/hero-marquee-badges.webp', alt: 'CDJ 2025 attendee badges' },
  { src: '/assets/hero-marquee-checkin.webp', alt: 'CDJ 2025 check-in desk' },
  { src: '/assets/hero-marquee-banner2.webp', alt: 'CDJ 2025 banner' },
]

const tile: React.CSSProperties = {
  flex: 'none', width: 'clamp(240px,24vw,400px)', height: 'clamp(320px,30vw,440px)',
  borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,.1)',
}
const img: React.CSSProperties = { width: '100%', height: '100%', objectFit: 'cover', display: 'block' }

export default function Hero() {
  return (
    <header id="top" style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', padding: '116px 40px 0', background: 'radial-gradient(120% 90% at 50% 4%, #20307a 0%, #131C56 50%, #0E1667 100%)', overflow: 'hidden' }}>
      <img id="hero-java-mark" src="/assets/java-sticker.png" alt="" aria-hidden="true" style={{ position: 'absolute', zIndex: '1', top: '32%', left: '26%', transform: 'translate(-50%,-50%)', width: 'clamp(160px,32vw,460px)', height: 'auto', opacity: 0.08, pointerEvents: 'none', userSelect: 'none' }} />
      <div style={{ position: 'relative', zIndex: '3', flex: '1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', maxWidth: '1280px', margin: '0 auto', width: '100%' }}>
        <h1 data-reveal data-reveal-d="60" style={{ margin: '0 auto', maxWidth: 'none', fontWeight: '600', lineHeight: '1.05', letterSpacing: '-1.5px', color: '#fff', fontSize: 'clamp(28px,4.6vw,56px)', textTransform: 'uppercase' }}>Gujarat's BIGGEST<br /><span style={{ color: '#FEC400' }}>Java</span> Community <span style={{ color: '#FEC400' }}>Conference</span></h1>

        <p data-reveal data-reveal-d="160" style={{ margin: '14px auto 0', maxWidth: '720px', fontSize: 'clamp(15px,1.6vw,19px)', fontWeight: '500', lineHeight: '1.55', color: '#c9d0ef' }}>
          <strong id="hero-stats" style={{ color: '#fff', whiteSpace: 'nowrap' }}>600+ Java Developers • 20+ Expert Speakers • 3 Parallel Tracks</strong><br />Built by the community, for the community.
        </p>

        <div data-reveal data-reveal-d="190" style={{ marginTop: '18px', display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 18px', borderRadius: '30px', background: 'rgba(254,196,0,.12)', border: '1px solid rgba(254,196,0,.3)' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#FEC400', display: 'inline-block', animation: 'cdj-pulse 2s ease-in-out infinite' }} />
          <span style={{ fontSize: '13px', fontWeight: 600, color: '#FEC400', letterSpacing: '.2px' }}>Venue & Date to be announced soon</span>
        </div>

        <div id="hero-ctas" data-reveal data-reveal-d="220" style={{ marginTop: '36px', display: 'flex', flexWrap: 'wrap', gap: '14px', justifyContent: 'center' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: '#FF384B', color: '#fff', fontWeight: '500', textTransform: 'uppercase', fontSize: '15px', letterSpacing: '1px', padding: '16px 30px', borderRadius: '46px', cursor: 'default', boxShadow: '0 14px 36px rgba(255,56,75,.36)' }} data-cta="1">{TICKETS_COMING_SOON}</span>
          <a href="#sponsor" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'transparent', color: '#fff', fontWeight: '700', fontSize: '15px', padding: '16px 30px', borderRadius: '46px', textDecoration: 'none', border: '1.5px solid rgba(255,255,255,.32)' }} onMouseEnter={h.ghostOn} onMouseLeave={h.ghostOff}>Become a sponsor →</a>
        </div>

        <div id="hero-follow" data-reveal data-reveal-d="250" style={{ marginTop: '26px' }}>
          <FollowSocials caption={TICKETS_UPDATE_CAPTION} />
        </div>

        <div data-reveal data-reveal-d="260" style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <img id="hero-jug-logo" src="/assets/48ee4d89-31eb-41e2-925d-db02be348059.svg" alt="Java User Group Gujarat" style={{ height: '56px', width: 'auto', display: 'block' }} />
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
