import type { CSSProperties } from 'react'
import TicketsCta from '../TicketsCta'
import {
  DAYS, sessionPath, speakersOf,
  type Day, type DayId, type Session, type Speaker,
} from '../../data/program'

/*
 * Shared pieces for the programme pages and the home-page strips.
 *
 * One visual system, two "child events": every card, chip and banner shares the navy
 * shell, and only the day marker changes — green + "Build" for the 17 Oct workshop,
 * red + "Learn" for the 24 Oct conference. Keep that rule when adding anything here:
 * never introduce a third colour for a day.
 */

const uc: CSSProperties = { textTransform: 'none' }

/** Hammer-ish "</>" for the workshop, a microphone for the conference. Inline so SSR needs no asset URLs. */
export function DayIcon({ day, size = 16 }: { day: DayId; size?: number }) {
  return day === 'workshop' ? (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" />
    </svg>
  ) : (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="9" y="2" width="6" height="12" rx="3" />
      <path d="M5 11a7 7 0 0014 0M12 18v4M8 22h8" />
    </svg>
  )
}

/** Filled pill: "[icon] WORKSHOP · 17 OCT". The one place a day is named. */
export function DayChip({ day, kind, style }: { day: DayId; kind?: string; style?: CSSProperties }) {
  const d = DAYS[day]
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', padding: '6px 12px', borderRadius: '30px', background: d.accent, color: d.onAccent, fontSize: '11px', fontWeight: 800, letterSpacing: '1.2px', textTransform: 'uppercase', whiteSpace: 'nowrap', ...style }}>
      <DayIcon day={day} size={14} />
      {d.label} · {d.date.replace(' 2026', '')}
      {kind && kind !== d.label && <span style={{ opacity: 0.75, fontWeight: 700 }}>· {kind}</span>}
    </span>
  )
}

export function SpeakerAvatar({ speaker, size = 40 }: { speaker: Speaker; size?: number }) {
  return (
    <span style={{ flex: 'none', width: size, height: size, borderRadius: '50%', overflow: 'hidden', background: speaker.bg, display: 'inline-block', border: '2px solid rgba(255,255,255,.25)' }}>
      <img src={speaker.image} alt="" loading="lazy" style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
    </span>
  )
}

export function TagList({ tags, max = 4 }: { tags: string[]; max?: number }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
      {tags.slice(0, max).map((t) => (
        <span key={t} style={{ padding: '4px 10px', borderRadius: '20px', border: '1px solid rgba(255,255,255,.18)', color: '#c4caf0', fontSize: '11.5px', fontWeight: 600 }}>{t}</span>
      ))}
    </div>
  )
}

/**
 * A session, topic first. The outcome the attendee walks away with is the headline, the
 * real talk title sits under it, and the speaker is deliberately a small supporting line.
 */
