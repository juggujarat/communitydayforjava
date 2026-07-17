import { A } from '../lib/assets'
import { h } from '../lib/handlers'

interface Shot { img: string; alt: string; big?: boolean }

const SHOTS: Shot[] = [
  { img: A['3fc84056-755a-4c47-9532-72d72694acf2'], alt: 'Community Day for Java 2025', big: true },
  { img: A['cfc2a2ad-73c9-480e-aedf-76b94d67894f'], alt: 'Community Day for Java 2025 moment' },
  { img: A['b818daf2-a1a0-4c03-b8a8-fe4b663b1047'], alt: 'Community Day for Java 2025 moment' },
  { img: A['c614fc18-de56-438e-b150-05e54a8665f7'], alt: 'Community Day for Java 2025 moment' },
  { img: A['c5374b69-b581-49b2-85ad-08590ade34f4'], alt: 'Community Day for Java 2025 moment' },
  { img: A['5fd2119a-584d-4f18-aa52-7ac71b0ffdf2'], alt: 'Community Day for Java 2025 moment' },
  { img: A['9c1f0430-c9ca-43f3-8c8d-1a622f74c30a'], alt: 'Community Day for Java 2025 moment' },
  { img: A['7836a0dd-189f-4058-90c1-fa8981c8a658'], alt: 'Community Day for Java 2025 moment' },
  { img: A['1480f039-39b0-404c-af90-c8cd572febec'], alt: 'Community Day for Java 2025 venue' },
  { img: A['a9f77f1d-2ab1-4ba1-bfe1-83eb58901df7'], alt: 'Community Day for Java 2025 registration and swag' },
  { img: A['df6fc632-a5b7-45b8-a218-9148611860d3'], alt: 'Community Day for Java 2025 audience' },
  { img: A['e62bea37-d070-4854-823e-39ed8e9b4dbf'], alt: 'Community Day for Java 2025 team' },
]

/** Moments-from-2025 photo grid (#moments-head + #gallery) — click any photo to enlarge. */
export default function Gallery() {
  return (
    <>
      <section id="moments-head" style={{ position: 'relative', background: '#F4F1E8', color: '#0E1667', padding: '110px 40px 48px', textAlign: 'center' }}>
        <div data-reveal>
          <h2 style={{ margin: 0, fontWeight: 500, fontSize: 'clamp(30px,4.6vw,58px)', letterSpacing: '-1.5px', lineHeight: 1 }}>Moments from <span style={{ fontFamily: "'Roboto',sans-serif", fontWeight: 600, color: '#7D00BC' }}>2025</span></h2>
        </div>
      </section>
      <section id="gallery" style={{ position: 'relative', background: '#F4F1E8', padding: '0 40px 110px' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gridAutoRows: '190px', gridAutoFlow: 'dense', gap: '14px' }}>
          {SHOTS.map((s, i) => (
            <div
              key={i}
              data-reveal
              data-reveal-d={String(Math.min(i, 6) * 60)}
              onMouseEnter={h.galOn}
              onMouseLeave={h.galOff}
              style={{ position: 'relative', overflow: 'hidden', borderRadius: '16px', background: '#fff', border: '1px solid rgba(14,22,103,.08)', boxShadow: '0 12px 30px rgba(14,22,103,.1)', cursor: 'zoom-in', ...(s.big ? { gridColumn: 'span 2', gridRow: 'span 2' } : {}) }}
            >
              <img src={s.img} alt={s.alt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform .5s cubic-bezier(.2,.7,.2,1)' }} />
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
