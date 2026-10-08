import {
  DAYS, SCHEDULE, fmtTime, minutesBetween, sessionPath, sessionsOnDay, speakersOf,
  type DayId, type ScheduleItem,
} from '../../data/program'
import { DayIcon, SpeakerAvatar } from './parts'

const uc: React.CSSProperties = { textTransform: 'none' }

const RAIL: Record<ScheduleItem['kind'], string> = {
  checkin: 'rgba(255,255,255,.28)',
  break: 'rgba(255,255,255,.28)',
  ceremony: '#FEC400',
  social: '#FEC400',
  session: '',
}

function TimeCol({ item, accent }: { item: ScheduleItem; accent: string }) {
  return (
    <div style={{ flex: '0 0 138px', paddingTop: '2px' }}>
      <div style={{ fontSize: '15px', fontWeight: 800, color: '#fff', whiteSpace: 'nowrap' }}>{fmtTime(item.start)}</div>
      <div style={{ marginTop: '2px', fontSize: '12px', fontWeight: 600, color: accent === '' ? '#8890c8' : accent }}>
        to {fmtTime(item.end)} · {minutesBetween(item.start, item.end)} min
      </div>
    </div>
  )
}

/** One day's running order: session slots link to their page, everything else stays slim. */
export function Timetable({ day }: { day: DayId }) {
  const d = DAYS[day]
  const items = SCHEDULE[day]
  const sessions = new Map(sessionsOnDay(day).map((s) => [s.id, s]))

  return (
    <ol aria-label={`${d.label} timetable, ${d.date}`} style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: '12px' }}>
      {items.map((item) => {
        const session = item.sessionId ? sessions.get(item.sessionId) : undefined

        if (session) {
          const people = speakersOf(session)
          return (
            <li key={item.start + item.title} style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 22px', alignItems: 'flex-start' }}>
              <TimeCol item={item} accent={d.accent} />
              <a href={sessionPath(session)} style={{ flex: '1 1 260px', minWidth: 0, display: 'block', padding: '18px 20px', borderRadius: '16px', textDecoration: 'none', color: '#fff', background: 'linear-gradient(160deg, rgba(255,255,255,.1), rgba(255,255,255,.04))', border: '1px solid rgba(255,255,255,.15)', borderLeft: `5px solid ${d.accent}`, boxShadow: '0 10px 26px rgba(0,0,0,.2)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '7px', color: d.accent, fontSize: '11px', fontWeight: 800, letterSpacing: '1.2px', textTransform: 'uppercase' }}>
                  <DayIcon day={day} size={14} />{item.title === 'Talk' ? session.kind : item.title}
                </div>
                <h3 style={{ ...uc, margin: '8px 0 6px', fontSize: '19px', lineHeight: 1.3, fontWeight: 700, color: '#fff' }}>{session.title}</h3>
                <p style={{ margin: '0 0 12px', fontSize: '13.5px', lineHeight: 1.5, color: '#9aa3d6' }}>{session.outcome}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px' }}>
                  <span style={{ display: 'inline-flex' }}>{people.map((p, i) => <span key={p.id} style={{ marginLeft: i ? '-10px' : 0 }}><SpeakerAvatar speaker={p} size={30} /></span>)}</span>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#c4caf0', flex: 1, minWidth: 0 }}>{people.map((p) => p.name).join(' & ')}</span>
                  <span aria-hidden="true" style={{ color: d.accent, fontWeight: 800, fontSize: '13px' }}>Details →</span>
                </div>
              </a>
            </li>
          )
        }

        if (item.kind === 'session') {
          // Slot is reserved but the topic isn't confirmed yet.
          return (
            <li key={item.start + item.title} style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 22px', alignItems: 'flex-start' }}>
              <TimeCol item={item} accent={d.accent} />
              <div style={{ flex: '1 1 260px', minWidth: 0, padding: '16px 20px', borderRadius: '16px', border: `1.5px dashed ${d.accent}88`, background: `${d.accent}10` }}>
                <div style={{ color: d.accent, fontSize: '11px', fontWeight: 800, letterSpacing: '1.2px', textTransform: 'uppercase' }}>To be announced</div>
                <div style={{ marginTop: '6px', fontSize: '18px', fontWeight: 700, color: '#fff' }}>{item.title}</div>
                {item.note && <div style={{ marginTop: '4px', fontSize: '13.5px', color: '#9aa3d6' }}>{item.note}</div>}
              </div>
            </li>
          )
        }

        const rail = RAIL[item.kind]
        const emphasised = item.kind === 'ceremony' || item.kind === 'social'
        return (
          <li key={item.start + item.title} style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 22px', alignItems: 'center' }}>
            <TimeCol item={item} accent="" />
            <div style={{ flex: '1 1 260px', minWidth: 0, padding: '12px 18px', borderRadius: '12px', borderLeft: `4px solid ${rail}`, background: emphasised ? 'rgba(254,196,0,.08)' : 'rgba(255,255,255,.04)', color: emphasised ? '#ffe27a' : '#c4caf0', fontSize: '15.5px', fontWeight: emphasised ? 700 : 600 }}>
              {item.title}
            </div>
          </li>
        )
      })}
    </ol>
  )
}
