import { h } from '../lib/handlers'

/**
 * Sponsor logo wall (#sponsors-wall). In the original these are fillable
 * <image-slot> placeholders that ship empty; rendered here as empty logo tiles
 * with a faint placeholder label until real sponsor logos are supplied.
 */
function Slot({ id, label, height, padding, img, alt, href }: { id: string; label: string; height: number; padding: number; img?: string; alt?: string; href?: string }) {
  return (
    <div style={{ position: 'relative', background: '#fff', borderRadius: '6px', height, display: 'flex', alignItems: 'center', justifyContent: 'center', padding, boxShadow: '0 10px 30px rgba(14,22,103,.07)' }}>
      {img ? (
        href ? (
          <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`${alt ?? label} (opens in a new tab)`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
            <img id={id} src={img} alt={alt ?? label} loading="lazy" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
          </a>
        ) : (
          <img id={id} src={img} alt={alt ?? label} loading="lazy" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
        )
      ) : (
        <div id={id} style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', lineHeight: 1.05, border: '1.5px dashed rgba(20,26,80,.2)', borderRadius: '8px' }}>
          <span style={{ fontSize: '22px', fontWeight: 800, fontStyle: 'italic', letterSpacing: '.3px', color: '#9AA0B5' }}>Coming</span>
          <span style={{ fontSize: '22px', fontWeight: 800, fontStyle: 'italic', letterSpacing: '.3px', color: '#9AA0B5' }}>Soon</span>
        </div>
      )}
      {href && (
        <span aria-hidden="true" style={{ position: 'absolute', top: 8, right: 8, width: 32, height: 32, borderRadius: '50%', background: 'rgba(14,22,103,.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5a628f" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 17 17 7M9 7h8v8" />
          </svg>
        </span>
      )}
    </div>
  )
}

export default function SponsorsWall() {
  return (
    <section id="sponsors-wall" style={{ position: 'relative', padding: '72px 40px 40px', background: '#F4F1E8', color: '#0E1667', overflow: 'hidden' }}>
      <div style={{ position: 'relative', zIndex: 3, maxWidth: '1260px', margin: '0 auto', textAlign: 'center' }}>
        <div data-reveal style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 style={{ margin: 0, fontWeight: 500, fontSize: 'clamp(30px,4.6vw,56px)', lineHeight: 1, letterSpacing: '-1.5px' }}>Our <span style={{ color: '#0D5CDB' }}>Esteemed</span> <span style={{ fontFamily: "'Roboto',sans-serif", fontWeight: 600, color: '#0D5CDB' }}>Sponsors</span></h2>
        </div>
        <div data-reveal data-reveal-d="80" style={{ maxWidth: '920px', margin: '0 auto', textAlign: 'left' }}>
          <div style={{ marginBottom: '40px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#0E1667', color: '#fff', fontWeight: 800, fontSize: '12px', letterSpacing: '2px', padding: '7px 16px', borderRadius: '30px', marginBottom: '18px' }}><span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#FEC400' }} />PLATINUM</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '16px' }}>
              <Slot id="cdj-sp-1" label="Platinum logo" height={170} padding={28} img="/assets/jetbrains-logo.svg" alt="JetBrains" href="https://www.jetbrains.com/" />
              <Slot id="cdj-sp-2" label="Platinum logo" height={170} padding={28} />
            </div>
          </div>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#FEC400', color: '#0E1667', fontWeight: 800, fontSize: '12px', letterSpacing: '2px', padding: '7px 16px', borderRadius: '30px', marginBottom: '18px' }}>GOLD</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px' }}>
              <Slot id="cdj-sp-3" label="Gold logo" height={140} padding={24} />
              <Slot id="cdj-sp-4" label="Gold logo" height={140} padding={24} />
              <Slot id="cdj-sp-5" label="Gold logo" height={140} padding={24} />
            </div>
          </div>
        </div>
        <div data-reveal data-reveal-d="160" style={{ marginTop: '36px' }}>
          <a href="#sponsor" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: '#FF384B', color: '#fff', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1px', fontSize: '15px', padding: '15px 30px', borderRadius: '46px', textDecoration: 'none', boxShadow: '0 14px 36px rgba(255,56,75,.36)' }} data-cta="1" onMouseEnter={h.btnOn} onMouseLeave={h.btnOff}>Become a sponsor</a>
        </div>
      </div>
    </section>
  )
}
