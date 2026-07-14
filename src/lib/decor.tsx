/**
 * Decorative + generative helpers ported from the original bundle's DCLogic class
 * (tile / bandRow / marqueeBand / shape / buildTicker and the named shape groups).
 * These were `React.createElement` calls; here they are JSX-returning functions.
 */
import React from 'react'

export const PALETTE = ['#FEC400', '#0D5CDB', '#FF384B', '#02CF70', '#7D00BC', '#fff']

type Shape =
  | 'sq' | 'circle' | 'tl' | 'tr' | 'bl' | 'br'
  | 'diamond' | 'semiT' | 'semiB' | 'qtl' | 'qbr'

function tile(size: number, color: string, shape: Shape, key: string) {
  const base: React.CSSProperties = { width: size, height: size, flex: 'none', position: 'relative', background: 'transparent' }
  const fill = (extra: React.CSSProperties) => (
    <div key={key} style={{ ...base }}>
      <div style={{ position: 'absolute', inset: 0, background: color, ...extra }} />
    </div>
  )
  switch (shape) {
    case 'sq': return fill({})
    case 'circle': return fill({ borderRadius: '50%' })
    case 'tl': return fill({ clipPath: 'polygon(0 0,100% 0,0 100%)' })
    case 'tr': return fill({ clipPath: 'polygon(0 0,100% 0,100% 100%)' })
    case 'bl': return fill({ clipPath: 'polygon(0 0,0 100%,100% 100%)' })
    case 'br': return fill({ clipPath: 'polygon(100% 0,100% 100%,0 100%)' })
    case 'diamond': return fill({ clipPath: 'polygon(50% 0,100% 50%,50% 100%,0 50%)' })
    case 'semiT': return fill({ borderRadius: '100% 100% 0 0' })
    case 'semiB': return fill({ borderRadius: '0 0 100% 100%' })
    case 'qtl': return fill({ borderRadius: '100% 0 0 0' })
    case 'qbr': return fill({ borderRadius: '0 0 100% 0' })
    default: return fill({})
  }
}

const SHAPES: Shape[] = ['tl', 'circle', 'tr', 'sq', 'diamond', 'semiB', 'bl', 'qtl', 'br', 'semiT', 'circle', 'qbr', 'sq', 'tr', 'diamond', 'bl']

function bandRow(size: number, n: number, ph: number) {
  const tiles = []
  for (let i = 0; i < n; i++) {
    const c = PALETTE[(i * 3 + ph) % PALETTE.length]
    const s = SHAPES[(i * 5 + ph) % SHAPES.length]
    tiles.push(tile(size, c, s, 't' + ph + '_' + i))
  }
  return tiles
}

export function marqueeBand(size: number, dur: number, ph: number) {
  const n = Math.ceil(1600 / size)
  const row = () => <div style={{ display: 'flex' }}>{bandRow(size, n, ph)}</div>
  return (
    <div style={{ width: '100%', overflow: 'hidden', display: 'flex' }}>
      <div style={{ display: 'flex', animation: `cdj-marquee ${dur}s linear infinite`, willChange: 'transform' }}>
        {row()}{row()}
      </div>
    </div>
  )
}

type ShapeKind = 'circle' | 'diamond' | 'tri' | 'tl' | 'semi' | 'ring' | 'sq'
interface ShapeOpts {
  size: number; color: string; kind: ShapeKind
  top?: string; left?: string; right?: string; bottom?: string
  anim?: string; dur?: number; delay?: number; rot?: number; op?: number; key: string; blur?: number; mark?: string
}

export function shape(opts: ShapeOpts) {
  const { size, color, kind, top, left, right, bottom, anim, dur, delay, rot, op, key, blur, mark } = opts
  const s: React.CSSProperties = {
    position: 'absolute', width: size, height: size, top, left, right, bottom, opacity: op == null ? 1 : op,
    animation: anim ? `${anim} ${dur || 9}s ease-in-out infinite` : undefined, animationDelay: (delay || 0) + 's',
    transform: rot ? `rotate(${rot}deg)` : undefined, filter: blur ? `blur(${blur}px)` : undefined, background: color,
  }
  if (kind === 'circle') s.borderRadius = '50%'
  else if (kind === 'diamond') s.clipPath = 'polygon(50% 0,100% 50%,50% 100%,0 50%)'
  else if (kind === 'tri') s.clipPath = 'polygon(50% 0,100% 100%,0 100%)'
  else if (kind === 'tl') s.clipPath = 'polygon(0 0,100% 0,0 100%)'
  else if (kind === 'semi') s.borderRadius = '100% 100% 0 0'
  else if (kind === 'ring') { s.background = 'transparent'; s.border = `${Math.max(4, size / 9)}px solid ${color}`; s.borderRadius = '50%' }
  return <div key={key} data-shape={mark} style={s} />
}

