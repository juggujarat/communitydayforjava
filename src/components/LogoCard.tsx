/** Floating white logo tile used by the Partners / Community Partners grids. */
export interface Logo { img?: string; alt?: string; dur: number; delay: string; padding: number; height: number; label?: string }

export default function LogoCard({ img, alt, dur, delay, padding, height, label = 'Logo' }: Logo) {
  return (
    <div style={{ background: '#fff', border: '1px solid rgba(14,22,103,.08)', borderRadius: '14px', padding, height, display: 'flex', alignItems: 'center', justifyContent: 'center', animation: `cdj-logofloat ${dur}s ease-in-out ${delay} infinite`, willChange: 'transform' }}>
      {img ? (
        <img src={img} alt={alt} style={{ maxWidth: '100%', maxHeight: '100%', display: 'block' }} />
      ) : (
        // Empty placeholder shown until a real logo is supplied.
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px', border: '1.5px dashed rgba(20,26,80,.2)', borderRadius: '10px', color: 'rgba(20,26,80,.4)' }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
            <rect x="3" y="4" width="18" height="16" rx="2" />
            <circle cx="8.5" cy="9.5" r="1.6" />
            <path d="M4 18l5-5 4 4 3-3 4 4" />
          </svg>
          <span style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '.3px' }}>{label}</span>
        </div>
      )}
    </div>
  )
}
