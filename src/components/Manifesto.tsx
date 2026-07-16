import { ManifestoShapes } from '../lib/decor'
import FollowSocials from './FollowSocials'
import { TICKETS_COMING_SOON, TICKETS_UPDATE_CAPTION } from '../lib/links'

const PROOFS = [
  { title: 'Enterprise AI, shipped', desc: 'Java already powers real, production AI features inside modern enterprise systems.' },
  { title: 'AI running natively', desc: 'Java can run machine learning and LLM workloads directly, without leaving the platform.' },
  { title: 'Cloud-native, built to scale', desc: "Today's Java starts in milliseconds and scales instantly — a natural fit for containers, Kubernetes, and AI-serving infrastructure." },
]

/** Manifesto / single-claim "why Java, why now" statement section (#manifesto). */
export default function Manifesto() {
  return (
    <section id="manifesto" style={{ position: 'relative', padding: '80px 40px', background: '#F4F1E8', color: '#0E1667', overflow: 'hidden' }}>
      <ManifestoShapes />
      <div style={{ position: 'relative', zIndex: 3, maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
        <h2 data-reveal data-reveal-d="60" style={{ margin: 0, fontWeight: 500, lineHeight: 1.05, letterSpacing: '-2px', fontSize: 'clamp(34px,5.6vw,64px)' }}>
          The AI era runs on <span style={{ fontFamily: "'Roboto',sans-serif", fontWeight: 600, color: '#7D00BC' }}>Java</span>.
        </h2>

        <p data-reveal data-reveal-d="140" style={{ margin: '28px auto 0', maxWidth: '620px', fontSize: 'clamp(16px,1.8vw,20px)', lineHeight: 1.55, color: '#0E1667', fontWeight: 600 }}>
          <span style={{ color: '#6b73a8', fontWeight: 500 }}>While everyone's debating Java vs. AI</span> — Java developers are already building it. You just haven't seen it yet.
        </p>

        <div data-reveal data-reveal-d="240" style={{ margin: 'clamp(56px,8vw,80px) auto 0' }}>
          <div style={{ height: '1px', background: 'rgba(14,22,103,.12)', marginBottom: 'clamp(28px,4vw,40px)' }} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '32px', textAlign: 'left' }}>
            {PROOFS.map((p) => (
              <div key={p.title}>
                <h3 style={{ margin: '0 0 8px', fontSize: '15px', fontWeight: 700, letterSpacing: '.3px', color: '#0E1667' }}>{p.title}</h3>
                <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.55, color: '#6b73a8' }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div data-reveal data-reveal-d="360" style={{ marginTop: 'clamp(40px,6vw,56px)', textAlign: 'center' }}>
          <span data-cta="1" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: '#FF384B', color: '#fff', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1px', fontSize: '14px', padding: '15px 28px', borderRadius: '46px', cursor: 'default', boxShadow: '0 14px 36px rgba(255,56,75,.36)' }}>{TICKETS_COMING_SOON}</span>

          <div style={{ marginTop: '24px' }}>
            <FollowSocials tone="light" caption={TICKETS_UPDATE_CAPTION} />
          </div>
        </div>
      </div>
    </section>
  )
}
