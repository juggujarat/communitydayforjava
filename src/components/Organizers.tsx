import { A } from '../lib/assets'
import { SocialRow, type Social } from '../lib/icons'

interface Organizer { name: string; role: string; org: string; img: string; grad: string; linkedin?: string }

const ORGANIZERS: Organizer[] = [
  { name: 'Dhaval Gajjar', role: 'System Architect', org: 'Staunchsys IT Services', img: A['6966fdb6-41ad-44ae-a9ac-c106a39f43c8'], grad: 'linear-gradient(160deg,#FF384B,#c42233)', linkedin: 'https://www.linkedin.com/in/dhavalgajjarin/' },
  { name: 'Vikas Rajput', role: 'Founder', org: 'TechXplore', img: A['c7e0ec15-621a-484b-994f-e4f1f100b8a5'], grad: 'linear-gradient(160deg,#0D5CDB,#0a47a8)', linkedin: 'https://linkedin.com/in/vikasrajputin' },
  { name: 'Bharat Ranpariya', role: 'Engineering Manager', org: 'DataOrb', img: A['13a9f265-6945-4618-bbdc-b6a3b040e3c8'], grad: 'linear-gradient(160deg,#02CF70,#0a8f4f)', linkedin: 'https://www.linkedin.com/in/bharat-ranpariya/' },
]

const socials = (o: Organizer): Social[] => [
  { type: 'linkedin', href: o.linkedin ?? '#', label: `${o.name} on LinkedIn` },
  // Only LinkedIn is shown for now — old icons kept for reference:
  // { type: 'x', href: '#', label: `${name} on X` },
  // { type: 'github', href: '#', label: `${name} on GitHub` },
]

/** Core organizers (#organizers). */
export default function Organizers() {
  return (
    <section id="organizers" style={{ position: 'relative', padding: '110px 40px', background: '#F4F1E8', color: '#0E1667', overflow: 'hidden' }}>
      <span style={{ position: 'absolute', top: '12%', left: '7%', width: '34px', height: '34px', borderRadius: '50%', background: '#FEC400', animation: 'cdj-float1 9s ease-in-out infinite', opacity: 0.8 }} />
      <span style={{ position: 'absolute', bottom: '14%', right: '8%', width: '30px', height: '30px', background: '#FF384B', clipPath: 'polygon(50% 0,100% 50%,50% 100%,0 50%)', animation: 'cdj-float2 8s ease-in-out infinite', opacity: 0.8 }} />
      <div style={{ position: 'relative', zIndex: 3, maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
        <div data-reveal style={{ marginBottom: '50px' }}>
          <h2 style={{ margin: 0, fontWeight: 500, fontSize: 'clamp(30px,4.6vw,56px)', lineHeight: 1, letterSpacing: '-1.5px' }}>Core <span style={{ fontFamily: "'Roboto',sans-serif", fontWeight: 600, color: '#FF384B' }}>organizers</span></h2>
          <p style={{ margin: '16px auto 0', maxWidth: '720px', fontSize: '18px', fontWeight: 500, color: '#42498a' }}>The people steering Community Day for Java from the front.</p>
        </div>
        <div id="organizers-grid" data-reveal data-reveal-d="80" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px, 1fr))', gap: '24px' }}>
          {ORGANIZERS.map((o, i) => (
            <div key={i} style={{ background: '#fff', border: '1px solid rgba(14,22,103,.08)', borderRadius: '26px', overflow: 'hidden', boxShadow: '0 16px 40px rgba(14,22,103,.12)', display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ aspectRatio: '1/1', position: 'relative', overflow: 'hidden', background: o.grad }}>
                <img src={o.img} alt={o.name} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 14%' }} />
              </div>
              <div style={{ padding: '24px 24px 28px', textAlign: 'center', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ fontWeight: 800, fontSize: '22px', color: '#0E1667' }}>{o.name}</div>
                <div style={{ fontSize: '14px', color: '#FF384B', fontWeight: 700, marginTop: '6px' }}>{o.role}</div>
                <div style={{ fontSize: '13px', color: '#6b73a8', marginTop: '4px' }}>{o.org}</div>
                <div style={{ marginTop: 'auto' }}>
                  <SocialRow socials={socials(o)} variant="light" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
