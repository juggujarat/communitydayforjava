import { A } from '../lib/assets'
import { CFPShapes } from '../lib/decor'
import { TICKET_PLANS } from '../lib/tickets'
import TicketsCta from './TicketsCta'

const TICKET_CTA_LABEL = 'Book Your Ticket →'

const FACTS = [
  { label: '📅 Date', value: '24 Oct 2026' },
  { label: '📍 Venue', value: 'Centre For Professional Courses Department, Gujarat University, Ahmedabad' },
  { label: '⏰ Time', value: 'Coming Soon' },
]

/** A handful of the homepage gallery's 2025 photos, reused here as the highlights strip. */
const HIGHLIGHTS = [
  { img: '/assets/gallery-speaker-podium.jpg', alt: 'Community Day for Java 2025 speaker at the podium' },
  { img: A['cfc2a2ad-73c9-480e-aedf-76b94d67894f'], alt: 'Community Day for Java 2025 moment' },
  { img: A['a9f77f1d-2ab1-4ba1-bfe1-83eb58901df7'], alt: 'Community Day for Java 2025 registration and swag' },
  { img: A['df6fc632-a5b7-45b8-a218-9148611860d3'], alt: 'Community Day for Java 2025 audience' },
  { img: '/assets/gallery-team-backdrop.jpg', alt: 'Community Day for Java 2025 team at the step-and-repeat backdrop' },
  { img: '/assets/gallery-stage-banner.jpg', alt: 'Community Day for Java 2025 stage' },
  { img: '/assets/gallery-audience-standing.jpg', alt: 'Community Day for Java 2025 audience' },
  { img: '/assets/gallery-group-stage.jpg', alt: 'Community Day for Java 2025 group photo on stage' },
]

const eyebrowStyle = {
  fontSize: '13px',
  fontWeight: 800,
  letterSpacing: '1px',
  textTransform: 'uppercase',
  color: '#0D5CDB',
  marginBottom: '16px',
} as const

const cardStyle = {
  background: '#fff',
  borderRadius: '28px',
  padding: '30px',
  border: '1px solid rgba(14,22,103,.08)',
  boxShadow: '0 18px 42px rgba(14,22,103,.08)',
} as const

/**
 * Standalone ticket-selling landing page (/tickets). Its own hero + supporting sections
 * live here; the actual purchase flow is the shared `TicketsCta` popup (KonfHub widget) —
 * every "book your ticket" CTA on this page opens that same modal, nothing here links out.
 */