const shapeLayer = (children: React.ReactNode) => (
  <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }}>{children}</div>
)

export const HeroShapes = () => shapeLayer(<>
  {shape({ key: 'h1', size: 120, color: '#FEC400', kind: 'ring', top: '16%', left: '8%', anim: 'cdj-float1', dur: 11, op: .5 })}
  {shape({ key: 'h2', size: 54, color: '#FF384B', kind: 'diamond', top: '24%', right: '12%', anim: 'cdj-float2', dur: 9, op: .8 })}
  {shape({ key: 'h3', size: 30, color: '#02CF70', kind: 'circle', top: '62%', left: '16%', anim: 'cdj-float1', dur: 8, delay: 1, op: .9 })}
  {shape({ key: 'h4', size: 70, color: '#0D5CDB', kind: 'tri', top: '68%', right: '10%', anim: 'cdj-float2', dur: 12, op: .5 })}
  {shape({ key: 'h5', size: 22, color: '#7D00BC', kind: 'circle', top: '40%', left: '6%', anim: 'cdj-float1', dur: 7, delay: .5 })}
  <div key="hcb" style={{ position: 'absolute', top: '30%', left: '13%', fontFamily: "'Roboto',sans-serif", fontWeight: 900, fontSize: 54, color: '#FEC400', opacity: .85, animation: 'cdj-float2 10s ease-in-out infinite' }}>&lt;/&gt;</div>
</>)

export const ManifestoShapes = () => shapeLayer(<>
  {shape({ key: 'm1', mark: 'm1', size: 46, color: '#FF384B', kind: 'diamond', top: '14%', left: '9%', anim: 'cdj-float1', dur: 9, op: .9 })}
  {shape({ key: 'm2', mark: 'm2', size: 34, color: '#0D5CDB', kind: 'circle', top: '20%', right: '12%', anim: 'cdj-float2', dur: 8, op: .85 })}
  {shape({ key: 'm3', mark: 'm3', size: 54, color: '#FEC400', kind: 'tri', bottom: '14%', right: '16%', anim: 'cdj-float1', dur: 11, op: .9 })}
  {shape({ key: 'm4', mark: 'm4', size: 30, color: '#02CF70', kind: 'circle', bottom: '22%', left: '14%', anim: 'cdj-float2', dur: 7, op: .9 })}
  {shape({ key: 'm5', mark: 'm5', size: 60, color: '#7D00BC', kind: 'ring', top: '50%', left: '5%', anim: 'cdj-float1', dur: 10, op: .5 })}
</>)

export const GalleryShapes = () => shapeLayer(<>
  {shape({ key: 'g1', size: 210, color: '#7D00BC', kind: 'circle', bottom: '-8%', left: '-5%', op: .16, blur: 36 })}
  {shape({ key: 'g2', size: 44, color: '#FEC400', kind: 'ring', top: '12%', right: '7%', anim: 'cdj-float1', dur: 10, op: .5 })}
  {shape({ key: 'g3', size: 30, color: '#02CF70', kind: 'diamond', bottom: '16%', right: '12%', anim: 'cdj-float2', dur: 8, op: .7 })}
</>)

export const SponsorShapes = () => shapeLayer(
  shape({ key: 's2', size: 40, color: '#FEC400', kind: 'diamond', bottom: '16%', left: '8%', anim: 'cdj-float1', dur: 9, op: .7 }),
)

export const NotifyShapes = () => shapeLayer(<>
  {shape({ key: 'n1', size: 80, color: '#FEC400', kind: 'ring', top: '18%', left: '12%', anim: 'cdj-float1', dur: 10, op: .5 })}
  {shape({ key: 'n2', size: 44, color: '#FF384B', kind: 'diamond', bottom: '22%', right: '14%', anim: 'cdj-float2', dur: 8, op: .8 })}
  {shape({ key: 'n3', size: 26, color: '#02CF70', kind: 'circle', top: '60%', left: '18%', anim: 'cdj-float1', dur: 7, op: .9 })}
</>)

