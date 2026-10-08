import { DAYS, DAY_ORDER, VENUE, dayEnd, fmtTime, programmeStart, type DayId } from '../../data/program'
import { TICKET_PLANS } from '../../lib/tickets'
import TicketsCta from '../TicketsCta'
import { DayIcon } from './parts'

const uc: React.CSSProperties = { textTransform: 'none' }
const label: React.CSSProperties = { color: '#FEC400', fontSize: '13px', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase' }
const panel: React.CSSProperties = { padding: 'clamp(20px,3vw,32px)', borderRadius: '22px', background: 'rgba(255,255,255,.07)', border: '1px solid rgba(255,255,255,.13)' }
const ghostBtn: React.CSSProperties = { display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '13px 22px', borderRadius: '46px', fontSize: '13px', fontWeight: 800, letterSpacing: '.6px', textTransform: 'uppercase', textDecoration: 'none' }

/** The two dates at a glance: where and when, one tile per day, linking down to each. */
export function KeyFacts() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '14px', margin: '30px 0 0' }}>
      {DAY_ORDER.map((id) => {
        const d = DAYS[id]
        return (
          <a key={id} href={`#${id}`} style={{ display: 'flex', gap: '14px', alignItems: 'center', padding: '16px 18px', borderRadius: '16px', textDecoration: 'none', color: '#fff', background: `${d.accent}1f`, border: `1px solid ${d.accent}77` }}>
            <span style={{ flex: 'none', width: '42px', height: '42px', borderRadius: '12px', background: d.accent, color: d.onAccent, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><DayIcon day={id} size={20} /></span>
            <span>
              <span style={{ display: 'block', fontSize: '11px', fontWeight: 800, letterSpacing: '1.4px', textTransform: 'uppercase', color: d.accent }}>{d.label}</span>
              <span style={{ display: 'block', fontSize: '17px', fontWeight: 700 }}>{d.weekday} {d.date}</span>
              <span style={{ display: 'block', fontSize: '13px', color: '#c4caf0' }}>{fmtTime(programmeStart(id))} to {fmtTime(dayEnd(id))} · {VENUE[id].short}</span>
            </span>
          </a>
        )
      })}
    </div>
  )
}

/**
 * Where a day happens: the venue partner's logo (linked to their site), the address, Open
 * in Google Maps / Get directions buttons and an embedded map. The two days are at
 * different venues, so each day block carries its own card (anchors #venue-workshop /
 * #venue-conference).
 */
