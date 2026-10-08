import { SPONSORS, sponsorPath, type Sponsor } from '../data/sponsors'
import PageShell, { Crumbs } from './PageShell'
import SponsorDeck from '../components/Sponsor'

/** Logo (or person photo) tile shared by the list cards and the detail page. */
export function SponsorMark({ s, height }: { s: Sponsor; height: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height, padding: s.person ? '10px' : '18px', boxSizing: 'border-box', borderRadius: '16px', background: s.person ? `linear-gradient(160deg, ${s.accent}, #0a8f4f)` : '#fff', overflow: 'hidden' }}>
      {/* A person gets a square, head-and-shoulders portrait so the face is never cropped by a wide tile. */}
      <img src={s.logo} alt={s.name} loading="lazy" style={s.person ? { height: '100%', aspectRatio: '1 / 1', maxWidth: '100%', borderRadius: '12px', objectFit: 'cover', objectPosition: '50% 20%', display: 'block', border: '3px solid rgba(255,255,255,.85)' } : { maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', display: 'block', transform: s.logoScale ? `scale(${s.logoScale})` : undefined }} />
    </div>
  )
}

export function TierChip({ s }: { s: Sponsor }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '999px', background: '#0E1667', border: '1px solid rgba(255,255,255,.2)', color: '#fff', fontSize: '11px', fontWeight: 800, letterSpacing: '1.6px', textTransform: 'uppercase' }}>
      <span aria-hidden="true" style={{ width: '8px', height: '8px', borderRadius: '50%', background: s.accent }} />{s.tier}
    </span>
  )
}

/** /sponsors/ — the short list: who, which tier, one line. The detail lives on /sponsors/<name>/. */
export default function SponsorsPage() {
  return (
    <PageShell after={<SponsorDeck />}>
      <Crumbs items={[['Home', '/'], ['Sponsors']]} />

      <div data-reveal style={{ maxWidth: '820px', marginBottom: '38px' }}>
        <div style={{ marginBottom: '12px', color: '#FEC400', fontSize: '14px', fontWeight: 800, letterSpacing: '2px' }}>COMMUNITY DAY FOR JAVA 2026</div>
        <h1 style={{ margin: '0 0 14px', fontSize: 'clamp(34px,5vw,58px)', lineHeight: 1.05, color: '#fff' }}>Our Sponsors</h1>
        <p style={{ margin: 0, color: '#c4caf0', fontSize: '19px', lineHeight: 1.6 }}>
          Community Day for Java is made possible by the companies and people below. Open a sponsor to see what they build and offer.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '22px', marginBottom: '52px' }}>
        {SPONSORS.map((s) => (
          <a key={s.slug} href={sponsorPath(s)} data-reveal style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '22px', borderRadius: '22px', textDecoration: 'none', color: '#fff', background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.14)', borderTop: `5px solid ${s.accent}` }}>
            <SponsorMark s={s} height={130} />
            <div><TierChip s={s} /></div>
            <div style={{ fontSize: '22px', fontWeight: 700, lineHeight: 1.2 }}>{s.name}</div>
            <p style={{ margin: 0, color: '#c4caf0', fontSize: '15px', lineHeight: 1.55 }}>{s.tagline}</p>
            <span style={{ marginTop: 'auto', color: '#FEC400', fontWeight: 800, fontSize: '14px' }}>View details →</span>
          </a>
        ))}
      </div>
    </PageShell>
  )
}
