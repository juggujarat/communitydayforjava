/** Venue partner — the host institution (#venue-partner). */
export default function VenuePartner() {
  return (
    <section id="venue-partner" style={{ position: 'relative', padding: '40px 40px 72px', background: '#F4F1E8', color: '#0E1667', overflow: 'hidden' }}>
      <span style={{ position: 'absolute', top: '18%', right: '9%', width: '26px', height: '26px', borderRadius: '50%', background: '#0D5CDB', animation: 'cdj-float1 9s ease-in-out infinite', opacity: 0.8 }} />
      <div style={{ position: 'relative', zIndex: 3, maxWidth: '1040px', margin: '0 auto', textAlign: 'center' }}>
        <div data-reveal style={{ marginBottom: '44px' }}>
          <h2 style={{ margin: 0, fontWeight: 500, fontSize: 'clamp(30px,4.6vw,56px)', lineHeight: 1, letterSpacing: '-1.5px' }}>Venue <span style={{ fontFamily: "'Roboto',sans-serif", fontWeight: 600, color: '#0D5CDB' }}>partner</span></h2>
          <p style={{ margin: '16px auto 0', maxWidth: '720px', fontSize: '18px', fontWeight: 500, color: '#42498a' }}>Hosting us at the Centre For Professional Courses Department, Gujarat University.</p>
        </div>
        <div data-reveal data-reveal-d="80" style={{ maxWidth: '260px', margin: '0 auto' }}>
          <a
            href="https://gucpc.in/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Gujarat University Centre For Professional Courses"
            style={{ display: 'block', height: '130px', borderRadius: '14px', overflow: 'hidden', border: '1px solid rgba(14,22,103,.08)', boxShadow: '0 6px 18px rgba(14,22,103,.08)' }}
          >
            <img
              src="/assets/venue.png"
              alt="Gujarat University Centre For Professional Courses"
              loading="lazy"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 35%', display: 'block' }}
            />
          </a>
        </div>
      </div>
    </section>
  )
}
