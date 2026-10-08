import {
  DAYS, HOSTS, SCHEDULE, fmtTime, minutesBetween, sessionPath, sessionsOnDay, speakersOf,
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

type Glyph = 'ticket' | 'coffee' | 'megaphone' | 'utensils' | 'people' | 'flag' | 'star'

/** Line icons for the non-session slots (24px grid, drawn in the slot's own colour). */
const GLYPHS: Record<Glyph, React.ReactNode> = {
  ticket: <><path d="M3 9a2 2 0 0 0 0 6v3h18v-3a2 2 0 0 1 0-6V6H3v3z" /><path d="M13 6v12" strokeDasharray="2 2.4" /></>,
  coffee: <><path d="M4 9h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V9z" /><path d="M17 11h1.5a2.5 2.5 0 0 1 0 5H16" /><path d="M8 3v3M12 3v3" /></>,
  megaphone: <><path d="M3 11v3a1 1 0 0 0 1 1h2l8 4V6L6 10H4a1 1 0 0 0-1 1z" /><path d="M18 9a4 4 0 0 1 0 6" /></>,
  utensils: <><path d="M6 3v8M9 3v8M6 7h3M7.5 11v10" /><path d="M16 21V3c-2 1.5-3 4-3 7 0 1.5.8 2.5 3 2.5" /></>,
  people: <><circle cx="9" cy="8" r="3" /><path d="M3 20a6 6 0 0 1 12 0" /><circle cx="17" cy="9" r="2.4" /><path d="M16 14.2A5 5 0 0 1 21 19" /></>,
  flag: <><path d="M5 21V4" /><path d="M5 4h12l-2.5 4L17 12H5" /></>,
  star: <path d="M12 3l2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.6 6.6 19.5l1.2-6L3.3 9.3l6.1-.7L12 3z" />,
}

/** What each non-session slot is, in plain words (keyed by the slot title in SCHEDULE). */
const SLOT_INFO: Record<string, { glyph: Glyph; text: string }> = {
  // Workshop day
  'Check-in': { glyph: 'ticket', text: 'Pick up your badge at the registration desk and settle in before the day begins.' },
  'Opening note': { glyph: 'megaphone', text: 'The organisers welcome everyone, set the tone for the day and walk you through how it will run.' },
  'Lunch & networking': { glyph: 'utensils', text: 'A proper break to eat, recharge and talk with the speaker and other attendees.' },
  'Engagement activity': { glyph: 'people', text: 'A short, fun community activity to get everyone talking and a breather between sessions.' },
  'Closing note': { glyph: 'flag', text: 'Key takeaways from the day, thank-yous to the speakers, sponsors and volunteers, and what is next for the community.' },
  // Conference day
  'Registration, Networking & Breakfast': { glyph: 'ticket', text: 'Collect your badge at the registration desk, have breakfast and meet fellow Java developers before the day kicks off.' },
  'Pre-engagement Activities': { glyph: 'people', text: 'Quick ice-breakers to warm up the room and get everyone talking before the programme begins.' },
  'Welcome Note': { glyph: 'megaphone', text: 'The organisers open the day, share what is in store and walk you through how it will run.' },
  'Sponsors Session': { glyph: 'star', text: 'Hear from the sponsors who make the day possible: what they build and how they work with the Java community.' },
  'Lunch Break & Networking': { glyph: 'utensils', text: 'A proper break to eat, recharge and talk with the speakers and other attendees.' },
  'Live Jamming Session': { glyph: 'star', text: 'A lively, interactive session to recharge the room after lunch. Join in or simply enjoy the energy.' },
  'Engagement Activities': { glyph: 'people', text: 'A short, fun community activity to get everyone talking before the day wraps up.' },
  'Closing Note': { glyph: 'flag', text: 'Key takeaways from the day, thank-yous to the speakers, sponsors and volunteers, and what is next for the community.' },
  'Networking, Goodies & High Tea': { glyph: 'coffee', text: 'Wind down over high tea, keep the conversations going with speakers and peers, and pick up goodies on your way out.' },
}
const FALLBACK: Record<ScheduleItem['kind'], Glyph> = { checkin: 'ticket', break: 'coffee', ceremony: 'megaphone', social: 'people', session: 'flag' }

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

/** One day's running order: session slots link to their page, the rest get an icon and a one-line explanation. */
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
                  <span style={{ flex: 1, minWidth: 0 }}>
                    <span style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#c4caf0' }}>{people.map((p) => p.name).join(' & ')}</span>
                    <span style={{ display: 'block', marginTop: '2px', fontSize: '11.5px', fontWeight: 500, lineHeight: 1.35, color: '#8890c8' }}>{people.map((p) => p.role).join(' · ')}</span>
                    {people.map((p) => <span key={p.id} style={{ display: 'block', marginTop: '5px', fontSize: '12px', fontWeight: 500, lineHeight: 1.45, color: '#b6bde6' }}>{p.tagline}</span>)}
                  </span>
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
        const info = SLOT_INFO[item.title]
        const emphasised = item.kind === 'ceremony' || item.kind === 'social'
        return (
          <li key={item.start + item.title} style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 22px', alignItems: 'center' }}>
            <TimeCol item={item} accent="" />
            <div style={{ flex: '1 1 260px', minWidth: 0, display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 18px', borderRadius: '14px', borderLeft: `4px solid ${rail}`, background: emphasised ? 'rgba(254,196,0,.08)' : 'rgba(255,255,255,.04)' }}>
              <span aria-hidden="true" style={{ flex: 'none', width: '42px', height: '42px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: emphasised ? 'rgba(254,196,0,.16)' : 'rgba(255,255,255,.08)', color: emphasised ? '#FEC400' : '#c4caf0' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{GLYPHS[info?.glyph ?? FALLBACK[item.kind]]}</svg>
              </span>
              <span style={{ minWidth: 0 }}>
                <span style={{ display: 'block', color: emphasised ? '#ffe27a' : '#fff', fontSize: '16px', fontWeight: 700, lineHeight: 1.3 }}>{item.title}</span>
                {info && <span style={{ display: 'block', marginTop: '3px', color: '#9aa3d6', fontSize: '13.5px', lineHeight: 1.5 }}>{info.text}</span>}
                {item.hosts && (
                  <span style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px 14px', marginTop: '10px' }}>
                    {item.hosts.map((key) => HOSTS[key]).filter(Boolean).map((p) => (
                      <a key={p.name} href={p.linkedin} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
                        <span style={{ flex: 'none', width: '30px', height: '30px', borderRadius: '50%', overflow: 'hidden', border: '2px solid rgba(255,255,255,.25)', display: 'inline-block' }}>
                          <img src={p.image} alt="" loading="lazy" style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 18%' }} />
                        </span>
                        <span style={{ fontSize: '13px', fontWeight: 600, color: '#c4caf0' }}>{p.name}</span>
                      </a>
                    ))}
                  </span>
                )}
              </span>
            </div>
          </li>
        )
      })}
    </ol>
  )
}
