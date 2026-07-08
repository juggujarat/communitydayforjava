import { h } from '../lib/handlers'

const BB = '1px solid rgba(14,22,103,.08)'
const BL = '1px solid rgba(14,22,103,.08)'

const TABS = [
  { tab: '-1', acc: '#0E1667', label: 'All tracks', active: true },
  { tab: '0', acc: '#FF384B', label: 'Core Java', active: false },
  { tab: '1', acc: '#0D5CDB', label: 'Enterprise & Cloud', active: false },
  { tab: '2', acc: '#02CF70', label: 'Workshops', active: false },
]

type Row =
  | { time: string; span: { text: string; bg: string; color: string }; last?: boolean }
  | { time: string; cells: [string, string, string]; last?: boolean }

const ROWS: Row[] = [
  { time: '08:30 – 09:30', span: { text: 'Registration & Breakfast', bg: '#FAF6EC', color: '#0E1667' } },
  { time: '09:30 – 10:30', span: { text: 'Opening Keynote', bg: '#FF384B', color: '#fff' } },
  { time: '10:45 – 11:30', cells: ['To be announced', 'To be announced', 'Workshop lab'] },
  { time: '11:45 – 12:30', cells: ['To be announced', 'To be announced', 'Workshop lab'] },
  { time: '12:30 – 13:45', span: { text: 'Lunch & Networking', bg: '#FAF6EC', color: '#0E1667' } },
  { time: '13:45 – 14:30', cells: ['To be announced', 'To be announced', 'Workshop lab'] },
  { time: '14:45 – 15:30', cells: ['To be announced', 'To be announced', 'Workshop lab'] },
  { time: '15:30 – 16:00', span: { text: 'Tea & Networking Break', bg: '#FAF6EC', color: '#0E1667' } },
  { time: '16:00 – 16:45', cells: ['To be announced', 'To be announced', 'Workshop lab'] },
  { time: '17:00 – 17:45', span: { text: 'Closing Note & Community Photo', bg: '#0E1667', color: '#fff' }, last: true },
]

const CELL_LABELS = ['Core Java', 'Enterprise & Cloud', 'Workshops']
const th = (color: string, ls: string, left: boolean): React.CSSProperties => ({
  textAlign: 'left', padding: '20px 26px', background: '#0E1667', color, fontSize: '15px',
  letterSpacing: ls, ...(left ? { borderLeft: '1px solid rgba(255,255,255,.12)' } : { width: '150px' }),
})

/** Agenda / three-tracks schedule (#agenda). */
export default function Agenda() {
  return (
    <section id="agenda" style={{ position: 'relative', padding: '60px 40px 120px', background: '#F4F1E8', color: '#0E1667', overflow: 'hidden' }}>
      <div style={{ position: 'relative', zIndex: 3, maxWidth: '1140px', margin: '0 auto' }}>
        <div data-reveal style={{ textAlign: 'center', marginBottom: '18px' }}>
          <h2 style={{ margin: 0, fontWeight: 700, fontSize: 'clamp(30px,4.8vw,58px)', lineHeight: 1.02, letterSpacing: '-1.5px' }}>Three parallel <span style={{ color: '#0D5CDB' }}>tracks</span></h2>
          <p style={{ margin: '16px auto 0', maxWidth: '540px', fontSize: '18px', fontWeight: 500, color: '#42498a' }}>A full-day technical immersive across Core Java, Enterprise and hands-on Workshops. Schedule is tentative — sessions revealed with the 2026 lineup.</p>
        </div>

        <div data-reveal data-reveal-d="80" style={{ display: 'flex', justifyContent: 'center', margin: '46px 0 32px' }}>
          <div id="track-tabs" style={{ display: 'inline-flex', flexWrap: 'wrap', justifyContent: 'center', gap: '4px', background: '#fff', border: '1px solid rgba(14,22,103,.1)', borderRadius: '46px', padding: '5px', boxShadow: '0 10px 28px rgba(14,22,103,.09)' }}>
            {TABS.map((t) => (
              <button key={t.tab} data-tab={t.tab} data-acc={t.acc} onClick={h.trackTab} style={{ cursor: 'pointer', fontFamily: "'Roboto',sans-serif", fontWeight: 700, fontSize: '12.5px', letterSpacing: '.5px', textTransform: 'uppercase', padding: '12px 22px', borderRadius: '40px', border: 'none', background: t.active ? t.acc : 'transparent', color: t.active ? '#fff' : '#5a6299', transition: 'background .25s ease, color .25s ease' }}>{t.label}</button>
            ))}
          </div>
        </div>

        <div id="schedule-wrap" data-reveal data-reveal-d="140" style={{ overflowX: 'auto', borderRadius: '16px', boxShadow: '0 14px 40px rgba(14,22,103,.1)' }}>
          <table id="schedule-table" style={{ width: '100%', minWidth: '720px', borderCollapse: 'collapse', background: '#fff', fontSize: '15px' }}>
            <thead>
              <tr>
                <th style={th('#fff', '1.5px', false)}>TIME</th>
                <th style={th('#FF6675', '1px', true)}>CORE JAVA</th>
                <th style={th('#5BA0FF', '1px', true)}>ENTERPRISE &amp; CLOUD</th>
                <th style={th('#3FE090', '1px', true)}>WORKSHOPS</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r, i) => (
                <tr key={i}>
                  <td data-label="Time" style={{ padding: '22px 26px', fontWeight: 700, color: '#0E1667', whiteSpace: 'nowrap', borderBottom: r.last ? undefined : BB }}>{r.time}</td>
                  {'span' in r ? (
                    <td colSpan={3} style={{ padding: '22px 26px', textAlign: 'center', fontWeight: 700, color: r.span.color, background: r.span.bg, borderBottom: r.last ? undefined : BB }}>{r.span.text}</td>
                  ) : (
                    r.cells.map((c, ci) => (
                      <td key={ci} data-label={CELL_LABELS[ci]} style={{ padding: '22px 26px', color: '#1A2266', fontWeight: 600, borderLeft: BL, borderBottom: r.last ? undefined : BB }}>{c}</td>
                    ))
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
