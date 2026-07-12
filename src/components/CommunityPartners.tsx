// import { A } from '../lib/assets'
import LogoCard, { type Logo } from './LogoCard'

// Real logos kept empty for now — original entries preserved for reference:
// const COMMUNITIES: Logo[] = [
//   { img: A['60b3e840-c069-4b8e-8006-e230588c4d4c'], alt: 'GDG Gandhinagar', dur: 4.6, delay: '0s', padding: 24, height: 130 },
//   { img: A['7b469ec3-dc51-46bc-8afc-a7e8068ba8a8'], alt: 'Docker Ahmedabad', dur: 4.8, delay: '-0.7s', padding: 8, height: 130 },
//   { img: A['970e7f32-e3e8-468c-8e03-4719c18d45dc'], alt: 'CNCG Ahmedabad', dur: 4.5, delay: '-1.4s', padding: 8, height: 130 },
//   { img: A['0f1b55fa-829c-4b5a-a287-9f64465ca86c'], alt: 'OSW Ahmedabad', dur: 4.7, delay: '-2.1s', padding: 8, height: 130 },
// ]

// Empty placeholder tiles (one row) until real community logos are supplied:
const COMMUNITIES: Logo[] = [
  { dur: 4.6, delay: '0s', padding: 24, height: 130 },
  { dur: 4.8, delay: '-0.7s', padding: 8, height: 130 },
  { dur: 4.5, delay: '-1.4s', padding: 8, height: 130 },
  { dur: 4.7, delay: '-2.1s', padding: 8, height: 130 },
]

/** Community partners — tech communities across Gujarat (#community-partners). */
export default function CommunityPartners() {
  return (
    <section id="community-partners" style={{ position: 'relative', padding: '110px 40px', background: '#F4F1E8', color: '#0E1667', overflow: 'hidden' }}>
      <span style={{ position: 'absolute', top: '14%', left: '7%', width: '28px', height: '28px', borderRadius: '50%', background: '#02CF70', animation: 'cdj-float1 9s ease-in-out infinite', opacity: 0.8 }} />
      <div style={{ position: 'relative', zIndex: 3, maxWidth: '1040px', margin: '0 auto', textAlign: 'center' }}>
        <div data-reveal style={{ marginBottom: '44px' }}>
          <h2 style={{ margin: 0, fontWeight: 500, fontSize: 'clamp(30px,4.6vw,56px)', lineHeight: 1, letterSpacing: '-1.5px' }}>Community <span style={{ fontFamily: "'Roboto',sans-serif", fontWeight: 600, color: '#02CF70' }}>partners</span></h2>
          <p style={{ margin: '16px auto 0', maxWidth: '720px', fontSize: '18px', fontWeight: 500, color: '#42498a' }}>Tech communities across Gujarat joining hands to power the day.</p>
        </div>
        <div data-reveal data-reveal-d="80" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(170px, 1fr))', gap: '14px' }}>
          {COMMUNITIES.map((l, i) => <LogoCard key={i} {...l} />)}
        </div>
      </div>
    </section>
  )
}
