import { A } from '../lib/assets'

const frame: React.CSSProperties = { borderRadius: '12px', overflow: 'hidden', border: '12px solid transparent', boxSizing: 'border-box' }

interface Shot { zoom: string; img: string; alt: string; fit: 'cover' | 'contain'; inner: React.CSSProperties; z2?: boolean }

const SHOTS: Shot[] = [
  { zoom: '3.6', img: A['3fc84056-755a-4c47-9532-72d72694acf2'], alt: 'Community Day for Java 2025', fit: 'cover', z2: true, inner: { position: 'relative', width: '34vw', height: '38vh' } },
  { zoom: '5', img: A['cfc2a2ad-73c9-480e-aedf-76b94d67894f'], alt: '', fit: 'contain', inner: { position: 'relative', top: '-32vh', left: '5vw', width: '32vw', height: '28vh' } },
  { zoom: '6', img: A['b818daf2-a1a0-4c03-b8a8-fe4b663b1047'], alt: '', fit: 'contain', inner: { position: 'relative', top: '-8vh', left: '-26vw', width: '22vw', height: '42vh' } },
  { zoom: '5', img: A['c614fc18-de56-438e-b150-05e54a8665f7'], alt: '', fit: 'contain', inner: { position: 'relative', top: '2vh', left: '27vw', width: '24vw', height: '26vh' } },
  { zoom: '6', img: A['c5374b69-b581-49b2-85ad-08590ade34f4'], alt: '', fit: 'contain', inner: { position: 'relative', top: '28vh', left: '6vw', width: '22vw', height: '26vh' } },
  { zoom: '8', img: A['5fd2119a-584d-4f18-aa52-7ac71b0ffdf2'], alt: '', fit: 'contain', inner: { position: 'relative', top: '28vh', left: '-22vw', width: '28vw', height: '26vh' } },
  { zoom: '9', img: A['9c1f0430-c9ca-43f3-8c8d-1a622f74c30a'], alt: '', fit: 'contain', inner: { position: 'relative', top: '24vh', left: '26vw', width: '16vw', height: '20vh' } },
  { zoom: '7', img: A['7836a0dd-189f-4058-90c1-fa8981c8a658'], alt: '', fit: 'contain', inner: { position: 'relative', top: '-30vh', left: '30vw', width: '18vw', height: '22vh' } },
]

/** Moments-from-2025 zoom-parallax gallery (#moments-head + #gallery). */
export default function Gallery() {
  return (
    <>
      <section id="moments-head" style={{ position: 'relative', background: '#0E1667', padding: '44px 40px 0', textAlign: 'center' }}>
        <div data-reveal>
          <h2 style={{ margin: 0, fontWeight: 500, fontSize: 'clamp(30px,4.6vw,58px)', color: '#fff', letterSpacing: '-1.5px', lineHeight: 1 }}>Moments from <span style={{ fontFamily: "'Roboto',sans-serif", fontWeight: 600, color: '#FEC400' }}>2025</span></h2>
        </div>
      </section>
      <section id="gallery" style={{ position: 'relative', height: '240vh', background: '#0E1667' }}>
        <div data-zoomstage="" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100vh', overflow: 'hidden' }}>
          {SHOTS.map((s, i) => (
            <div key={i} data-zoomimg={s.zoom} style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', ...(s.z2 ? { zIndex: 2 } : {}) }}>
              <div style={{ ...s.inner, ...frame }}>
                <img src={s.img} alt={s.alt} style={{ width: '100%', height: '100%', objectFit: s.fit, display: 'block' }} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
