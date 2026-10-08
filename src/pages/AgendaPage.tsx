import { DAYS, DAY_ORDER, SCHEDULE, dayEnd, fmtTime, programmeStart } from '../data/program'
import { DayIcon } from '../components/program/parts'
import { Timetable } from '../components/program/Timetable'
import { TicketsInfo, VenueCard } from '../components/program/Info'
import PageShell, { Crumbs } from './PageShell'

/**
 * /agenda/ — both days up front, in date order: for each day its header, the venue partner
 * and Google map, then the full running order. The tiles under the title jump to each day
 * (#workshop / #conference), so a day is still a shareable link. Ticket inclusions follow,
 * so the page answers "what, when, where and which ticket" in one scroll.
 */
export default function AgendaPage() {
  return (
    <PageShell>
      <Crumbs items={[['Home', '/'], ['Agenda']]} />

      <div data-reveal style={{ maxWidth: '800px' }}>
        <div style={{ marginBottom: '12px', color: '#FEC400', fontSize: '14px', fontWeight: 800, letterSpacing: '2px' }}>COMMUNITY DAY FOR JAVA 2026</div>
        <h1 style={{ margin: '0 0 14px', fontSize: 'clamp(34px,5vw,58px)', lineHeight: 1.05, color: '#fff' }}>Agenda &amp; Sessions</h1>
      </div>

      <p role="note" style={{ margin: '6px 0 0', fontSize: '14px', fontWeight: 600, color: '#ffe27a' }}>Timings are subject to change closer to the event.</p>

      <div style={{ height: '44px' }} />

      {DAY_ORDER.map((id) => {
        const d = DAYS[id]
        const slots = SCHEDULE[id].filter((i) => i.kind === 'session').length
        return (
          <div key={id} id={id} style={{ marginBottom: '60px', scrollMarginTop: '120px' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '16px', padding: '18px 22px', marginBottom: '22px', borderRadius: '18px', background: `linear-gradient(120deg, ${d.accent}33, rgba(255,255,255,.03))`, border: `1px solid ${d.accent}77` }}>
              <span style={{ flex: 'none', width: '48px', height: '48px', borderRadius: '14px', background: d.accent, color: d.onAccent, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><DayIcon day={id} size={24} /></span>
              <div style={{ flex: '1 1 280px', minWidth: 0 }}>
                <h2 style={{ margin: 0, fontSize: 'clamp(22px,3vw,30px)', lineHeight: 1.1, color: '#fff', textTransform: 'none' }}>{d.label} <span style={{ color: d.accent }}>· {d.weekday} {d.date}</span></h2>
                <p style={{ margin: '6px 0 0', fontSize: '14.5px', lineHeight: 1.5, color: '#c4caf0' }}>{d.blurb}</p>
              </div>
              <div style={{ textAlign: 'left', fontSize: '12.5px', fontWeight: 700, color: d.accent, textTransform: 'uppercase', letterSpacing: '.8px', lineHeight: 1.6 }}>
                {fmtTime(programmeStart(id))} to {fmtTime(dayEnd(id))}
                {/* Session count shown for the workshop only; the conference count was removed by request. */}
                {id === 'workshop' && <><br />{slots} workshops</>}
              </div>
            </div>

            <VenueCard day={id} />
            <Timetable day={id} />
          </div>
        )
      })}

      <TicketsInfo />
    </PageShell>
  )
}
