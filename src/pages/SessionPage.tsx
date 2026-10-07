import { DAYS, SESSIONS, VENUE, sessionsOnDay, speakerPath, speakersOf, type Session } from '../data/program'
import { DayChip, DayIcon, SessionCard, SpeakerAvatar, TagList, TicketBand } from '../components/program/parts'
import TicketsCta from '../components/TicketsCta'
import PageShell, { Crumbs } from './PageShell'

const label: React.CSSProperties = { color: '#FEC400', fontSize: '13px', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase' }
const panel: React.CSSProperties = { padding: '28px', borderRadius: '20px', background: 'rgba(255,255,255,.07)', border: '1px solid rgba(255,255,255,.13)' }

/** /agenda/<session>/ — the page ticket-buyers land on: outcome first, speaker second. */
export default function SessionPage({ session }: { session: Session }) {
  const day = DAYS[session.day]
  const venue = VENUE[session.day]
  const people = speakersOf(session)
  const sameDay = sessionsOnDay(session.day).filter((s) => s.id !== session.id)
  const otherDay = SESSIONS.filter((s) => s.day !== session.day)
  const related = [...sameDay, ...otherDay].slice(0, 3)

  return (
    <PageShell>
      <Crumbs items={[['Home', '/'], ['Agenda', '/agenda/'], [session.title]]} />

      {/* Hero panel — tinted with the day's accent so the day is felt, not just labelled. */}
      <div data-reveal style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(24px,4vw,44px)', borderRadius: '26px', background: `linear-gradient(135deg, ${day.accent}2e, rgba(255,255,255,.04) 60%)`, border: `1px solid ${day.accent}88`, borderTop: `5px solid ${day.accent}` }}>
        <span aria-hidden="true" style={{ position: 'absolute', right: '-10px', top: '-14px', fontSize: 'clamp(90px,16vw,200px)', fontWeight: 800, letterSpacing: '-6px', lineHeight: 1, textTransform: 'uppercase', color: day.accent, opacity: 0.07, pointerEvents: 'none', userSelect: 'none' }}>{day.verb}</span>
        <div style={{ position: 'relative' }}>
          <DayChip day={session.day} kind={session.kind} />
          <h1 style={{ margin: '18px 0 14px', maxWidth: '900px', fontSize: 'clamp(28px,4.2vw,48px)', lineHeight: 1.12, letterSpacing: '-1px', color: '#fff', textTransform: 'none' }}>{session.title}</h1>
          <p style={{ margin: '0 0 22px', maxWidth: '760px', fontSize: 'clamp(17px,2vw,21px)', lineHeight: 1.5, fontWeight: 600, color: '#fff' }}>
            <span style={{ color: day.accent }}>You'll walk away able to: </span>{session.outcome[0].toLowerCase() + session.outcome.slice(1)}.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '18px 28px', alignItems: 'center', marginBottom: '26px', color: '#c4caf0', fontSize: '15px', fontWeight: 600 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}><DayIcon day={session.day} size={16} />{day.weekday}, {day.date}</span>
            <a href={venue.mapUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#FEC400', textDecoration: 'none' }}>{venue.short} ↗</a>
            <span>{day.format}</span>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px 24px', alignItems: 'center' }}>
            <TicketsCta style={{ display: 'inline-flex', alignItems: 'center', fontWeight: 500, textTransform: 'uppercase', fontSize: '15px', letterSpacing: '1px', padding: '16px 30px', borderRadius: '46px', boxShadow: '0 14px 36px rgba(255,56,75,.36)' }} />
            {people.map((p) => (
              <a key={p.id} href={speakerPath(p)} style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', color: '#fff', textDecoration: 'none' }}>
                <SpeakerAvatar speaker={p} size={46} />
                <span><span style={{ display: 'block', fontSize: '12px', color: '#9aa3d6' }}>Presented by</span><span style={{ display: 'block', fontWeight: 700, fontSize: '16px' }}>{p.name}</span></span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: '22px', marginTop: '28px', alignItems: 'start' }}>
        <div data-reveal style={panel}>
          <div style={label}>What you'll take away</div>
          <ul style={{ listStyle: 'none', margin: '16px 0 0', padding: 0, display: 'grid', gap: '14px' }}>
            {session.takeaways.map((t) => (
              <li key={t} style={{ display: 'flex', gap: '12px', color: '#e6e9ff', fontSize: '16.5px', lineHeight: 1.55 }}>
                <span aria-hidden="true" style={{ flex: 'none', width: '24px', height: '24px', marginTop: '1px', borderRadius: '50%', background: day.accent, color: day.onAccent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 800 }}>✓</span>
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div data-reveal data-reveal-d="80" style={{ ...panel, display: 'grid', gap: '20px' }}>
          <div>
            <div style={label}>Who it's for</div>
            <p style={{ margin: '10px 0 0', color: '#d8dcf5', fontSize: '16px', lineHeight: 1.6 }}>{session.audience}</p>
          </div>
          {session.bring && (
            <div>
              <div style={{ ...label, color: day.accent }}>Before you come</div>
              <p style={{ margin: '10px 0 0', color: '#d8dcf5', fontSize: '16px', lineHeight: 1.6 }}>{session.bring}</p>
            </div>
          )}
          <div>
            <div style={label}>Topics</div>
            <div style={{ marginTop: '10px' }}><TagList tags={session.tags} max={8} /></div>
          </div>
          <a href={day.path} style={{ color: day.accent, fontWeight: 800, fontSize: '14px', textDecoration: 'none' }}>All {day.label.toLowerCase()} sessions →</a>
        </div>
      </div>

      <div data-reveal style={{ ...panel, marginTop: '22px' }}>
        <div style={label}>About this session</div>
        <div style={{ marginTop: '14px', display: 'grid', gap: '14px', color: '#c4caf0', fontSize: '17px', lineHeight: 1.75 }}>
          {session.description.map((p, i) => <p key={i} style={{ margin: 0, whiteSpace: 'pre-line' }}>{p}</p>)}
        </div>
      </div>

      {people.map((p) => (
        <div key={p.id} data-reveal style={{ ...panel, marginTop: '22px', display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'center' }}>
          <a href={speakerPath(p)} style={{ flex: 'none', width: '120px', height: '120px', borderRadius: '22px', overflow: 'hidden', background: p.bg, display: 'block' }}>
            <img src={p.image} alt={p.name} loading="lazy" style={{ display: 'block', width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center bottom' }} />
          </a>
          <div style={{ flex: '1 1 320px', minWidth: 0 }}>
            <div style={label}>Your speaker</div>
            <h2 style={{ margin: '6px 0 4px', fontSize: '26px', color: '#fff', textTransform: 'none' }}>{p.name}</h2>
            <p style={{ margin: '0 0 10px', color: '#ffe27a', fontWeight: 600, fontSize: '15px' }}>{p.role}</p>
            <p style={{ margin: '0 0 12px', color: '#c4caf0', fontSize: '15.5px', lineHeight: 1.65 }}>{p.bio[0]}</p>
            <a href={speakerPath(p)} style={{ color: '#FEC400', fontWeight: 800, fontSize: '14px', textDecoration: 'none' }}>Full profile →</a>
          </div>
        </div>
      ))}

      <div style={{ margin: '56px 0 26px' }}>
        <h2 style={{ margin: '0 0 8px', fontSize: 'clamp(24px,3.2vw,34px)', color: '#fff', textTransform: 'none' }}>More to explore</h2>
        <p style={{ margin: 0, color: '#9aa3d6', fontSize: '15px' }}>Two days, one community. <a href="/agenda/" style={{ color: '#FEC400', fontWeight: 700, textDecoration: 'none' }}>See the full agenda →</a></p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '20px', marginBottom: '48px' }}>
        {related.map((s) => <SessionCard key={s.id} session={s} />)}
      </div>

      <TicketBand workshop={session.day === 'workshop'} />
    </PageShell>
  )
}
