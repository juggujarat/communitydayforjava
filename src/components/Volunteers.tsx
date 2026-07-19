import { A } from '../lib/assets'
import { SocialRow, type Social } from '../lib/icons'

interface Volunteer {
  name: string; role?: string; org: string; img: string; bg: string; pos: string; zoom?: boolean; scale?: number; origin?: string; socials: Social[]
}

const li = (name: string, href: string): Social => ({ type: 'linkedin', href, label: `${name} on LinkedIn` })
const ig = (name: string, href: string): Social => ({ type: 'instagram', href, label: `${name} on Instagram` })
const gh = (name: string, href: string): Social => ({ type: 'github', href, label: `${name} on GitHub` })

const VOLUNTEERS: Volunteer[] = [
  { name: 'Daman Singh Rajput', role: 'Java FullStack Developer', org: 'Techxplore', img: A['8431f54c-7088-4c9e-8d84-5cf02d90f8ad'], bg: '#FF384B', pos: '50% 18%', socials: [li('Daman Singh Rajput', 'https://in.linkedin.com/in/daman-singh-rajput-2a1ba4237')] },
  { name: 'Paree Patel', role: 'Student', org: 'Parul University', img: A['6bd3fda0-0d8a-48a9-9026-a0e45769304c'], bg: '#0D5CDB', pos: '50% 8%', zoom: true, socials: [li('Paree Patel', 'https://www.linkedin.com/in/paree-patel-b1707a329')] },
  { name: 'Deep Shah', role: 'Java FullStack Developer', org: 'Techxplore', img: '/assets/deep-shah.webp', bg: '#02CF70', pos: '50% 12%', socials: [li('Deep Shah', 'https://www.linkedin.com/in/deepshah-java-developer'), ig('Deep Shah', 'https://www.instagram.com/ishahdeep')] },
  { name: 'Jayesh Gupta', role: 'Software Engineer', org: 'TCS', img: A['9bbc223f-9f21-49aa-af66-23ac8226e948'], bg: '#FEC400', pos: '50% 6%', zoom: true, socials: [li('Jayesh Gupta', 'https://in.linkedin.com/in/jayeshgupta91')] },
  { name: 'Nagendra Verma', role: 'Java FullStack Developer', org: 'Techxplore', img: A['09610378-4035-4348-aa57-10b677b7eb0f'], bg: '#7D00BC', pos: '50% 18%', socials: [li('Nagendra Verma', 'https://linkedin.com/in/nagendra-verma-8a60372b2/'), ig('Nagendra Verma', 'https://www.instagram.com/nagendrayounger')] },
  { name: 'Smit Joshi', role: 'ASE @ Advenix Systems LLP', org: 'Advenix Systems LLP', img: A['6fedc772-7fb3-4c46-996f-3fc8065fb6fc'], bg: '#0D5CDB', pos: '50% 10%', socials: [li('Smit Joshi', 'https://www.linkedin.com/in/smit-joshi814'), gh('Smit Joshi', 'https://github.com/smit-joshi814')] },
  { name: 'Malhar Gupte', role: 'AI Data Engineer', org: 'ProductSquads', img: A['4bbd6e58-8d6f-4db9-8a4c-9827262260fd'], bg: '#02CF70', pos: '50% 8%', socials: [li('Malhar Gupte', 'https://www.linkedin.com/in/malhargupte/')] },
  { name: 'Harshvardhan Parmar', role: "LFX'25 Mentee", org: 'Microcks', img: A['0b80d07f-cdc9-45ab-a226-7bfd34ce3991'], bg: '#FEC400', pos: '50% 14%', socials: [li('Harshvardhan Parmar', 'https://www.linkedin.com/in/harshvardhan-parmar')] },
  // was: socials: [] — LinkedIn icon added for alignment; replace '#' with the real profile URL
  { name: 'Vinay Rajput', role: 'Sr. Visual Designer', org: 'Apexure India', img: A['2edee5be-2908-4001-80aa-7e789fe6554f'], bg: '#7D00BC', pos: '50% 20%', socials: [li('Vinay Rajput', '#')] },
  { name: 'Divyesh Prajapati', role: 'Java Technical Lead', org: 'Tata Consultancy Services', img: '/assets/divyesh-prajapati.webp', bg: '#0D5CDB', pos: '50% 0%', scale: 1.8, origin: 'center top', socials: [li('Divyesh Prajapati', 'https://www.linkedin.com/in/divyeshprajapati1010/')] },
  { name: 'Tanvir Dhanani', role: 'Backend Developer', org: 'IBM', img: '/assets/dhanani-tanvir.webp', bg: '#02CF70', pos: '50% 22%', scale: 1.9, origin: 'center center', socials: [li('Dhanani Tanvir', 'https://www.linkedin.com/in/tanvirdhanani')] },
]

/** Volunteers & organisers (#volunteers). */
export default function Volunteers() {
  return (
    <section id="volunteers" style={{ position: 'relative', padding: '72px 40px', background: 'radial-gradient(120% 100% at 80% 0%,#1a2670,#0E1667 72%)', overflow: 'hidden' }}>
      <span style={{ position: 'absolute', top: '14%', right: '8%', width: '30px', height: '30px', borderRadius: '50%', background: '#02CF70', animation: 'cdj-float1 9s ease-in-out infinite', opacity: 0.7 }} />
      <div style={{ position: 'relative', zIndex: 3, maxWidth: '1080px', margin: '0 auto', textAlign: 'center' }}>
        <div data-reveal style={{ marginBottom: '48px' }}>
          <h2 style={{ margin: 0, fontWeight: 500, fontSize: 'clamp(30px,4.6vw,56px)', lineHeight: 1, letterSpacing: '-1.5px' }}>Volunteers &amp; <span style={{ fontFamily: "'Roboto',sans-serif", fontWeight: 600, color: '#FEC400' }}>organisers</span></h2>
          <p style={{ margin: '16px auto 0', maxWidth: '520px', fontSize: '18px', fontWeight: 500, color: '#a8b0e0' }}>Community Day for Java runs on the energy of volunteers who make the day happen.</p>
        </div>
        <div id="volunteers-grid" data-reveal data-reveal-d="80" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px, 1fr))', gap: '34px 24px', maxWidth: '1080px', margin: '0 auto' }}>
          {VOLUNTEERS.map((v, i) => (
            <div key={i} style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ aspectRatio: '1', margin: '0 auto 16px', width: '100%', borderRadius: '22px', overflow: 'hidden', background: v.bg, boxShadow: '0 16px 34px rgba(0,0,0,.34)' }}>
                <img src={v.img} alt={v.name} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: v.pos, display: 'block', ...((v.scale ?? (v.zoom ? 1.45 : 1)) !== 1 ? { transform: `scale(${v.scale ?? 1.45})`, transformOrigin: v.origin ?? 'center top' } : {}) }} />
              </div>
              <div style={{ fontWeight: 700, fontSize: '16px', color: '#fff' }}>{v.name}</div>
              {v.role && <div style={{ fontSize: '13px', color: '#9aa3d6', marginTop: '4px' }}>{v.role}</div>}
              <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#FEC400', marginTop: '5px' }}>{v.org}</div>
              {/* {v.socials.length > 0 && <SocialRow socials={v.socials} variant="dark" />} */}
              {/* Only LinkedIn is shown for now — drop Instagram / GitHub icons: */}
              {v.socials.filter((s) => s.type === 'linkedin').length > 0 && (
                <div style={{ marginTop: 'auto' }}>
                  <SocialRow socials={v.socials.filter((s) => s.type === 'linkedin')} variant="dark" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
