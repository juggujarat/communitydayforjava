import { ManifestoShapes } from '../lib/decor'
import coffee from '../assets/icons/coffe.svg'
import cloud from '../assets/icons/cloud.svg'
import hammer from '../assets/icons/hammer.svg'

const PROOFS = [
  { title: 'Enterprise AI, shipped', desc: 'Java already powers real, production AI features inside modern enterprise systems.', icon: cloud, color: '#7D00BC', tint: 'rgba(125,0,188,.08)' },
  { title: 'AI running natively', desc: 'Java can run machine learning and LLM workloads directly, without leaving the platform.', icon: coffee, color: '#0D5CDB', tint: 'rgba(13,92,219,.08)' },
  { title: 'Cloud-native, built to scale', desc: "Today's Java starts in milliseconds and scales instantly — a natural fit for containers, Kubernetes, and AI-serving infrastructure.", icon: hammer, color: '#02CF70', tint: 'rgba(2,207,112,.08)' },
]

/** Manifesto / single-claim "why Java, why now" statement section (#manifesto). */
export default function Manifesto() {
  return (
    <section id="manifesto" style={{ position: 'relative', padding: '80px 40px', background: '#F4F1E8', color: '#0E1667', overflow: 'hidden' }}>
      <ManifestoShapes />
      <div style={{ position: 'relative', zIndex: 3, maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
        <h2 data-reveal data-reveal-d="60" style={{ margin: 0, fontWeight: 500, lineHeight: 1.05, letterSpacing: '-2px', fontSize: 'clamp(30px,4.4vw,52px)' }}>
          The AI era runs on <span style={{ fontFamily: "'Roboto',sans-serif", fontWeight: 600, color: '#7D00BC' }}>Java</span>.
        </h2>

        <p data-reveal data-reveal-d="140" style={{ margin: '28px auto 0', maxWidth: '620px', fontSize: 'clamp(16px,1.8vw,20px)', lineHeight: 1.55, color: '#0E1667', fontWeight: 600 }}>
          <span style={{ color: '#6b73a8', fontWeight: 500 }}>While everyone's debating Java vs. AI</span><br />Java developers are already building it.
        </p>

        <div data-reveal data-reveal-d="240" style={{ margin: 'clamp(56px,8vw,80px) auto 0' }}>
          <div style={{ height: '1px', background: 'rgba(14,22,103,.12)', marginBottom: 'clamp(28px,4vw,40px)' }} />
          <div id="manifesto-proofs" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '32px', textAlign: 'left' }}>
            {PROOFS.map((p) => (
              <div key={p.title} style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
                <div aria-hidden="true" style={{ flex: 'none', width: '56px', height: '56px', borderRadius: '16px', background: p.tint, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ width: '30px', height: '30px', display: 'block', background: p.color, WebkitMaskImage: `url(${p.icon})`, maskImage: `url(${p.icon})`, WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat', WebkitMaskPosition: 'center', maskPosition: 'center', WebkitMaskSize: 'contain', maskSize: 'contain' }} />
                </div>
                <div>
                  <h3 style={{ margin: '0 0 8px', fontSize: '15px', fontWeight: 700, letterSpacing: '.3px', color: '#0E1667' }}>{p.title}</h3>
                  <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.55, color: '#6b73a8' }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
