/** Floating white logo tile used by the Partners / Community Partners grids. */
export interface Logo { img: string; alt: string; dur: number; delay: string; padding: number; height: number }

export default function LogoCard({ img, alt, dur, delay, padding, height }: Logo) {
  return (
    <div style={{ background: '#fff', border: '1px solid rgba(14,22,103,.08)', borderRadius: '14px', padding, height, display: 'flex', alignItems: 'center', justifyContent: 'center', animation: `cdj-logofloat ${dur}s ease-in-out ${delay} infinite`, willChange: 'transform' }}>
      <img src={img} alt={alt} style={{ maxWidth: '100%', maxHeight: '100%', display: 'block' }} />
    </div>
  )
}
