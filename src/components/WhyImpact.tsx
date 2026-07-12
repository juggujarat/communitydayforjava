import { h } from '../lib/handlers'
import { A } from '../lib/assets'

/** Impact cards — icon markup is ported verbatim from the original bundle. */
const IMPACT = [
  {
    d: 0, bg: '#FF384B', color: '#fff', title: 'Java meets AI',
    desc: 'Sessions on building intelligent, AI-powered apps and tooling with modern Java.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2 L13.6 8.4 L20 10 L13.6 11.6 L12 18 L10.4 11.6 L4 10 L10.4 8.4 Z" />
        <path d="M18.5 13.5 L19.3 16.6 L22 17.4 L19.3 18.2 L18.5 21.3 L17.7 18.2 L15 17.4 L17.7 16.6 Z" />
      </svg>
    ),
  },
  {
    d: 70, bg: '#0D5CDB', color: '#fff', title: 'Hands-on Workshops',
    desc: 'Parallel technical labs designed for deep, practical learning.',
    icon: (
      <svg width="28" height="24" viewBox="0 0 30 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 5 L3 12 L9 19" /><path d="M21 5 L27 12 L21 19" /><path d="M17 3 L13 21" />
      </svg>
    ),
  },
  {
    d: 0, bg: '#02CF70', color: '#063d24', title: 'Community Fuel',
    desc: 'Full catering — breakfast and lunch included for every attendee.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 9 H16 V14 A4 4 0 0 1 12 18 H9 A4 4 0 0 1 5 14 Z" />
        <path d="M16 10 H18.5 A2 2 0 0 1 18.5 14 H16" />
        <path d="M8 3.5 V5.5 M12 3.5 V5.5" />
      </svg>
    ),
  },
  {
    d: 70, bg: '#FEC400', color: '#0E1667', title: 'Cool Swag',
    desc: 'Limited-edition merchandise and collectibles for the community.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="9" width="16" height="11" rx="1" />
        <path d="M3 9 H21" /><path d="M12 9 V20" />
        <path d="M12 9 C10.5 9 8.5 8.5 8.5 6.7 C8.5 5.2 10.8 5.6 12 9 C13.2 5.6 15.5 5.2 15.5 6.7 C15.5 8.5 13.5 9 12 9 Z" />
      </svg>
    ),
  },
  {
    d: 0, bg: '#7D00BC', color: '#fff', title: 'Global Reach',
    desc: 'Local community plugged into the worldwide JUG ecosystem.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
        <circle cx="12" cy="12" r="9" /><path d="M3 12 H21" />
        <path d="M12 3 C15.5 7 15.5 17 12 21 C8.5 17 8.5 7 12 3 Z" />
      </svg>
    ),
  },
  {
    d: 70, bg: '#FF384B', color: '#fff', title: 'Lasting Memories',
    desc: 'Bridging academia and industry, one session at a time.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24">
        <path d="M12 1 C13 8 16 11 23 12 C16 13 13 16 12 23 C11 16 8 13 1 12 C8 11 11 8 12 1 Z" fill="currentColor" />
      </svg>
    ),
  },
]

const STATS = [
  { rot: -5, bg: '#FF384B', img: A['02d899ea-fe63-40f8-a846-6f4036aea702'], alt: 'CDJ 2025 audience', num: '600+', numColor: '#fff', label: 'ATTENDEES', labelColor: 'rgba(255,255,255,.92)', d: 0, border: undefined as string | undefined },
  { rot: 3, bg: '#FEC400', img: A['73ed873c-b127-4493-af6a-8c909c3d9a59'], alt: 'CDJ 2025 speaker', num: '12+', numColor: '#0E1667', label: 'SPEAKERS', labelColor: 'rgba(14,22,103,.85)', d: 90, border: undefined },
  { rot: -2, bg: '#7D00BC', img: A['cf0e32f2-6d8f-410d-9781-bbdb674a8308'], alt: 'CDJ 2025 audience', num: '11', numColor: '#fff', label: 'TOTAL SESSIONS', labelColor: 'rgba(255,255,255,.7)', d: 180, border: '1px solid rgba(255,255,255,.08)' },
  { rot: 5, bg: '#02CF70', img: A['ce7ffe15-ed83-408b-9f70-3a5607b3e20d'], alt: 'CDJ 2025 team', num: '1', numColor: '#063d24', label: 'UNFORGETTABLE DAY', labelColor: 'rgba(6,61,36,.82)', d: 270, border: undefined },
]

