import { h } from '../lib/handlers'
import { Icon } from '../lib/icons'
import { SOCIALS } from '../lib/socials'

/** Speakers section (#speakers) — "revealed soon" message + CFP CTA. */
export default function Speakers() {
  return (
    <section id="speakers" style={{ position: 'relative', padding: '78px 40px', background: 'radial-gradient(120% 100% at 80% 0%,#1a2670,#0E1667 70%)', overflow: 'hidden' }}>
      <div style={{ position: 'relative', zIndex: 3, maxWidth: '1140px', margin: '0 auto' }}>
        <div data-reveal style={{ textAlign: 'center', marginBottom: '54px' }}>
          <h2 style={{ margin: 0, fontWeight: 500, fontSize: 'clamp(32px,5vw,64px)', lineHeight: 1, letterSpacing: '-1.5px' }}>Speakers revealed <span style={{ fontFamily: "'Roboto',sans-serif", fontWeight: 600, color: '#FEC400' }}>soon</span></h2>
          <p style={{ margin: '18px auto 0', maxWidth: '760px', fontSize: '18px', fontWeight: 500, color: '#a8b0e0' }}>20+ industry speakers exploring Java in the age of AI. The 2026 lineup drops with early-bird registration.</p>
        </div>
        <div data-reveal data-reveal-d="120" style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '22px' }}>
          <a style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: '#FF384B', color: '#fff', fontWeight: 700, fontSize: '17px', padding: '16px 40px', borderRadius: '46px', textDecoration: 'none', boxShadow: '0 14px 36px rgba(255,56,75,.36)' }} data-cta="1" onMouseEnter={h.btnOn} onMouseLeave={h.btnOff}>Call for Papers- Opening Soon!</a>
          <div style={{ display: 'flex', gap: '14px' }}>
            {SOCIALS.map((s, i) => (
              <a key={i} href={s.href} target="_blank" rel="noopener" aria-label={s.label} style={{ width: '44px', height: '44px', borderRadius: '50%', border: '1.5px solid rgba(255,255,255,.5)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#fff', textDecoration: 'none', transition: 'background .25s ease, border-color .25s ease' }} onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,.12)'; e.currentTarget.style.borderColor = '#fff' }} onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,255,255,.5)' }}>
                <Icon type={s.type} />
              </a>
            ))}
          </div>
          <div style={{ fontSize: '16px', color: '#a8b0e0', fontWeight: 500 }}>Follow our social handles for CFP updates.</div>
        </div>
      </div>
    </section>
  )
}