export function SessionCard({ session, hideDay = false }: { session: Session; hideDay?: boolean }) {
  const day = DAYS[session.day]
  const people = speakersOf(session)
  return (
    <a
      href={sessionPath(session)}
      style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '14px', height: '100%', padding: '24px 24px 20px', borderRadius: '20px', overflow: 'hidden', color: '#fff', textDecoration: 'none', background: `linear-gradient(160deg, rgba(255,255,255,.09), rgba(255,255,255,.03))`, border: '1px solid rgba(255,255,255,.14)', borderTop: `4px solid ${day.accent}`, boxShadow: '0 14px 34px rgba(0,0,0,.25)', transition: 'transform .25s ease, box-shadow .25s ease, border-color .25s ease' }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = `0 22px 44px rgba(0,0,0,.35), 0 0 0 1px ${day.accent}66` }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 14px 34px rgba(0,0,0,.25)' }}
    >
      {/* Oversized faint verb: a texture cue for which day this belongs to. */}
      <span aria-hidden="true" style={{ position: 'absolute', right: '-6px', bottom: '-18px', fontSize: '84px', fontWeight: 800, letterSpacing: '-3px', lineHeight: 1, textTransform: 'uppercase', color: day.accent, opacity: 0.08, pointerEvents: 'none', userSelect: 'none' }}>{day.verb}</span>

      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px' }}>
        {hideDay
          ? <span style={{ color: day.accent, fontSize: '11px', fontWeight: 800, letterSpacing: '1.2px', textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', gap: '7px' }}><DayIcon day={session.day} size={14} />{session.kind}</span>
          : <DayChip day={session.day} kind={session.kind} />}
      </div>

      <h3 style={{ ...uc, margin: 0, fontSize: '20px', lineHeight: 1.28, fontWeight: 700, color: '#fff', letterSpacing: '-.2px' }}>{session.title}</h3>
      <p style={{ margin: 0, fontSize: '13.5px', lineHeight: 1.5, color: '#9aa3d6' }}>{session.outcome}</p>

      <TagList tags={session.tags} max={3} />

      <div style={{ marginTop: 'auto', paddingTop: '6px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ display: 'inline-flex' }}>
          {people.map((p, i) => <span key={p.id} style={{ marginLeft: i ? '-10px' : 0 }}><SpeakerAvatar speaker={p} size={34} /></span>)}
        </span>
        <span style={{ fontSize: '13px', fontWeight: 600, color: '#c4caf0', minWidth: 0, flex: 1 }}>{people.map((p) => p.name).join(' & ')}</span>
        <span aria-hidden="true" style={{ color: day.accent, fontWeight: 800, fontSize: '13px', whiteSpace: 'nowrap' }}>Details →</span>
      </div>
    </a>
  )
}

/** The two-days explainer: same shape, two accents. Each block links to its filtered agenda. */
export function DayLegend() {
  const order: DayId[] = ['workshop', 'conference']
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '16px' }}>
      {order.map((id) => {
        const d: Day = DAYS[id]
        return (
          <a key={id} href={d.path} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', padding: '20px 22px', borderRadius: '18px', textDecoration: 'none', color: '#fff', background: `linear-gradient(120deg, ${d.accent}26, rgba(255,255,255,.04))`, border: `1px solid ${d.accent}66` }}>
            <span style={{ flex: 'none', width: '46px', height: '46px', borderRadius: '14px', background: d.accent, color: d.onAccent, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><DayIcon day={id} size={22} /></span>
            <span style={{ display: 'block' }}>
              <span style={{ display: 'block', fontSize: '11px', fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase', color: d.accent }}>{d.verb} · {d.format}</span>
              <span style={{ display: 'block', margin: '3px 0 6px', fontSize: '19px', fontWeight: 700 }}>{d.label} · {d.date}</span>
              <span style={{ display: 'block', fontSize: '13.5px', lineHeight: 1.5, color: '#c4caf0' }}>{d.blurb}</span>
            </span>
          </a>
        )
      })}
    </div>
  )
}

/** Closing conversion band. `workshop` swaps in the ticket that actually covers the workshop. */
export function TicketBand({ workshop = false }: { workshop?: boolean }) {
  return (
    <div style={{ padding: '34px 30px', borderRadius: '24px', textAlign: 'center', background: 'linear-gradient(135deg, rgba(255,56,75,.2), rgba(255,255,255,.05))', border: '1px solid rgba(255,56,75,.45)' }}>
      <h2 style={{ ...uc, margin: '0 0 10px', fontSize: 'clamp(24px,3.4vw,36px)', lineHeight: 1.15, fontWeight: 700, color: '#fff' }}>
        {workshop ? 'Build it with us on 17 Oct' : 'Take these sessions back to your team'}
      </h2>
      <p style={{ margin: '0 auto 22px', maxWidth: '560px', fontSize: '16px', lineHeight: 1.6, color: '#c4caf0' }}>
        {workshop
          ? 'The workshop is included from the Regular + Workshop Pass up, and every pass includes the conference talks on 24 Oct.'
          : 'Every pass includes the conference talks. Add the hands-on workshop on 17 Oct with the Regular + Workshop Pass or above.'}
      </p>
      <TicketsCta style={{ display: 'inline-flex', alignItems: 'center', fontWeight: 700, textTransform: 'uppercase', fontSize: '15px', letterSpacing: '1px', padding: '16px 34px', borderRadius: '46px', boxShadow: '0 14px 36px rgba(255,56,75,.36)' }} />
    </div>
  )
}