// Speakers section: three track columns, each with 4 placeholder cards ("to be revealed").
export function SpeakerCards() {
  const tracks = [
    { name: 'Core Java', a: '#FF384B', desc: "A deep dive into modern Java language features, the JVM, performance and what's next." },
    { name: 'Enterprise & Cloud', a: '#0D5CDB', desc: 'Building resilient, cloud-native enterprise systems with Java, Spring and modern deployment and scaling practices.' },
    { name: 'Workshops', a: '#02CF70', desc: 'A hands-on, code-first lab session with practical takeaways you can apply the very next day.' },
  ]
  const icon = () => (
    <svg width={42} height={42} viewBox="0 0 24 24" fill="#fff" aria-hidden="true">
      <circle cx={12} cy={8} r={4} />
      <path d="M12 13.4c-4.2 0-7.6 3.1-7.6 7 0 .3.3.6.6.6h14c.3 0 .6-.3.6-.6 0-3.9-3.4-7-7.6-7z" />
    </svg>
  )
  const card = (t: typeof tracks[0], key: string) => (
    <div key={key} style={{ position: 'relative', borderRadius: 20, overflow: 'hidden', background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.09)' }}>
      <div style={{ position: 'relative', height: 150, background: `linear-gradient(150deg, ${t.a}, ${t.a}99)`, overflow: 'hidden', display: 'grid', placeItems: 'center' }}>
        <div style={{ position: 'absolute', top: -18, right: -18, width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,.16)' }} />
        <div style={{ position: 'absolute', bottom: -16, left: -16, width: 70, height: 70, background: 'rgba(0,0,0,.12)', clipPath: 'polygon(0 0,100% 100%,0 100%)' }} />
        <div style={{ width: 74, height: 74, borderRadius: '50%', border: '3px dashed rgba(255,255,255,.7)', display: 'grid', placeItems: 'center' }}>{icon()}</div>
      </div>
      <div style={{ padding: '18px 20px' }}>
        <div style={{ fontWeight: 800, fontSize: 17, color: '#fff' }}>To be revealed</div>
        <div style={{ fontSize: 16, color: '#fff', fontWeight: 500, marginTop: 6 }}>Talk title coming soon</div>
        <div style={{ fontSize: 16, color: '#a8b0e0', marginTop: 10, lineHeight: 1.5 }}>{t.desc}</div>
      </div>
    </div>
  )
  return (
    <>
      {tracks.map((t, ti) => (
        <div key={'trk' + ti} data-reveal data-reveal-d={String(ti * 60)}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
            <span style={{ width: 13, height: 13, borderRadius: 4, background: t.a, flex: 'none' }} />
            <h3 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: '#fff', letterSpacing: '.5px' }}>{t.name}</h3>
            <span style={{ flex: 1, height: 1, background: 'rgba(255,255,255,.12)' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0px, 1fr))', gap: 18 }}>
            {[0, 1, 2, 3].map((i) => card(t, 'c' + ti + '_' + i))}
          </div>
        </div>
      ))}
    </>
  )
}

export function Ticker() {
  const items = ['ONE DAY', '600+ INNOVATORS', 'THE FUTURE OF JAVA', '3 PARALLEL TRACKS', '11 SESSIONS', '12+ SPEAKERS', 'HANDS-ON LABS', 'AHMEDABAD 2026']
  const seq: React.ReactNode[] = []
  items.concat(items).forEach((t, i) => {
    seq.push(<span key={'ti' + i} style={{ fontWeight: 900, fontSize: 18, letterSpacing: '-.5px', textTransform: 'uppercase' }}>{t}</span>)
    seq.push(<span key={'td' + i} style={{ fontFamily: "'Roboto',sans-serif", fontWeight: 700, fontSize: 18, margin: '0 4px' }}>✦</span>)
  })
  return <div style={{ display: 'flex', whiteSpace: 'nowrap', gap: 24, alignItems: 'center', animation: 'cdj-marquee 30s linear infinite', willChange: 'transform', width: 'max-content' }}>{seq}</div>
}
