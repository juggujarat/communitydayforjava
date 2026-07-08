import { h } from '../lib/handlers'
import { A } from '../lib/assets'

/** Venue section (#venue): hero image, embedded map, address card. */
export default function Venue() {
  return (
    <section id="venue" style={{ position: 'relative', padding: '120px 40px', background: '#F4F1E8', color: '#0E1667', overflow: 'hidden' }}>
      <span style={{ position: 'absolute', top: '11%', left: '6%', width: '34px', height: '34px', borderRadius: '50%', background: '#0D5CDB', animation: 'cdj-float1 9s ease-in-out infinite', opacity: 0.8 }} />
      <span style={{ position: 'absolute', bottom: '14%', right: '7%', width: '30px', height: '30px', background: '#7D00BC', clipPath: 'polygon(50% 0,100% 50%,50% 100%,0 50%)', animation: 'cdj-float2 8s ease-in-out infinite', opacity: 0.8 }} />
      <div style={{ position: 'relative', zIndex: 3, maxWidth: '1140px', margin: '0 auto' }}>
        <div data-reveal style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h2 style={{ margin: 0, fontWeight: 500, fontSize: 'clamp(30px,4.6vw,56px)', lineHeight: 1.04, letterSpacing: '-1.5px' }}>Gujarat University, <span style={{ fontFamily: "'Roboto',sans-serif", fontWeight: 600, color: '#0D5CDB' }}>Ahmedabad</span></h2>
          <p style={{ margin: '16px auto 0', maxWidth: '540px', fontSize: '18px', fontWeight: 500, color: '#42498a' }}>A full-day technical immersive at one of Gujarat's landmark academic campuses, in the heart of the city.</p>
        </div>
        <div data-reveal data-reveal-d="80" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(330px,1fr))', gap: '22px', alignItems: 'stretch' }}>
          <div style={{ position: 'relative', borderRadius: '26px', overflow: 'hidden', minHeight: '440px', boxShadow: '0 30px 64px rgba(14,22,103,.22)' }}>
            <img src={A['1480f039-39b0-404c-af90-c8cd572febec']} alt="Gujarat University auditorium" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(14,22,103,0) 38%,rgba(14,22,103,.78) 100%)' }} />
            <div style={{ position: 'absolute', left: '26px', right: '26px', bottom: '24px', color: '#fff' }}>
              <div style={{ fontWeight: 800, fontSize: '24px', letterSpacing: '-.5px' }}>Convention Hall</div>
              <div style={{ fontSize: '13.5px', opacity: 0.9, marginTop: '4px' }}>Gujarat University · Navrangpura, Ahmedabad</div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div style={{ position: 'relative', borderRadius: '26px', overflow: 'hidden', flex: 1, minHeight: '230px', boxShadow: '0 24px 56px rgba(14,22,103,.18)', border: '1px solid rgba(14,22,103,.08)' }}>
              <iframe title="Gujarat University map" src="https://www.google.com/maps?q=Gujarat%20University%2C%20Ahmedabad&output=embed" style={{ width: '100%', height: '100%', minHeight: '230px', border: 0, display: 'block' }} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
            <div style={{ background: '#fff', borderRadius: '24px', padding: '24px 26px', boxShadow: '0 12px 30px rgba(14,22,103,.1)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                <div style={{ flex: 'none', width: '44px', height: '44px', borderRadius: '13px', background: '#0D5CDB', display: 'grid', placeItems: 'center' }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff"><path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" /></svg>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 800, fontSize: '17px' }}>Gujarat University</div>
                  <div style={{ fontSize: '13.5px', color: '#42498a', marginTop: '3px' }}>Navrangpura, Ahmedabad, Gujarat 380009</div>
                </div>
              </div>
              <a href="https://www.google.com/maps/search/?api=1&query=Gujarat+University+Ahmedabad" target="_blank" rel="noopener" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '20px', background: '#0D5CDB', color: '#fff', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1px', fontSize: '13px', padding: '15px', borderRadius: '40px', textDecoration: 'none', boxShadow: '0 10px 26px rgba(13,92,219,.3)' }} data-cta="1" onMouseEnter={h.btnOn} onMouseLeave={h.btnOff}>Get directions →</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
