import { A } from '../lib/assets'
import { SocialRow, type Social } from '../lib/icons'

interface Member {
  name: string; role: string; org: string; img: string; grad: string; pos: string; bio: string; socials: Social[]
}

const MEMBERS: Member[] = [
  { name: 'Markus Westergren', role: 'Technical Architect', org: 'Umecon AB', img: A['007785f9-137a-4463-86ac-b8570fce781b'], grad: 'linear-gradient(160deg,#FF384B,#c42233)', pos: '50% 12%', bio: 'Staff Engineer and Java Architect, author and expert in AI-native engineering. A frequent speaker at major conferences such as Devoxx and JFokus.', socials: [{ type: 'linkedin', href: 'https://www.linkedin.com/in/markuswestergren/', label: 'Markus Westergren on LinkedIn' }] },
  { name: 'Siva Prasad Reddy K', role: 'Developer Advocate', org: 'JetBrains', img: A['8e9a6685-f00f-409b-b669-7081606b221c'], grad: 'linear-gradient(160deg,#0D5CDB,#0a47a8)', pos: '50% 12%', bio: 'Developer Advocate at JetBrains, focusing on empowering the developer community through technical advocacy and engagement.', socials: [{ type: 'linkedin', href: 'https://www.linkedin.com/in/ksivaprasadreddy/', label: 'Siva Prasad Reddy K on LinkedIn' }] },
  { name: 'Dhaval Gajjar', role: 'System Architect', org: 'Staunchsys IT Services', img: A['6966fdb6-41ad-44ae-a9ac-c106a39f43c8'], grad: 'linear-gradient(160deg,#02CF70,#0a8f4f)', pos: '50% 14%', bio: 'System Architect and Community Manager for JUG Gujarat. With 18+ years of experience, he specializes in Spring Framework, Microservices, React and Azure.', socials: [{ type: 'linkedin', href: 'https://www.linkedin.com/in/dhavalgajjarin/', label: 'Dhaval Gajjar on LinkedIn' }] },
  { name: 'Dhaval Shah', role: 'Principal Consulting Architect', org: 'Self Employed', img: A['0fd8d06c-9fe9-4adb-977b-bf41ffd35cab'], grad: 'linear-gradient(160deg,#FEC400,#d99a00)', pos: '50% 12%', bio: 'Fintech and payments infrastructure expert with 20+ years architecting high-scale distributed systems, optimizing provisioning for large user bases.', socials: [{ type: 'linkedin', href: 'https://www.linkedin.com/in/dhavalshah201279/', label: 'Dhaval Shah on LinkedIn' }] },
  { name: 'Vikas Rajput', role: 'Founder', org: 'Techxplore', img: A['c7e0ec15-621a-484b-994f-e4f1f100b8a5'], grad: 'linear-gradient(160deg,#7C4DFF,#5a2fd0)', pos: '50% 14%', bio: 'Founder of Techxplore and a Java Enterprise Architect. He also serves as a Community Manager for JUG Gujarat, empowering developers through knowledge sharing.', socials: [{ type: 'linkedin', href: 'https://linkedin.com/in/vikasrajputin', label: 'Vikas Rajput on LinkedIn' }, { type: 'x', href: 'https://x.com/vikasrajputin', label: 'Vikas Rajput on X' }, { type: 'website', href: 'https://vikasrajput.in', label: 'Vikas Rajput website' }] },
  { name: 'Sathish Kumar Thiyagarajan', role: 'Principal Architect', org: 'KJBN Labs', img: A['edabccb0-c04f-4df8-893c-454083d945ce'], grad: 'linear-gradient(160deg,#FF384B,#c42233)', pos: '50% 12%', bio: 'Software Architect, Open Source Developer and teacher with a deep focus on architectural excellence and community education.', socials: [{ type: 'linkedin', href: 'https://www.linkedin.com/in/sathishkumarthiyagarajan/', label: 'Sathish Kumar Thiyagarajan on LinkedIn' }] },
  { name: 'Pravin Jain', role: 'Java Trainer & Evangelist', org: 'Zen Softech', img: A['5da62fd3-8002-4e09-a147-f7e1b075ab05'], grad: 'linear-gradient(160deg,#0D5CDB,#0a47a8)', pos: '50% 12%', bio: 'A dedicated Java Trainer and Evangelist at Zen Softech, focusing on spreading Java expertise and best practices throughout the community.', socials: [{ type: 'linkedin', href: 'https://www.linkedin.com/in/jainpravin/', label: 'Pravin Jain on LinkedIn' }] },
  { name: 'Bharat Ranpariya', role: 'Engineering Manager', org: 'DataOrb', img: A['13a9f265-6945-4618-bbdc-b6a3b040e3c8'], grad: 'linear-gradient(160deg,#02CF70,#0a8f4f)', pos: '50% 14%', bio: 'Engineering Manager at DataOrb and a technologist with full-stack expertise. He actively contributes to JUG Gujarat as a community leader.', socials: [{ type: 'linkedin', href: 'https://www.linkedin.com/in/bharat-ranpariya/', label: 'Bharat Ranpariya on LinkedIn' }] },
]

