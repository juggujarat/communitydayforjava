/** Floating white logo tile used by the Partners / Community Partners grids. */
export interface Logo { img?: string; alt?: string; dur: number; delay: string; padding: number; height: number; label?: string; href?: string }

export default function LogoCard({ img, alt, dur, delay, padding, height, label = 'Logo', href }: Logo) {
  return (
    <div style={{ background: '#fff', border: '1px solid rgba(14,22,103,.08)', borderRadius: '14px', padding, height, display: 'flex', alignItems: 'center', justifyContent: 'center', animation: `cdj-logofloat ${dur}s ease-in-out ${delay} infinite`, willChange: 'transform' }}>
      {img ? (
        href ? (
          <a href={href} target="_blank" rel="noopener noreferrer" aria-label={alt ?? label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
            <img src={img} alt={alt} style={{ maxWidth: '100%', maxHeight: '100%', display: 'block' }} />
          </a>
        ) : (
          <img src={img} alt={alt} style={{ maxWidth: '100%', maxHeight: '100%', display: 'block' }} />
        )
      ) : (
        // Empty placeholder shown until a real logo is supplied.
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', lineHeight: 1.05, border: '1.5px dashed rgba(20,26,80,.2)', borderRadius: '10px' }}>
          <span style={{ fontSize: '20px', fontWeight: 800, fontStyle: 'italic', letterSpacing: '.3px', color: '#9AA0B5' }}>Coming</span>
          <span style={{ fontSize: '20px', fontWeight: 800, fontStyle: 'italic', letterSpacing: '.3px', color: '#9AA0B5' }}>Soon</span>
        </div>
      )}
    </div>
  )
}
