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

export function Ticker() {
  const items = ['ONE DAY', '600+ INNOVATORS', 'THE FUTURE OF JAVA', '3 PARALLEL TRACKS', '20+ SPEAKERS', 'HANDS-ON LABS', 'AHMEDABAD 2026']
  const seq: React.ReactNode[] = []
  items.concat(items).forEach((t, i) => {
    seq.push(<span key={'ti' + i} style={{ fontWeight: 900, fontSize: 18, letterSpacing: '-.5px', textTransform: 'uppercase' }}>{t}</span>)
    seq.push(<span key={'td' + i} style={{ fontFamily: "'Roboto',sans-serif", fontWeight: 700, fontSize: 18, margin: '0 4px' }}>✦</span>)
  })
  return <div style={{ display: 'flex', whiteSpace: 'nowrap', gap: 24, alignItems: 'center', animation: 'cdj-marquee 30s linear infinite', willChange: 'transform', width: 'max-content' }}>{seq}</div>
}
