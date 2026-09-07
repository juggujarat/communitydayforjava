import { useState } from 'react'
import { A } from '../lib/assets'
import { CFPShapes } from '../lib/decor'
import TicketsCta from './TicketsCta'

const TICKET_CTA_LABEL = '🎟️ Book Your Ticket →'

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

const FAQS = [
  { q: 'Who can attend?', a: 'Anyone interested in Java, AI, software engineering, and technology.' },
  { q: 'What does my ticket include?', a: 'Access to the full-day event, all scheduled sessions, and community activities.' },
  { q: 'Where is the event happening?', a: 'Centre For Professional Courses Department, Gujarat University, Ahmedabad.' },
  { q: "Can I get a refund if I can't attend?", a: 'Please refer to our Cancellation & Refund Policy for details.' },
  { q: 'Will food and refreshments be provided?', a: 'Yes, details will be shared closer to the event.' },
]

const cardStyle = {
  background: '#fff',
  borderRadius: '28px',
  padding: '30px',
  border: '1px solid rgba(14,22,103,.08)',
  boxShadow: '0 18px 42px rgba(14,22,103,.08)',
} as const

const eyebrowStyle = {
  fontSize: '13px',
  fontWeight: 800,
  letterSpacing: '1px',
  textTransform: 'uppercase',
  color: '#0D5CDB',
  marginBottom: '16px',
} as const

const chevron = (open: boolean) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ flex: 'none', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .2s ease' }}>
    <path d="M6 9l6 6 6-6" />
  </svg>
)

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: '1px solid rgba(14,22,103,.1)' }}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', padding: '20px 2px', background: 'none', border: 'none', textAlign: 'left', fontFamily: 'inherit', fontSize: '16px', fontWeight: 700, color: '#0E1667', cursor: 'pointer' }}
      >
        {q}
        {chevron(open)}
      </button>
      {open && <p style={{ margin: '0 0 20px', padding: '0 2px', fontSize: '14px', lineHeight: 1.7, color: '#42498a' }}>{a}</p>}
    </div>
  )
}

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

          <div data-reveal data-reveal-d="140" style={{ marginTop: '36px' }}>
            <TicketsCta
              label={TICKET_CTA_LABEL}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', fontWeight: '500', textTransform: 'uppercase', fontSize: '15px', letterSpacing: '1px', padding: '16px 30px', borderRadius: '46px', boxShadow: '0 14px 36px rgba(255,56,75,.36)' }}
            />
          </div>
        </div>
      </section>

      <section id="tickets-expect" style={{ position: 'relative', background: '#F4F1E8', color: '#0E1667', padding: '76px 40px', textAlign: 'center' }}>
        <div data-reveal style={{ maxWidth: '720px', margin: '0 auto' }}>
          <h2 style={{ margin: '0 0 14px', fontWeight: 500, fontSize: 'clamp(26px,3.6vw,40px)', letterSpacing: '-1px' }}>What to Expect</h2>
          <p style={{ margin: 0, fontSize: '16px', lineHeight: 1.7, color: '#42498a' }}>
            A full day of practical sessions, expert insights, real-world engineering, and meaningful community connections.
          </p>
        </div>
      </section>

      <section id="tickets-highlights" style={{ position: 'relative', background: '#F4F1E8', color: '#0E1667', padding: '0 40px 84px' }}>
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

      <section id="tickets-tracks" style={{ position: 'relative', background: '#fff', color: '#0E1667', padding: '76px 40px', textAlign: 'center' }}>
        <div data-reveal style={{ maxWidth: '720px', margin: '0 auto' }}>
          <h2 style={{ margin: '0 0 14px', fontWeight: 500, fontSize: 'clamp(26px,3.6vw,40px)', letterSpacing: '-1px' }}>Tracks That Matter</h2>
          <p style={{ margin: '0 0 22px', fontSize: '16px', lineHeight: 1.7, color: '#42498a' }}>
            Explore focused tracks covering the latest challenges and opportunities across Java, AI, architecture, cloud, and modern software engineering.
          </p>
          <a href="/cfp/#cfp-tracks" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontWeight: 800, fontSize: '14px', color: '#0D5CDB', textDecoration: 'none' }}>
            View Track Details →
          </a>
        </div>
      </section>

      <section id="tickets-schedule" style={{ position: 'relative', background: '#F4F1E8', color: '#0E1667', padding: '76px 40px', textAlign: 'center' }}>
        <div data-reveal style={{ maxWidth: '720px', margin: '0 auto' }}>
          <h2 style={{ margin: '0 0 14px', fontWeight: 500, fontSize: 'clamp(26px,3.6vw,40px)', letterSpacing: '-1px' }}>Event Day Schedule</h2>
          <p style={{ margin: '0 0 22px', fontSize: '16px', lineHeight: 1.7, color: '#42498a' }}>
            See what's happening throughout the day—from keynotes and technical sessions to networking and community moments.
          </p>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(13,92,219,.08)', color: '#0D5CDB', padding: '9px 18px', borderRadius: '999px', fontSize: '13px', fontWeight: 800, letterSpacing: '.6px', textTransform: 'uppercase' }}>
            Coming Soon
          </span>
        </div>
      </section>

      <section id="tickets-faq" style={{ position: 'relative', background: '#fff', color: '#0E1667', padding: '76px 40px' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <div data-reveal style={{ marginBottom: '30px', textAlign: 'center' }}>
            <h2 style={{ margin: '0 0 10px', fontWeight: 500, fontSize: 'clamp(26px,3.6vw,40px)', letterSpacing: '-1px' }}>Frequently Asked Questions</h2>
            <p style={{ margin: 0, fontSize: '15px', color: '#5a6299' }}>Everything you need to know before joining us.</p>
          </div>
          <div data-reveal data-reveal-d="60" style={cardStyle}>
            {FAQS.map((f) => <FaqItem key={f.q} q={f.q} a={f.a} />)}
          </div>
        </div>
      </section>

      <section id="tickets-cta" style={{ position: 'relative', background: 'linear-gradient(150deg,#1a2670,#0E1667)', color: '#fff', padding: '84px 40px', textAlign: 'center', overflow: 'hidden' }}>
        <CFPShapes />
        <div data-reveal style={{ position: 'relative', zIndex: 3, maxWidth: '640px', margin: '0 auto' }}>
          <div style={{ ...eyebrowStyle, color: '#FEC400' }}>Ready to Join the Community?</div>
          <h2 style={{ margin: '0 0 14px', fontWeight: 500, fontSize: 'clamp(28px,4vw,44px)', letterSpacing: '-1.3px' }}>Secure Your Spot</h2>
          <p style={{ margin: '0 0 30px', fontSize: '16px', lineHeight: 1.65, color: '#c9d0ef' }}>
            Don't just watch the future of Java and AI—be part of the conversation.
          </p>
          <TicketsCta
            label={TICKET_CTA_LABEL}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', fontWeight: '500', textTransform: 'uppercase', fontSize: '15px', letterSpacing: '1px', padding: '16px 30px', borderRadius: '46px', boxShadow: '0 14px 36px rgba(255,56,75,.36)' }}
          />
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
