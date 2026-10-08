import { SPEAKERS, sessionsOf, speakerPath, type Speaker } from '../data/program'
import { SessionCard, TicketBand } from '../components/program/parts'
import SpeakerLinks from '../components/SpeakerLinks'
import PageShell, { Crumbs } from './PageShell'

const label: React.CSSProperties = { color: '#FEC400', fontSize: '13px', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase' }

/** /speakers/<name>/ — profile, with the speaker's session(s) first so the topic leads. */
export default function SpeakerPage({ speaker }: { speaker: Speaker }) {
  const talks = sessionsOf(speaker)
  const first = speaker.name.split(' ')[0]
  const others = SPEAKERS.filter((s) => s.id !== speaker.id)

  return (
    <PageShell>
      <Crumbs items={[['Home', '/'], ['Speakers', '/speakers/'], [speaker.name]]} />

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(200px, .6fr) minmax(0, 1.4fr)', gap: '48px', alignItems: 'center' }} id="speaker-hero">
        <div data-reveal style={{ maxWidth: '250px', overflow: 'hidden', borderRadius: '22px', border: '1px solid rgba(255,255,255,.2)', boxShadow: '0 24px 60px rgba(0,0,0,.3)', background: speaker.bg }}>
          <img src={speaker.image} alt={speaker.name} style={{ display: 'block', width: '100%', maxHeight: '340px', objectFit: 'contain', objectPosition: 'center bottom' }} />
        </div>
        <div data-reveal>
          <div style={{ marginBottom: '12px', color: '#FEC400', fontSize: '14px', fontWeight: 800, letterSpacing: '2px' }}>COMMUNITY DAY FOR JAVA 2026 SPEAKER</div>
          <h1 style={{ margin: '0 0 14px', fontSize: 'clamp(34px,5vw,58px)', lineHeight: 1.05, color: '#fff' }}>{speaker.name}</h1>
          <p style={{ margin: '0 0 10px', color: '#c4caf0', fontSize: '20px', fontWeight: 600 }}>{speaker.role}</p>
          <p style={{ margin: '0 0 26px', color: '#d8dcf5', fontSize: '17px', lineHeight: 1.6, maxWidth: '640px' }}>{speaker.tagline}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {speaker.topics.map((topic) => <span key={topic} style={{ padding: '9px 14px', border: '1px solid rgba(254,196,0,.42)', borderRadius: '30px', background: 'rgba(254,196,0,.1)', color: '#ffe27a', fontSize: '14px', fontWeight: 600 }}>{topic}</span>)}
          </div>
        </div>
      </div>

      <div style={{ margin: '52px 0 22px' }}>
        <div style={label}>{talks.length > 1 ? `${first}'s sessions` : `${first}'s session`}</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: '20px', maxWidth: talks.length === 1 ? '560px' : undefined }}>
        {talks.map((s) => <SessionCard key={s.id} session={s} />)}
      </div>

      <div data-reveal style={{ marginTop: '44px' }}>
        <h2 style={{ margin: '0 0 18px', color: '#fff', fontSize: '30px', textTransform: 'none' }}>About {first}</h2>
        <div style={{ display: 'grid', gap: '16px', color: '#d8dcf5', fontSize: '17px', lineHeight: 1.8, maxWidth: '860px' }}>
          {speaker.bio.map((p, i) => <p key={i} style={{ margin: 0 }}>{p}</p>)}
        </div>
      </div>

      <div data-reveal style={{ marginTop: '34px' }}>
        <h2 style={{ margin: '0 0 18px', color: '#fff', fontSize: '30px', textTransform: 'none' }}>Find {first} online</h2>
        <SpeakerLinks links={speaker.links} />
      </div>

      <div style={{ margin: '56px 0 20px' }}>
        <div style={label}>Meet the other speakers</div>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '52px' }}>
        {others.map((o) => (
          <a key={o.id} href={speakerPath(o)} style={{ padding: '10px 16px', borderRadius: '30px', border: '1px solid rgba(255,255,255,.2)', color: '#fff', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>{o.name}</a>
        ))}
        <a href="/speakers/" style={{ padding: '10px 16px', borderRadius: '30px', background: '#FEC400', color: '#131C56', fontSize: '14px', fontWeight: 800, textDecoration: 'none' }}>All speakers →</a>
      </div>

      <TicketBand workshop={talks.some((t) => t.day === 'workshop') && talks.every((t) => t.day === 'workshop')} />
    </PageShell>
  )
}
