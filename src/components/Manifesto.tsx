import { ManifestoShapes } from '../lib/decor'

/** Light-break statement section (#manifesto). */
export default function Manifesto() {
  return (
    <section id="manifesto" style={{ position: 'relative', padding: '80px 40px', background: '#F4F1E8', color: '#0E1667', overflow: 'hidden' }}>
      <ManifestoShapes />
      <div style={{ position: 'relative', zIndex: 3, maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
        <h2 data-reveal data-reveal-d="80" style={{ margin: 0, fontWeight: 500, lineHeight: 1.02, letterSpacing: '-2px', fontSize: '73.83px' }}>
          This is not just<br />another Java event.<br />
          <span style={{ display: 'inline-block', marginTop: '10px' }}>It's where the community <span style={{ fontFamily: "'Roboto',sans-serif", fontWeight: 600, color: '#7D00BC' }}>evolves.</span></span>
        </h2>
        <p data-reveal data-reveal-d="170" style={{ margin: '40px auto 0', maxWidth: '600px', fontSize: 'clamp(16px,1.9vw,20px)', lineHeight: 1.6, color: '#42498a', fontWeight: 500 }}>
          More than a conference, a celebration of builders. This year we put Java at the centre of the AI era — bridging academic foundations with industry and turning a single day into momentum that carries a whole regional ecosystem forward.
        </p>
      </div>
    </section>
  )
}
