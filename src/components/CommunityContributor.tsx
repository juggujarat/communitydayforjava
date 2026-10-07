import PartnerTag from './PartnerTag'

const PATRONS: { name: string; logo: string; href: string; scale?: number }[] = [
  { name: 'JobRunr', logo: '/assets/jobrunner%20community%20contributor.jfif', href: 'https://www.jobrunr.io/en/', scale: 1.4 },
  { name: 'Techxplore', logo: '/assets/techxplore%20logo.png', href: 'https://www.techxplore.io/', scale: 0.78 },
]

/** Community Patreon recognition (#community-contributor). */
export default function CommunityContributor() {
  return (
    <section id="community-contributor" style={{ position: 'relative', padding: '40px 40px 72px', background: '#F4F1E8', color: '#0E1667', overflow: 'hidden' }}>
      <div style={{ position: 'relative', zIndex: 3, maxWidth: '1040px', margin: '0 auto', textAlign: 'center' }}>
        <div data-reveal style={{ marginBottom: '36px' }}>
          <PartnerTag>COMMUNITY PATREON</PartnerTag>
        </div>
        <div data-reveal data-reveal-d="80" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 220px))', justifyContent: 'center', gap: '14px' }}>
          {PATRONS.map((patron) => (
            <div key={patron.name} style={{ height: '130px', overflow: 'hidden', background: '#fff', border: '1px solid rgba(14,22,103,.08)', borderRadius: '14px', boxShadow: '0 6px 18px rgba(14,22,103,.08)' }}>
              {patron.href ? (
                <a href={patron.href} target="_blank" rel="noopener noreferrer" aria-label={patron.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', overflow: 'hidden' }}>
                  <img src={patron.logo} alt={patron.name} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'contain', transform: patron.scale ? `scale(${patron.scale})` : undefined }} />
                </a>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
                  <img src={patron.logo} alt={patron.name} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '16px', boxSizing: 'border-box' }} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
