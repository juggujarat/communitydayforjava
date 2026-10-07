import { DAYS, type DayId } from '../../data/program'

/*
 * "Revealed soon" placeholders for speaker slots that aren't confirmed yet. Instead of a
 * blank box: a softly blurred silhouette under a passing light sweep (like a stage
 * spotlight), name placeholders that shimmer, and a pulsing "To be announced soon" pill.
 * Reuses the global cdj-shine / cdj-pulse keyframes.
 */

/** Fills its (positioned) parent — the parent decides the size (square on home, 230px on /speakers/). */
export function MysteryPortrait({ day }: { day: DayId }) {
  const accent = DAYS[day].accent
  return (
    <div aria-hidden="true" style={{ position: 'absolute', inset: 0, overflow: 'hidden', borderRadius: 'inherit', background: `radial-gradient(circle at 50% 28%, ${accent}40, ${accent}0f 68%), rgba(255,255,255,.05)`, border: `1px solid ${accent}55` }}>
      {/* head-and-shoulders silhouette, deliberately out of focus */}
      <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMax meet" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', filter: 'blur(2.5px)' }}>
        <circle cx="50" cy="36" r="15" fill={accent} opacity=".42" />
        <path d="M18 100c0-19 14-31 32-31s32 12 32 31z" fill={accent} opacity=".34" />
      </svg>
      {/* light sweep */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(110deg, transparent 32%, rgba(255,255,255,.22) 50%, transparent 68%)', backgroundSize: '220% 100%', animation: 'cdj-shine 3.4s linear infinite' }} />
      {/* status pill */}
      <div style={{ position: 'absolute', left: '50%', bottom: '12px', transform: 'translateX(-50%)', display: 'inline-flex', alignItems: 'center', gap: '7px', padding: '6px 12px', borderRadius: '30px', background: 'rgba(14,22,103,.72)', border: `1px solid ${accent}88`, color: '#fff', fontSize: '10.5px', fontWeight: 800, letterSpacing: '.8px', textTransform: 'uppercase', whiteSpace: 'nowrap', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)' }}>
        <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: accent, animation: 'cdj-pulse 1.6s ease-in-out infinite' }} />
        To be announced soon
      </div>
    </div>
  )
}

/** Where the name will go: two shimmering bars, like a name waiting to be revealed. */
export function RedactedName() {
  const bar = (w: string): React.CSSProperties => ({ height: '13px', width: w, borderRadius: '7px', background: 'linear-gradient(100deg, rgba(255,255,255,.12) 30%, rgba(255,255,255,.3) 50%, rgba(255,255,255,.12) 70%)', backgroundSize: '220% 100%', animation: 'cdj-shine 2.6s linear infinite' })
  return (
    <div aria-label="Speaker to be announced soon" role="img" style={{ display: 'grid', gap: '7px', padding: '3px 0' }}>
      <span style={bar('68%')} />
      <span style={bar('42%')} />
    </div>
  )
}
