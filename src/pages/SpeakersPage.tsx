import { LINEUP, sessionPath, speakerPath } from '../data/program'
import { DayChip, TicketBand } from '../components/program/parts'
import { MysteryPortrait, RedactedName } from '../components/program/Mystery'
import PageShell, { Crumbs } from './PageShell'

/**
 * /speakers/ — the people behind the sessions, in programme order (conference, then
 * workshop). Each card leads with what they're teaching; slots whose speaker isn't confirmed
 * yet come last as "revealed soon" placeholders (LINEUP in data/program.ts).
 */
export default function SpeakersPage() {
  return (
    <PageShell>
      <Crumbs items={[['Home', '/'], ['Speakers']]} />

      <div data-reveal style={{ maxWidth: '800px', marginBottom: '38px' }}>
        <div style={{ marginBottom: '12px', color: '#FEC400', fontSize: '14px', fontWeight: 800, letterSpacing: '2px' }}>COMMUNITY DAY FOR JAVA 2026</div>
        <h1 style={{ margin: '0 0 14px', fontSize: 'clamp(34px,5vw,58px)', lineHeight: 1.05, color: '#fff' }}>Speakers</h1>
        <p style={{ margin: 0, color: '#c4caf0', fontSize: '19px', lineHeight: 1.6 }}>
          Practitioners who build and run Java in production, here to teach one thing each. More speakers will be revealed soon. <a href="/agenda/" style={{ color: '#FEC400', fontWeight: 700, textDecoration: 'none' }}>Browse by session →</a>
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '22px', marginBottom: '56px' }}>
        {LINEUP.map((e) => {
          const card: React.CSSProperties = { display: 'flex', flexDirection: 'column', borderRadius: '22px', overflow: 'hidden', background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.14)' }

          if (e.kind === 'tba') {
            return (
              <div key={e.key} data-reveal style={card}>
                <div style={{ position: 'relative', height: '230px' }}>
                  <MysteryPortrait day={e.day} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '20px 22px 22px', flex: 1 }}>
                  <RedactedName />
                  <div style={{ padding: '12px 14px', borderRadius: '14px', background: 'rgba(14,22,103,.55)', border: '1px solid rgba(255,255,255,.12)' }}>
                    <DayChip day={e.day} style={{ fontSize: '10px', padding: '4px 10px' }} />
                    <span style={{ display: 'block', marginTop: '8px', fontSize: '15px', fontWeight: 700, lineHeight: 1.35, color: '#fff' }}>{e.slot}</span>
                  </div>
                  <span style={{ marginTop: 'auto', color: '#9aa3d6', fontWeight: 700, fontSize: '13px' }}>Revealed soon</span>
                </div>
              </div>
            )
          }

          const sp = e.speaker
          const s = e.session
          return (
            <div key={e.key} data-reveal style={card}>
              <a href={speakerPath(sp)} aria-label={`${sp.name}'s profile`} style={{ display: 'block', height: '230px', background: sp.bg }}>
                <img src={sp.image} alt={sp.name} loading="lazy" style={{ display: 'block', width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center bottom' }} />
              </a>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '20px 22px 22px', flex: 1 }}>
                <div>
                  <h2 style={{ margin: 0, fontSize: '22px', lineHeight: 1.2, color: '#fff', textTransform: 'none' }}><a href={speakerPath(sp)} style={{ color: 'inherit', textDecoration: 'none' }}>{sp.name}</a></h2>
                  <p style={{ margin: '4px 0 0', fontSize: '13.5px', color: '#9aa3d6' }}>{sp.role}</p>
                  <p style={{ margin: '8px 0 0', fontSize: '14px', lineHeight: 1.5, color: '#d8dcf5' }}>{sp.tagline}</p>
                </div>
                <a href={sessionPath(s)} style={{ display: 'block', padding: '12px 14px', borderRadius: '14px', background: 'rgba(14,22,103,.55)', border: '1px solid rgba(255,255,255,.12)', textDecoration: 'none', color: '#fff' }}>
                  <DayChip day={s.day} kind={s.kind} style={{ fontSize: '10px', padding: '4px 10px' }} />
                  <span style={{ display: 'block', marginTop: '8px', fontSize: '15px', fontWeight: 700, lineHeight: 1.35 }}>{s.title}</span>
                </a>
                <a href={speakerPath(sp)} style={{ marginTop: 'auto', color: '#FEC400', fontWeight: 800, fontSize: '13px', textDecoration: 'none' }}>View profile →</a>
              </div>
            </div>
          )
        })}
      </div>

      <TicketBand />
    </PageShell>
  )
}
