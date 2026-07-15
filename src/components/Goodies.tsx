/** Goodies & swag grid (#goodies). Icon markup ported verbatim from the bundle. */
const stroke = { fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }

const GOODIES = [
  {
    bg: '#FF384B', color: '#fff', title: 'Delicious Food & Breakfast', sub: 'Breakfast & catered lunch, all day',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" {...stroke}>
        <path d="M7 2 V22" /><path d="M5 2 V7 A2 2 0 0 0 9 7 V2" />
        <path d="M17 2 C15.5 2 15 5 15 9 C15 10.1 15.9 10.5 17 10.5 V22" />
      </svg>
    ),
  },
  {
    bg: '#FEC400', color: '#0E1667', title: 'Exclusive Swags & Goodies', sub: 'Limited-edition merch & collectibles',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" {...stroke}>
        <path d="M6 8 H18 L19 21 H5 Z" /><path d="M9 8 V6 A3 3 0 0 1 15 6 V8" />
      </svg>
    ),
  },
  {
    bg: '#0D5CDB', color: '#fff', title: 'Lanyard & badge', sub: 'Your pass to the day',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" {...stroke}>
        <rect x="4" y="7" width="16" height="13" rx="2" /><path d="M9 3 H15 V7 H9 Z" />
        <circle cx="12" cy="12.5" r="2" /><path d="M9 17.5 H15" />
      </svg>
    ),
  },
  {
    bg: '#02CF70', color: '#063d24', title: 'Collectibles', sub: 'Surprise community goodies',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" {...stroke}>
        <rect x="4" y="9" width="16" height="11" rx="1" /><path d="M3 9 H21" /><path d="M12 9 V20" />
        <path d="M12 9 C10.5 9 8.5 8.5 8.5 6.7 C8.5 5.2 10.8 5.6 12 9 C13.2 5.6 15.5 5.2 15.5 6.7 C15.5 8.5 13.5 9 12 9 Z" />
      </svg>
    ),
  },
  {
    bg: '#7D00BC', color: '#fff', title: 'Technical Talks', sub: 'Deep sessions across three tracks',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" {...stroke}>
        <rect x="9" y="2" width="6" height="12" rx="3" /><path d="M5 11 A7 7 0 0 0 19 11" />
        <path d="M12 18 V22 M8 22 H16" />
      </svg>
    ),
  },
]

export default function Goodies() {
  return (
    <section id="goodies" style={{ position: 'relative', padding: '78px 40px 44px', background: '#F4F1E8', color: '#0E1667', overflow: 'hidden' }}>
      <span style={{ position: 'absolute', top: '9%', right: '7%', width: '50px', height: '50px', background: '#FF384B', clipPath: 'polygon(50% 0,100% 50%,50% 100%,0 50%)', animation: 'cdj-float1 9s ease-in-out infinite', opacity: 0.9 }} />
      <span style={{ position: 'absolute', bottom: '13%', left: '6%', width: '34px', height: '34px', borderRadius: '50%', background: '#0D5CDB', animation: 'cdj-float2 8s ease-in-out infinite', opacity: 0.85 }} />
      <div style={{ position: 'relative', zIndex: 3, maxWidth: '1320px', margin: '0 auto' }}>
        <div data-reveal style={{ textAlign: 'center', marginBottom: '52px' }}>
          <h2 style={{ margin: 0, fontWeight: 500, fontSize: 'clamp(32px,5vw,62px)', lineHeight: 1, letterSpacing: '-1.5px' }}>Goodies &amp; <span style={{ fontFamily: "'Roboto',sans-serif", fontWeight: 600, color: '#7D00BC' }}>swag</span></h2>
          <p style={{ margin: '16px auto 0', maxWidth: '520px', fontSize: '18px', fontWeight: 500, color: '#42498a' }}>Every attendee walks away with limited-edition merch, collectibles and a full day of community fuel.</p>
        </div>
        <div id="goodies-grid" data-reveal data-reveal-d="60" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, minmax(0px, 1fr))', gap: '16px' }}>
          {GOODIES.map((g, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: '20px', padding: '30px 28px', boxShadow: '0 12px 30px rgba(14,22,103,.08)', display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div style={{ width: '58px', height: '58px', borderRadius: '16px', background: g.bg, display: 'grid', placeItems: 'center', color: g.color }}>{g.icon}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '19px', lineHeight: 1.25, minHeight: '2.4em', display: 'flex', alignItems: 'center' }}>{g.title}</div>
                <div style={{ fontSize: '16px', color: '#42498a', marginTop: '4px' }}>{g.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
