// import { A } from '../lib/assets'
import LogoCard, { type Logo } from './LogoCard'

// Real logos kept empty for now — original entries preserved for reference:
// const JUGS: Logo[] = [
//   { img: A['cfaaebc5-44c2-4374-96ec-51cb85832280'], alt: 'Bangalore JUG', dur: 4.6, delay: '0s', padding: 20, height: 120 },
//   { img: A['4273dfb1-4c44-47c8-8f24-53e344822376'], alt: 'Hyderabad JUG', dur: 4.8, delay: '-0.7s', padding: 20, height: 120 },
//   { img: A['6c9e6e96-1d93-479a-b088-b1fc81ae0ae1'], alt: 'Kerala JUG', dur: 4.5, delay: '-1.4s', padding: 20, height: 120 },
//   { img: A['802293d1-dcaf-410f-817a-c5347abd8ea3'], alt: 'Tamil JUG', dur: 4.7, delay: '-2.1s', padding: 20, height: 120 },
// ]

// Empty placeholder tiles (one row) until real JUG logos are supplied:
const JUGS: Logo[] = [
  { dur: 4.6, delay: '0s', padding: 20, height: 120 },
  { dur: 4.8, delay: '-0.7s', padding: 20, height: 120 },
  { dur: 4.5, delay: '-1.4s', padding: 20, height: 120 },
  { dur: 4.7, delay: '-2.1s', padding: 20, height: 120 },
]

/** Partnering JUGs across India (#partners). */
export default function Partners() {
  return (
    <section id="partners" style={{ position: 'relative', padding: '40px 40px 72px', background: '#F4F1E8', color: '#0E1667', overflow: 'hidden' }}>
      <span style={{ position: 'absolute', bottom: '16%', right: '8%', width: '30px', height: '30px', background: '#7D00BC', clipPath: 'polygon(50% 0,100% 50%,50% 100%,0 50%)', animation: 'cdj-float2 9s ease-in-out infinite', opacity: 0.8 }} />
      <div style={{ position: 'relative', zIndex: 3, maxWidth: '1040px', margin: '0 auto', textAlign: 'center' }}>
        <div data-reveal style={{ marginBottom: '44px' }}>
          <h2 style={{ margin: 0, fontWeight: 500, fontSize: 'clamp(30px,4.6vw,56px)', lineHeight: 1, letterSpacing: '-1.5px' }}>Partnering JUGs <span style={{ fontFamily: "'Roboto',sans-serif", fontWeight: 600, color: '#0D5CDB' }}>across India</span></h2>
          <p style={{ margin: '16px auto 0', maxWidth: '760px', fontSize: '18px', fontWeight: 500, color: '#42498a' }}>Java User Groups across the country, building one connected community.</p>
        </div>
        <div data-reveal data-reveal-d="80" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(170px, 1fr))', gap: '14px' }}>
          {JUGS.map((l, i) => <LogoCard key={i} {...l} />)}
        </div>
      </div>
    </section>
  )
}
