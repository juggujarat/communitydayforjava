import { DAYS, DAY_ORDER, SCHEDULE, VENUE, sessionsOnDay, type DayId } from '../data/program'
import { DayChip, DayIcon, SessionCard } from './program/parts'
import TicketsCta from './TicketsCta'

/** Placeholder for a session slot whose speaker/topic isn't confirmed yet (same footprint as SessionCard). */
function TbaCard({ day, title }: { day: DayId; title: string }) {
  const d = DAYS[day]
  return (
    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '14px', height: '100%', minHeight: '190px', padding: '24px', borderRadius: '20px', overflow: 'hidden', background: `${d.accent}0f`, border: `1.5px dashed ${d.accent}99` }}>
      <span aria-hidden="true" style={{ position: 'absolute', right: '-6px', bottom: '-18px', fontSize: '84px', fontWeight: 800, letterSpacing: '-3px', lineHeight: 1, textTransform: 'uppercase', color: d.accent, opacity: 0.07, pointerEvents: 'none', userSelect: 'none' }}>{d.verb}</span>
      <div><DayChip day={day} kind={title.startsWith('Keynote') ? 'Keynote' : 'Session'} /></div>
      <h3 style={{ margin: 0, fontSize: '20px', lineHeight: 1.28, fontWeight: 700, color: '#fff', letterSpacing: '-.2px', textTransform: 'none' }}>{title}</h3>
      <p style={{ margin: 'auto 0 0', fontSize: '15px', fontWeight: 700, color: d.accent }}>To be announced soon</p>
    </div>
  )
}

/**
 * Home-page agenda strip (#agenda): the sessions, topic first. The workshop and the
 * conference are different days at different venues, so they are shown as two separate
 * groups — each with its own date + venue header — never mixed in one grid. A glance only:
 * every card, and the links below, go to /agenda/. Card/day styling lives in
 * components/program/parts.tsx so the home page and the standalone pages can't drift apart.
 */
export default function Agenda() {
  const sessions = { workshop: new Map(sessionsOnDay('workshop').map((s) => [s.id, s])), conference: new Map(sessionsOnDay('conference').map((s) => [s.id, s])) }
  return (
    <section id="agenda" style={{ position: 'relative', padding: '66px 40px', background: '#F4F1E8', color: '#0E1667', overflow: 'hidden' }}>
      <div style={{ position: 'relative', zIndex: 3, maxWidth: '1180px', margin: '0 auto' }}>
        <div data-reveal style={{ textAlign: 'center', marginBottom: '44px' }}>
          <h2 style={{ margin: 0, fontWeight: 700, fontSize: 'clamp(30px,4.8vw,58px)', lineHeight: 1.02, letterSpacing: '-1.5px' }}>
            What you'll <span style={{ color: '#FF384B' }}>take back</span> to your team
          </h2>
        </div>

        <div style={{ padding: 'clamp(18px,3vw,32px)', borderRadius: '30px', background: 'radial-gradient(120% 100% at 80% 0%,#1a2670,#0E1667 72%)', boxShadow: '0 24px 60px rgba(14,22,103,.25)' }}>
          {DAY_ORDER.map((id, i) => {
            const d = DAYS[id]
            const v = VENUE[id]
            return (
              <div key={id} id={`agenda-${id}`} style={{ marginTop: i ? '44px' : 0, paddingTop: i ? '40px' : 0, borderTop: i ? '1px solid rgba(255,255,255,.14)' : 'none' }}>
                {/* Day header: which day, which date, which venue. */}
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '16px 20px', padding: '18px 22px', marginBottom: '22px', borderRadius: '18px', background: `linear-gradient(120deg, ${d.accent}33, rgba(255,255,255,.03))`, border: `1px solid ${d.accent}77` }}>
                  <span style={{ flex: 'none', width: '52px', height: '52px', borderRadius: '15px', background: d.accent, color: d.onAccent, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><DayIcon day={id} size={26} /></span>
                  <div style={{ flex: '1 1 300px', minWidth: 0 }}>
                    <div style={{ color: d.accent, fontSize: '11px', fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase' }}>{d.label} · {d.format}</div>
                    <h3 style={{ margin: '3px 0 6px', fontSize: 'clamp(20px,2.6vw,28px)', lineHeight: 1.15, color: '#fff', textTransform: 'none' }}>{d.weekday}, {d.date}</h3>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '7px', color: '#c4caf0', fontSize: '14.5px', lineHeight: 1.45, fontWeight: 600 }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flex: 'none', marginTop: '2px' }}><path d="M12 22s7-6.2 7-12a7 7 0 10-14 0c0 5.8 7 12 7 12z" /><circle cx="12" cy="10" r="2.5" /></svg>
                      <span>{v.name}, {v.city}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px 18px' }}>
                    <a href={`/agenda/#venue-${id}`} style={{ color: d.accent, fontSize: '13px', fontWeight: 800, textDecoration: 'none' }}>Venue &amp; map →</a>
                    <a href={`/agenda/#${id}`} style={{ color: d.accent, fontSize: '13px', fontWeight: 800, textDecoration: 'none' }}>Full {d.label.toLowerCase()} timetable →</a>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 330px), 1fr))', gap: '20px' }}>
                  {/* Follows the running order: confirmed talks as cards, open slots as "to be announced soon". */}
                  {SCHEDULE[id].filter((slot) => slot.kind === 'session').map((slot) => {
                    const session = slot.sessionId ? sessions[id].get(slot.sessionId) : undefined
                    return session ? <SessionCard key={slot.start} session={session} /> : <TbaCard key={slot.start} day={id} title={slot.title} />
                  })}
                </div>
              </div>
            )
          })}

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px 22px', alignItems: 'center', justifyContent: 'center', marginTop: '36px' }}>
            <a href="/agenda/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '15px 26px', borderRadius: '46px', border: '1.5px solid #FEC400', color: '#FEC400', fontSize: '14px', fontWeight: 800, letterSpacing: '.8px', textTransform: 'uppercase', textDecoration: 'none' }}>See the full agenda →</a>
            <TicketsCta style={{ display: 'inline-flex', alignItems: 'center', fontWeight: 500, textTransform: 'uppercase', fontSize: '15px', letterSpacing: '1px', padding: '16px 30px', borderRadius: '46px', boxShadow: '0 14px 36px rgba(255,56,75,.36)' }} />
          </div>
        </div>
      </div>
    </section>
  )
}
