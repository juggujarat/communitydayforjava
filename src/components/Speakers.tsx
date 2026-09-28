
/** Speakers section (#speakers) — "revealed soon" message + CFP CTA. */
export default function Speakers() {
  return (
    <section id="speakers" style={{ position: 'relative', padding: '78px 40px', background: 'radial-gradient(120% 100% at 80% 0%,#1a2670,#0E1667 70%)', overflow: 'hidden' }}>
      <div style={{ position: 'relative', zIndex: 3, maxWidth: '1140px', margin: '0 auto' }}>
        <div data-reveal style={{ textAlign: 'center', marginBottom: '54px' }}>
          <h2 style={{ margin: 0, fontWeight: 500, fontSize: 'clamp(32px,5vw,64px)', lineHeight: 1, letterSpacing: '-1.5px' }}>Speakers revealed <span style={{ fontFamily: "'Roboto',sans-serif", fontWeight: 600, color: '#FEC400' }}>soon</span></h2>
          <p style={{ margin: '18px auto 0', maxWidth: '1100px', fontSize: '18px', fontWeight: 500, color: '#a8b0e0' }}>15+ industry speakers exploring Java in the age of AI. The 2026 lineup drops with early-bird registration.</p>
        </div>
      </div>
    </section>
  )
}
