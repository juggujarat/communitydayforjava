import { DayChip } from './program/parts'
import { MysteryPortrait, RedactedName } from './program/Mystery'
import { LINEUP, speakerPath } from '../data/program'

/**
 * Speakers section (#speakers): a glance at who is teaching, in programme order — conference
 * speakers first, then the workshop's, with slots whose speaker isn't confirmed yet last as
 * "revealed soon" placeholders (see LINEUP in data/program.ts). The sessions are the draw, so
 * each card names the talk (with its day); full profiles and sessions live on /speakers/.
 */
export default function Speakers() {
  return (
    <section id="speakers" style={{ position: 'relative', padding: '72px 40px', background: 'radial-gradient(120% 100% at 80% 0%,#1a2670,#0E1667 72%)', overflow: 'hidden' }}>
      <div style={{ position: 'relative', zIndex: 3, maxWidth: '1080px', margin: '0 auto', textAlign: 'center' }}>
        <div data-reveal style={{ marginBottom: '48px' }}>
          <h2 style={{ margin: 0, fontWeight: 500, fontSize: 'clamp(30px,4.6vw,56px)', lineHeight: 1, letterSpacing: '-1.5px' }}>Meet the <span style={{ fontFamily: "'Roboto',sans-serif", fontWeight: 600, color: '#FEC400' }}>speakers</span></h2>
          <p style={{ margin: '16px auto 0', maxWidth: '100%', fontSize: '18px', fontWeight: 500, color: '#a8b0e0' }}>The engineers behind the sessions, exploring Java in the age of AI.</p>
        </div>
        <div id="speakers-grid" data-reveal data-reveal-d="80" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '28px 22px', maxWidth: '800px', margin: '0 auto', textAlign: 'left' }}>
          {LINEUP.map((e) => {
            if (e.kind === 'tba') {
              return (
                <div key={e.key} style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ position: 'relative', aspectRatio: '1', margin: '0 0 16px', width: '100%', borderRadius: '22px' }}>
                    <MysteryPortrait day={e.day} />
                  </div>
                  <RedactedName />
                  <div style={{ marginTop: '10px' }}><DayChip day={e.day} style={{ fontSize: '10px', padding: '4px 10px' }} /></div>
                  <div style={{ fontSize: '13px', lineHeight: 1.45, color: '#c4caf0', marginTop: '8px' }}>{e.slot}</div>
                </div>
              )
            }
            return (
              <a key={e.key} href={speakerPath(e.speaker)} aria-label={`View ${e.speaker.name}'s speaker profile`} style={{ display: 'flex', flexDirection: 'column', color: 'inherit', textDecoration: 'none' }}>
                <div style={{ aspectRatio: '1', margin: '0 0 16px', width: '100%', borderRadius: '22px', overflow: 'hidden', background: e.speaker.bg, boxShadow: '0 16px 34px rgba(0,0,0,.34)' }}>
                  <img src={e.speaker.image} alt={e.speaker.name} loading="lazy" style={{ display: 'block', width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center bottom' }} />
                </div>
                <div style={{ fontWeight: 700, fontSize: '16px', color: '#fff' }}>{e.speaker.name}</div>
                <div style={{ marginTop: '10px' }}><DayChip day={e.day} style={{ fontSize: '10px', padding: '4px 10px' }} /></div>
                <div style={{ fontSize: '13px', lineHeight: 1.45, color: '#c4caf0', marginTop: '8px' }}>{e.session.title}</div>
              </a>
            )
          })}
        </div>
        <div data-reveal style={{ marginTop: '44px' }}>
          <a href="/speakers/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '15px 26px', borderRadius: '46px', border: '1.5px solid #FEC400', color: '#FEC400', fontSize: '14px', fontWeight: 800, letterSpacing: '.8px', textTransform: 'uppercase', textDecoration: 'none' }}>All speakers &amp; their sessions →</a>
        </div>
      </div>
    </section>
  )
}