export default function Tickets() {
  return (
    <>
      <section id="tickets-hero" style={{ position: 'relative', padding: '84px 40px 76px', background: 'linear-gradient(150deg,#1a2670,#0E1667)', color: '#fff', overflow: 'hidden' }}>
        <CFPShapes />
        <div style={{ position: 'relative', zIndex: 3, maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <h1 data-reveal style={{ margin: 0, fontWeight: 500, fontSize: 'clamp(30px,4.6vw,58px)', lineHeight: 1.05, letterSpacing: '-1.7px' }}>
            Book Your <span style={{ fontFamily: "'Roboto',sans-serif", fontWeight: 700, color: '#FEC400' }}>Tickets</span> Now
          </h1>
          <p data-reveal data-reveal-d="60" style={{ margin: '18px auto 0', maxWidth: '640px', fontSize: '17px', lineHeight: 1.65, fontWeight: 500, color: '#c9d0ef' }}>
            Join developers, architects, and Java enthusiasts for a full day of Java, AI, and real-world engineering.
          </p>

          <div id="tickets-facts" data-reveal data-reveal-d="100" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', margin: '36px 0 0' }}>
            {FACTS.map((f) => (
              <div key={f.label} style={{ background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.12)', borderRadius: '20px', padding: '18px 16px' }}>
                <div style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '.6px', textTransform: 'uppercase', color: '#FEC400', marginBottom: '8px' }}>{f.label}</div>
                <div style={{ fontSize: '17px', fontWeight: 800, color: '#fff' }}>{f.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="tickets-plans" style={{ position: 'relative', background: '#fff', color: '#0E1667', padding: '76px 40px' }}>
        <div data-reveal style={{ maxWidth: '1140px', margin: '0 auto 36px', textAlign: 'center' }}>
          <div style={eyebrowStyle}>Choose Your Pass</div>
          <h2 style={{ margin: 0, fontWeight: 500, fontSize: 'clamp(26px,3.6vw,40px)', letterSpacing: '-1px' }}>Ticket Details</h2>
        </div>
        <div id="tickets-plans-grid" style={{ maxWidth: '1140px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '24px', alignItems: 'start' }}>
          {TICKET_PLANS.map((plan, i) => (
            <div key={plan.label} data-reveal data-reveal-d={String(i * 60)} style={{ ...cardStyle, borderTop: `4px solid ${plan.accent}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '12px', marginBottom: plan.tagline ? '10px' : '18px' }}>
                <h3 style={{ margin: 0, fontSize: '22px', fontWeight: 800, color: '#0E1667' }}>{plan.label}</h3>
                <div style={{ fontSize: '24px', fontWeight: 800, color: plan.accent, whiteSpace: 'nowrap' }}>{plan.price}</div>
              </div>
              {plan.tagline && (
                <div style={{ fontSize: '13px', fontWeight: 800, letterSpacing: '.3px', color: plan.accent, marginBottom: '18px' }}>{plan.tagline}</div>
              )}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                {plan.intro.map((p) => <p key={p} style={{ margin: 0, fontSize: '14px', lineHeight: 1.65, color: '#42498a' }}>{p}</p>)}
              </div>
              <div style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '.6px', textTransform: 'uppercase', color: '#0D5CDB', marginBottom: '12px' }}>What's Included</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '9px', marginBottom: '20px' }}>
                {plan.included.map((item) => <div key={item} style={{ fontSize: '14px', lineHeight: 1.5, color: '#42498a' }}>{item}</div>)}
              </div>
              <p style={{ margin: '0 0 18px', fontSize: '13.5px', lineHeight: 1.6, color: '#5a6299' }}>
                <strong style={{ color: '#0E1667' }}>Perfect for:</strong> {plan.perfectFor}
              </p>
              <div style={{ paddingTop: '16px', borderTop: '1px solid rgba(14,22,103,.1)', fontSize: '12.5px', fontWeight: 700, color: '#5a6299' }}>
                Available till {plan.availableTill}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="tickets-highlights" style={{ position: 'relative', background: '#F4F1E8', color: '#0E1667', padding: '76px 40px 84px' }}>
        <div data-reveal style={{ maxWidth: '1140px', margin: '0 auto 32px', textAlign: 'center' }}>
          <div style={eyebrowStyle}>Explore the Experience</div>
          <h2 style={{ margin: '0 0 12px', fontWeight: 500, fontSize: 'clamp(26px,3.6vw,40px)', letterSpacing: '-1px' }}>Event Highlights</h2>
          <p style={{ margin: '0 auto', maxWidth: '620px', fontSize: '15px', lineHeight: 1.65, color: '#5a6299' }}>
            Get a glimpse of the people, moments, and energy that make our community special.
          </p>
        </div>
        <div id="gallery" style={{ maxWidth: '1140px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gridAutoRows: '190px', gap: '14px' }}>
          {HIGHLIGHTS.map((s, i) => (
            <div
              key={i}
              data-reveal
              data-reveal-d={String(Math.min(i, 6) * 60)}
              style={{ position: 'relative', overflow: 'hidden', borderRadius: '16px', background: '#fff', border: '1px solid rgba(14,22,103,.08)', boxShadow: '0 12px 30px rgba(14,22,103,.1)', cursor: 'zoom-in' }}
            >
              <img src={s.img} alt={s.alt} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
          ))}
        </div>
      </section>

      {/* Full-width sticky ticket bar for this page — always visible, unlike the (currently
          hidden) header sticky CTA, so a visitor scrolling this page never loses the CTA. */}
      <div style={{ position: 'fixed', left: 0, right: 0, bottom: 0, zIndex: 300, padding: '12px 16px', background: 'rgba(13,19,70,.95)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', borderTop: '1px solid rgba(255,255,255,.12)' }}>
        <TicketsCta
          label={TICKET_CTA_LABEL}
          style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center', gap: '8px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '14px', padding: '15px', borderRadius: '46px' }}
        />
      </div>
    </>
  )
}
