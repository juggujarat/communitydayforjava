export default function Venue() {
  return (
    <section id="venue" style={{ position: 'relative', padding: '120px 40px', background: '#F4F1E8', color: '#0E1667', overflow: 'hidden' }}>
      <span style={{ position: 'absolute', top: '11%', left: '6%', width: '34px', height: '34px', borderRadius: '50%', background: '#0D5CDB', animation: 'cdj-float1 9s ease-in-out infinite', opacity: 0.8 }} />
      <span style={{ position: 'absolute', bottom: '14%', right: '7%', width: '30px', height: '30px', background: '#7D00BC', clipPath: 'polygon(50% 0,100% 50%,50% 100%,0 50%)', animation: 'cdj-float2 8s ease-in-out infinite', opacity: 0.8 }} />
      <div style={{ position: 'relative', zIndex: 3, maxWidth: '1140px', margin: '0 auto' }}>
        <div data-reveal style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h2 style={{ margin: 0, fontWeight: 500, fontSize: 'clamp(24px,3vw,38px)', lineHeight: 1.06, letterSpacing: '-1px' }}>Venue Will Be <span style={{ fontFamily: "'Roboto',sans-serif", fontWeight: 600, color: '#0D5CDB' }}>Announced Shortly</span></h2>
          <p style={{ margin: '16px auto 0', maxWidth: '540px', fontSize: '18px', fontWeight: 500, color: '#42498a' }}>A full-day technical immersive in the heart of Ahmedabad city.</p>
        </div>
        {/* Google Maps preview — Ahmedabad */}
        <div data-reveal data-reveal-d="80" style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ position: 'relative', height: '420px', borderRadius: '26px', overflow: 'hidden', boxShadow: '0 24px 56px rgba(14,22,103,.18)', border: '1px solid rgba(14,22,103,.08)' }}>
            <iframe title="Ahmedabad map" src="https://www.google.com/maps?q=Ahmedabad%2C%20Gujarat%2C%20India&output=embed" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0, display: 'block' }} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
          </div>
        </div>
      </div>
    </section>
  )
}
