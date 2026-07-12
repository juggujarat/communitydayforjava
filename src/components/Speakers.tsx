import { h } from '../lib/handlers'
import { SpeakerCards } from '../lib/decor'

/** Speakers section (#speakers) — three track columns of placeholder cards + CFP CTA. */
export default function Speakers() {
  return (
    <section id="speakers" style={{ position: 'relative', padding: '130px 40px', background: 'radial-gradient(120% 100% at 80% 0%,#1a2670,#0E1667 70%)', overflow: 'hidden' }}>
      <div style={{ position: 'relative', zIndex: 3, maxWidth: '1140px', margin: '0 auto' }}>
        <div data-reveal style={{ textAlign: 'center', marginBottom: '54px' }}>
          <h2 style={{ margin: 0, fontWeight: 500, fontSize: 'clamp(32px,5vw,64px)', lineHeight: 1, letterSpacing: '-1.5px' }}>Speakers revealed <span style={{ fontFamily: "'Roboto',sans-serif", fontWeight: 600, color: '#FEC400' }}>soon</span></h2>
          <p style={{ margin: '18px auto 0', maxWidth: '760px', fontSize: '18px', fontWeight: 500, color: '#a8b0e0' }}>12+ industry speakers: architects, JVM engineers and AI/ML practitioners exploring Java in the age of AI. The 2026 lineup drops with early-bird registration.</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '46px' }}>
          <SpeakerCards />
        </div>
        <div data-reveal data-reveal-d="120" style={{ marginTop: '48px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '18px' }}>
          <div style={{ fontSize: '16px', color: '#c9d0ef', fontWeight: 600 }}>Want to take the stage?</div>
          <a style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: '#FF384B', color: '#fff', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', fontSize: '15px', padding: '16px 30px', borderRadius: '46px', textDecoration: 'none', boxShadow: '0 14px 36px rgba(255,56,75,.36)' }} data-cta="1" onMouseEnter={h.btnOn} onMouseLeave={h.btnOff}>Coming Soon</a>
        </div>
      </div>
    </section>
  )
}