/** CFP review committee (#committee). */
export default function Committee() {
  return (
    <section id="committee" style={{ position: 'relative', padding: '74px 40px', background: '#F4F1E8', color: '#0E1667', overflow: 'hidden' }}>
      <span style={{ position: 'absolute', top: '13%', right: '8%', width: '30px', height: '30px', borderRadius: '50%', background: '#0D5CDB', animation: 'cdj-float1 9s ease-in-out infinite', opacity: 0.7 }} />
      <div style={{ position: 'relative', zIndex: 3, maxWidth: '1180px', margin: '0 auto' }}>
        <div data-reveal style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 style={{ margin: 0, fontWeight: 500, fontSize: 'clamp(30px,4.6vw,56px)', lineHeight: 1, letterSpacing: '-1.5px' }}>CFP review <span style={{ fontFamily: "'Roboto',sans-serif", fontWeight: 600, color: '#0D5CDB' }}>committee</span></h2>
          <p style={{ margin: '16px auto 0', maxWidth: '820px', fontSize: '18px', fontWeight: 500, color: '#42498a' }}>Experienced engineers and community leaders curating the 2026 talk lineup.</p>
        </div>
        <div id="committee-grid" data-reveal data-reveal-d="80" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '22px' }}>
          {MEMBERS.map((m, i) => (
            <div key={i} style={{ background: '#fff', border: '1px solid rgba(14,22,103,.08)', borderRadius: '26px', overflow: 'hidden', boxShadow: '0 16px 40px rgba(14,22,103,.12)', display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ aspectRatio: '1/1', position: 'relative', overflow: 'hidden', background: m.grad }}>
                <img src={m.img} alt={m.name} loading="lazy" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: m.pos }} />
              </div>
              <div style={{ padding: '14px 18px 18px', textAlign: 'center', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ fontWeight: 800, fontSize: '19px', color: '#0E1667', lineHeight: 1.2, letterSpacing: '-.3px' }}>{m.name}</div>
                <div style={{ fontSize: '13.5px', color: '#0D5CDB', fontWeight: 700, marginTop: '6px' }}>{m.role}</div>
                <div style={{ fontSize: '12.5px', color: '#6b73a8', marginTop: '4px' }}>{m.org}</div>
                <div className="committee-bio" style={{ fontSize: '12.5px', lineHeight: 1.55, color: '#42498a', marginTop: '12px', textWrap: 'pretty' as React.CSSProperties['textWrap'] }}>{m.bio}</div>
                {/* Only LinkedIn is shown for now — drop X / website icons: */}
                <div style={{ marginTop: 'auto' }}>
                  <SocialRow socials={m.socials.filter((s) => s.type === 'linkedin')} variant="light" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