export function VenueCard({ day }: { day: DayId }) {
  const d = DAYS[day]
  const v = VENUE[day]
  return (
    <div id={`venue-${day}`} style={{ ...panel, scrollMarginTop: '120px', marginBottom: '22px', borderLeft: `5px solid ${d.accent}`, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: 'clamp(18px,3vw,30px)', alignItems: 'stretch' }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
          <a href={v.partner.url} target="_blank" rel="noopener noreferrer" aria-label={`${v.partner.name} website`} style={{ flex: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '150px', height: '64px', padding: '8px 12px', borderRadius: '12px', background: '#fff' }}>
            <img src={v.partner.logo} alt={`${v.partner.name} logo`} loading="lazy" style={{ maxWidth: '100%', maxHeight: '100%', display: 'block', objectFit: 'contain' }} />
          </a>
          <div>
            <div style={{ color: d.accent, fontSize: '11px', fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase' }}>Venue partner</div>
            <div style={{ marginTop: '2px', color: '#c4caf0', fontSize: '14px', fontWeight: 600 }}>Hosting the {d.label.toLowerCase()}</div>
          </div>
        </div>

        <h3 style={{ ...uc, margin: '0 0 8px', fontSize: 'clamp(20px,2.4vw,26px)', lineHeight: 1.2, color: '#fff' }}>{v.name}</h3>
        <p style={{ margin: '0 0 4px', color: '#c4caf0', fontSize: '15.5px', lineHeight: 1.6 }}>{v.address}</p>
        {v.plusCode && <p style={{ margin: 0, color: '#8890c8', fontSize: '13.5px' }}>Plus code: {v.plusCode}</p>}
        <p style={{ margin: '14px 0 20px', color: '#fff', fontSize: '15px', fontWeight: 700 }}>
          {d.weekday}, {d.date} · {fmtTime(programmeStart(day))} to {fmtTime(dayEnd(day))}
          {day === 'conference' && <span style={{ fontWeight: 600, color: '#c4caf0' }}> (check-in from 8:00 AM)</span>}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
          <a href={v.mapUrl} target="_blank" rel="noopener noreferrer" style={{ ...ghostBtn, background: d.accent, color: d.onAccent }}>Open in Google Maps</a>
          <a href={v.directionsUrl} target="_blank" rel="noopener noreferrer" style={{ ...ghostBtn, border: `1.5px solid ${d.accent}`, color: d.accent }}>Get directions</a>
        </div>
      </div>

      <div style={{ position: 'relative', minHeight: '260px', borderRadius: '16px', overflow: 'hidden', background: '#0E1667', border: '1px solid rgba(255,255,255,.15)' }}>
        <iframe title={`Map: ${v.name}`} src={v.embedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }} />
      </div>
    </div>
  )
}

interface Plan {
  label: string
  price: string
  accent: string
  tagline?: string
  includesFrom?: string
  included: string[]
  excluded?: string[]
  perfectFor: string
}

/**
 * "Which ticket includes what" — rendered straight from TICKET_PLANS so the inclusions
 * here can never drift from the popup and /tickets. The workshop pass gets the loudest
 * treatment because the 17 Oct workshop is only open to that pass.
 */
export function TicketsInfo() {
  const plans = TICKET_PLANS as Plan[]
  return (
    <div id="tickets" style={{ scrollMarginTop: '120px' }}>
      <div style={{ maxWidth: '760px', marginBottom: '28px' }}>
        <div style={label}>Tickets</div>
        <h2 style={{ ...uc, margin: '10px 0 10px', fontSize: 'clamp(26px,3.6vw,38px)', lineHeight: 1.12, color: '#fff' }}>Which ticket gets you what</h2>
        <p style={{ margin: 0, color: '#c4caf0', fontSize: '17px', lineHeight: 1.6 }}>
          Each pass includes everything in the pass before it, so you only pay for what you add. Conference talks on <strong style={{ color: '#fff' }}>{DAYS.conference.date}</strong> are in every pass; the hands-on workshop on <strong style={{ color: '#fff' }}>{DAYS.workshop.date}</strong> is included from the Regular + Workshop Pass up.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))', gap: '18px', alignItems: 'stretch' }}>
        {plans.map((p) => {
          const workshop = p.label.includes('Workshop') // the pass that ADDS the workshop gets the loud styling
          const hasWorkshop = p.tagline?.toLowerCase().includes('workshop') // every pass that includes it gets the badge
          return (
            <div key={p.label} style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '14px', padding: '24px 22px', borderRadius: '20px', background: workshop ? 'linear-gradient(160deg, rgba(255,56,75,.2), rgba(255,255,255,.05))' : 'rgba(255,255,255,.06)', border: workshop ? '1.5px solid #FF384B' : '1px solid rgba(255,255,255,.14)', borderTop: `4px solid ${p.accent}` }}>
              {hasWorkshop && <span style={{ position: 'absolute', top: '-13px', right: '16px', padding: '5px 12px', borderRadius: '30px', background: '#02CF70', color: '#06241a', fontSize: '10.5px', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase' }}>Includes workshop</span>}
              <div>
                <div style={{ fontSize: '18px', fontWeight: 800, color: '#fff' }}>{p.label}</div>
                <div style={{ marginTop: '2px', fontSize: '28px', fontWeight: 800, color: p.accent === '#0D5CDB' ? '#7FB0FF' : p.accent }}>{p.price}</div>
                {p.tagline && <div style={{ marginTop: '2px', fontSize: '13px', fontWeight: 700, color: '#6FF0B0' }}>{p.tagline}</div>}
              </div>
              {p.includesFrom && <div style={{ fontSize: '13.5px', fontWeight: 800, lineHeight: 1.4, color: '#ffe27a' }}>✅ Everything in the {p.includesFrom}, plus:</div>}
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: '9px' }}>
                {p.included.map((i) => <li key={i} style={{ fontSize: '14px', lineHeight: 1.5, color: '#e6e9ff' }}>{i}</li>)}
              </ul>
              {p.excluded && (
                <div style={{ fontSize: '12.5px', lineHeight: 1.5, color: '#9aa3d6' }}>
                  <strong style={{ color: '#c4caf0' }}>Not included:</strong> {p.excluded.join(', ')}
                </div>
              )}
              <div style={{ marginTop: 'auto', paddingTop: '4px', fontSize: '12.5px', lineHeight: 1.5, color: '#9aa3d6' }}>
                <strong style={{ color: '#c4caf0' }}>Best for:</strong> {p.perfectFor}
              </div>
            </div>
          )
        })}
      </div>

      <div style={{ marginTop: '28px', textAlign: 'center' }}>
        <TicketsCta style={{ display: 'inline-flex', alignItems: 'center', fontWeight: 500, textTransform: 'uppercase', fontSize: '15px', letterSpacing: '1px', padding: '16px 34px', borderRadius: '46px', boxShadow: '0 14px 36px rgba(255,56,75,.36)' }} />
        <p style={{ margin: '12px 0 0', fontSize: '13px', color: '#8890c8' }}>Prices and availability are live in the checkout.</p>
      </div>
    </div>
  )
}