const MARQUEE_TXT =
  'Community Day for Java  •  24 Oct 2026  •  Ahmedabad  •  '
const marqueeSpan: React.CSSProperties = {
  fontFamily: "'Space Grotesk',sans-serif", fontSize: 'clamp(20px,2.4vw,30px)', fontWeight: 400,
  letterSpacing: '1px', color: '#0E1667', textTransform: 'uppercase', paddingRight: '36px',
}

/** Why-attend impact grid + rotating marquee + By-the-numbers stat cards (#why). */
export default function WhyImpact() {
  return (
    <section id="why" style={{ position: 'relative', padding: '130px 40px', background: '#0E1667', overflow: 'hidden' }}>
      <div style={{ position: 'relative', zIndex: 3, maxWidth: '1140px', margin: '0 auto' }}>
        <div data-reveal style={{ textAlign: 'center', maxWidth: '660px', margin: '0 auto 56px' }}>
          <h2 style={{ margin: 0, fontWeight: 500, fontSize: 'clamp(30px,4.6vw,58px)', lineHeight: 1.02, letterSpacing: '-1.5px' }}>An action-packed day of learning, networking &amp; <span style={{ color: '#02CF70' }}>code.</span></h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(380px,1fr))', gap: '16px' }}>
          {IMPACT.map((c, i) => (
            <div key={i} data-reveal data-reveal-d={String(c.d)} style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', padding: '28px 30px', borderRadius: '20px', background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.08)' }} onMouseEnter={h.cardOn} onMouseLeave={h.cardOff}>
              <div style={{ flex: 'none', width: '48px', height: '48px', borderRadius: '14px', background: c.bg, display: 'grid', placeItems: 'center', color: c.color }}>{c.icon}</div>
              <div>
                <h3 style={{ margin: '0 0 6px', fontSize: '19px', fontWeight: 500 }}>{c.title}</h3>
                <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.55, color: '#a8b0e0' }}>{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ position: 'relative', zIndex: 5, margin: '64px 0 24px' }}>
        <div style={{ transform: 'rotate(-3deg)', background: '#FEC400', padding: '15px 0', width: '120%', marginLeft: '-10%', overflow: 'hidden' }}>
          <div style={{ display: 'inline-flex', whiteSpace: 'nowrap', animation: 'cdj-marquee 28s linear infinite', willChange: 'transform' }}>
            <span style={marqueeSpan}>{MARQUEE_TXT}</span>
            <span style={marqueeSpan}>{MARQUEE_TXT}</span>
          </div>
        </div>
      </div>

      <div id="numbers" data-reveal style={{ textAlign: 'center', margin: '130px 0 46px' }}>
        <h2 style={{ margin: 0, fontWeight: 600, fontSize: 'clamp(30px,4.4vw,52px)', lineHeight: 1, letterSpacing: '-1.5px', color: '#fff' }}>By the <span style={{ color: '#FEC400' }}>numbers</span></h2>
      </div>
      <div id="numbers-grid" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
        {STATS.map((s, i) => (
          <div key={i} data-reveal data-reveal-d={String(s.d)} style={{ padding: '6px', marginLeft: i === 0 ? undefined : '-20px' }}>
            <div data-rot={String(s.rot)} onMouseEnter={h.statOn} onMouseLeave={h.statOff} style={{ flex: 'none', width: '312px', background: s.bg, border: s.border, borderRadius: '7px', padding: '14px', boxShadow: '0 26px 52px rgba(0,0,0,.55)', transform: `rotate(${s.rot}deg)`, transition: 'transform .35s cubic-bezier(.2,.7,.2,1)' }}>
              <div style={{ borderRadius: '3px', overflow: 'hidden', height: '300px', marginBottom: '18px' }}>
                <img src={s.img} alt={s.alt} style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'grayscale(1) contrast(1.05)', display: 'block' }} />
              </div>
              <div style={{ fontWeight: 800, fontSize: 'clamp(50px,4.6vw,70px)', lineHeight: 0.88, color: s.numColor }}>{s.num}</div>
              <div style={{ marginTop: '11px', fontWeight: 700, fontSize: '14.5px', letterSpacing: '1.5px', color: s.labelColor }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
