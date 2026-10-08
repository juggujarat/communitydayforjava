import { h } from '../lib/handlers'

/** Impact cards — icon markup is ported verbatim from the original bundle. */
const IMPACT = [
  {
    d: 0, bg: 'rgba(255,56,75,.14)', color: '#FF6573', title: 'Java for AI era',
    desc: 'Sessions on building intelligent, AI-powered apps and tooling with modern Java.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2 L13.6 8.4 L20 10 L13.6 11.6 L12 18 L10.4 11.6 L4 10 L10.4 8.4 Z" />
        <path d="M18.5 13.5 L19.3 16.6 L22 17.4 L19.3 18.2 L18.5 21.3 L17.7 18.2 L15 17.4 L17.7 16.6 Z" />
      </svg>
    ),
  },
  {
    d: 70, bg: 'rgba(13,92,219,.16)', color: '#63A5FF', title: 'Hands-on Workshops',
    desc: 'Parallel technical labs designed for deep, practical learning.',
    icon: (
      <svg width="28" height="24" viewBox="0 0 30 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 5 L3 12 L9 19" /><path d="M21 5 L27 12 L21 19" /><path d="M17 3 L13 21" />
      </svg>
    ),
  },
  {
    d: 0, bg: 'rgba(2,207,112,.14)', color: '#02CF70', title: 'Community Fuel',
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
    d: 70, bg: 'rgba(254,196,0,.14)', color: '#FEC400', title: 'Cool Swag',
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
    d: 0, bg: 'rgba(125,0,188,.16)', color: '#C77BFA', title: 'Unlimited Networking',
    desc: 'Build real connections with Java developers, architects, CXOs, speakers and students.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="6" cy="6" r="2.4" /><circle cx="18" cy="6" r="2.4" /><circle cx="12" cy="18" r="2.4" />
        <path d="M7.9 7.3 L10.4 16.2" /><path d="M16.1 7.3 L13.6 16.2" /><path d="M8.4 6 H15.6" />
      </svg>
    ),
  },
]

const MARQUEE_TXT =
  'Community Day for Java 2026  •  Ahmedabad  •  24 Oct 2026  •  '
const marqueeSpan: React.CSSProperties = {
  fontFamily: "'Space Grotesk',sans-serif", fontSize: 'clamp(20px,2.4vw,30px)', fontWeight: 400,
  letterSpacing: '1px', color: '#0E1667', textTransform: 'uppercase', paddingRight: '36px',
}

/** Rotating marquee + Why-attend impact grid (#why). */
export default function WhyImpact() {
  return (
    <section id="why" style={{ position: 'relative', padding: '24px 40px 78px', background: '#0E1667', overflow: 'hidden' }}>
      <div style={{ position: 'relative', zIndex: 5, margin: '64px 0 24px' }}>
        <div style={{ transform: 'rotate(-3deg)', background: '#FEC400', padding: '15px 0', width: '120%', marginLeft: '-10%', overflow: 'hidden' }}>
          <div style={{ display: 'inline-flex', whiteSpace: 'nowrap', animation: 'cdj-marquee 28s linear infinite', willChange: 'transform' }}>
            {/* 12 copies (6 per half) so each half exceeds the viewport width — prevents the blank gap as the -50% loop wraps */}
            {Array.from({ length: 12 }).map((_, i) => (
              <span key={i} style={marqueeSpan}>{MARQUEE_TXT}</span>
            ))}
          </div>
        </div>
      </div>

      <div style={{ position: 'relative', zIndex: 3, maxWidth: '1140px', margin: '56px auto 0' }}>
        <div data-reveal style={{ textAlign: 'center', maxWidth: '1000px', margin: '0 auto 56px' }}>
          <h2 style={{ margin: 0, fontWeight: 500, fontSize: 'clamp(30px,4.4vw,52px)', lineHeight: 1.02, letterSpacing: '-1.5px' }}>An action-packed day of learning, networking &amp; <span style={{ color: '#02CF70' }}>code.</span></h2>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px' }}>
          {IMPACT.map((c, i) => (
            <div key={i} data-reveal data-reveal-d={String(c.d)} style={{ flex: '1 1 340px', maxWidth: '360px', minWidth: '280px', display: 'flex', gap: '20px', alignItems: 'flex-start', padding: '28px 30px', borderRadius: '20px', background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.08)' }} onMouseEnter={h.cardOn} onMouseLeave={h.cardOff}>
              <div style={{ flex: 'none', width: '56px', height: '56px', borderRadius: '16px', background: c.bg, display: 'grid', placeItems: 'center', color: c.color }}>{c.icon}</div>
              <div>
                <h3 style={{ margin: '0 0 6px', fontSize: '19px', fontWeight: 500 }}>{c.title}</h3>
                <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.55, color: '#a8b0e0' }}>{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
