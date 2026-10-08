import { SPONSORS, sponsorPath, type Sponsor } from '../data/sponsors'
import { Icon } from '../lib/icons'
import SpeakerLinks from '../components/SpeakerLinks'
import PageShell, { Crumbs } from './PageShell'
import { SponsorMark, TierChip } from './SponsorsPage'

const label: React.CSSProperties = { color: '#FEC400', fontSize: '13px', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase' }

const chip: React.CSSProperties = { display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '11px 18px', borderRadius: '30px', border: '1.5px solid rgba(254,196,0,.55)', color: '#FEC400', fontSize: '14px', fontWeight: 700, textDecoration: 'none', overflowWrap: 'anywhere' }

/** /sponsors/<name>/ — the full profile: about, products and services, and how to connect (website, email, social). */
export default function SponsorPage({ sponsor }: { sponsor: Sponsor }) {
  const others = SPONSORS.filter((o) => o.slug !== sponsor.slug)
  const first = sponsor.person ? sponsor.name.split(' ')[0] : sponsor.name

  return (
    <PageShell>
      <Crumbs items={[['Home', '/'], ['Sponsors', '/sponsors/'], [sponsor.name]]} />

      <div id="sponsor-hero" style={{ display: 'grid', gridTemplateColumns: 'minmax(200px, .6fr) minmax(0, 1.4fr)', gap: '44px', alignItems: 'center', marginBottom: '44px' }}>
        <div data-reveal style={{ maxWidth: '320px', borderTop: `5px solid ${sponsor.accent}`, borderRadius: '20px', boxShadow: '0 24px 60px rgba(0,0,0,.3)' }}>
          <SponsorMark s={sponsor} height={sponsor.person ? 300 : 180} />
        </div>
        <div data-reveal>
          <div style={{ marginBottom: '14px' }}><TierChip s={sponsor} /></div>
          <h1 style={{ margin: '0 0 14px', fontSize: 'clamp(32px,4.6vw,54px)', lineHeight: 1.05, color: '#fff' }}>{sponsor.name}</h1>
          <p style={{ margin: '0 0 24px', color: '#c4caf0', fontSize: '19px', lineHeight: 1.6 }}>{sponsor.tagline}</p>
          <a href={sponsor.website} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '13px 24px', borderRadius: '46px', background: '#FEC400', color: '#131C56', fontSize: '14px', fontWeight: 800, letterSpacing: '.6px', textDecoration: 'none' }}>
            <Icon type="website" /> Visit website
          </a>
        </div>
      </div>

      <div data-reveal style={{ marginBottom: '40px' }}>
        <h2 style={{ margin: '0 0 18px', color: '#fff', fontSize: '30px', textTransform: 'none' }}>About {first}</h2>
        <div style={{ display: 'grid', gap: '16px', color: '#d8dcf5', fontSize: '17px', lineHeight: 1.8, maxWidth: '860px' }}>
          {sponsor.about.map((p, i) => <p key={i} style={{ margin: 0 }}>{p}</p>)}
        </div>
      </div>

      <div data-reveal style={{ marginBottom: '48px' }}>
        <h2 style={{ margin: '0 0 18px', color: '#fff', fontSize: '30px', textTransform: 'none' }}>{sponsor.offeringsTitle ?? (sponsor.person ? 'Gluu products' : 'Products & services')}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '14px' }}>
          {sponsor.offerings.map((o) => (
            <div key={o.name} style={{ padding: '18px 20px', borderRadius: '16px', background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.14)', borderLeft: `4px solid ${sponsor.accent}` }}>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: '17px', marginBottom: '6px' }}>{o.name}</div>
              <div style={{ color: '#b6bde6', fontSize: '15px', lineHeight: 1.6 }}>{o.text}</div>
            </div>
          ))}
        </div>
      </div>

      <div data-reveal style={{ marginBottom: '48px' }}>
        <h2 style={{ margin: '0 0 18px', color: '#fff', fontSize: '30px', textTransform: 'none' }}>Connect with {first}</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
          <a href={sponsor.website} target="_blank" rel="noopener noreferrer" style={chip}>
            <Icon type="website" /> Website
          </a>
          {sponsor.contact.map((c) => (
            <a key={c.label} href={c.href} {...(c.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})} style={chip}>
              {c.href.startsWith('mailto:') && <Icon type="email" />}
              {c.label}{c.label === 'Email' ? `: ${c.value}` : ''}
            </a>
          ))}
        </div>
        {sponsor.socials.length > 0 && (
          <div style={{ marginTop: '22px' }}>
            <div style={{ ...label, marginBottom: '12px' }}>Social profiles</div>
            <SpeakerLinks links={sponsor.socials} />
          </div>
        )}
      </div>

      <div style={{ margin: '0 0 20px' }}><div style={label}>Other sponsors</div></div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '52px' }}>
        {others.map((o) => (
          <a key={o.slug} href={sponsorPath(o)} style={{ padding: '10px 16px', borderRadius: '30px', border: '1px solid rgba(255,255,255,.2)', color: '#fff', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>{o.name}</a>
        ))}
        <a href="/sponsors/" style={{ padding: '10px 16px', borderRadius: '30px', background: '#FEC400', color: '#131C56', fontSize: '14px', fontWeight: 800, textDecoration: 'none' }}>All sponsors →</a>
      </div>
    </PageShell>
  )
}
