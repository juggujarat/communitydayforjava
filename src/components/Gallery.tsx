import { A } from '../lib/assets'
import { h } from '../lib/handlers'

interface Shot { img: string; alt: string; big?: boolean }

const SHOTS: Shot[] = [
  { img: '/assets/gallery-speaker-podium.jpg', alt: 'Community Day for Java 2025 speaker at the podium', big: true },
  { img: A['cfc2a2ad-73c9-480e-aedf-76b94d67894f'], alt: 'Community Day for Java 2025 moment' },
  { img: A['c5374b69-b581-49b2-85ad-08590ade34f4'], alt: 'Community Day for Java 2025 moment' },
  { img: A['7836a0dd-189f-4058-90c1-fa8981c8a658'], alt: 'Community Day for Java 2025 moment' },
  { img: A['a9f77f1d-2ab1-4ba1-bfe1-83eb58901df7'], alt: 'Community Day for Java 2025 registration and swag' },
  { img: A['df6fc632-a5b7-45b8-a218-9148611860d3'], alt: 'Community Day for Java 2025 audience' },
  { img: A['e62bea37-d070-4854-823e-39ed8e9b4dbf'], alt: 'Community Day for Java 2025 team' },
  { img: '/assets/gallery-team-backdrop.jpg', alt: 'Community Day for Java 2025 team at the step-and-repeat backdrop' },
  { img: '/assets/gallery-stage-banner.jpg', alt: 'Community Day for Java 2025 stage' },
  { img: '/assets/gallery-speaker-dhaval.jpg', alt: 'Community Day for Java 2025 speaker' },
  { img: '/assets/gallery-speaker-jigar.jpg', alt: 'Community Day for Java 2025 speaker' },
  { img: '/assets/gallery-audience-seated.jpg', alt: 'Community Day for Java 2025 audience' },
  { img: A['3fc84056-755a-4c47-9532-72d72694acf2'], alt: 'Community Day for Java 2025' },
  { img: '/assets/gallery-audience-standing.jpg', alt: 'Community Day for Java 2025 audience' },
  { img: '/assets/gallery-group-stage.jpg', alt: 'Community Day for Java 2025 group photo on stage' },
  { img: '/assets/gallery-volunteer-mic.jpg', alt: 'Community Day for Java 2025 volunteer on stage' },
  { img: '/assets/gallery-hosts-stage.jpg', alt: 'Community Day for Java 2025 hosts on stage' },
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
        <div id="gallery-grid" style={{ maxWidth: '1140px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gridAutoRows: '190px', gridAutoFlow: 'dense', gap: '14px' }}>
          {SHOTS.map((s, i) => (
            <div
              key={i}
              data-reveal
              data-reveal-d={String(Math.min(i, 6) * 60)}
              data-gallery-big={s.big ? 'true' : undefined}
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
