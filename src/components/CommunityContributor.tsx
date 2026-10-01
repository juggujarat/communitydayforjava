const LOGO = '/assets/jobrunner%20community%20contributor.jfif'

/** Community contributor recognition (#community-contributor). */
export default function CommunityContributor() {
  return (
    <section id="community-contributor" style={{ position: 'relative', padding: '40px 40px 72px', background: '#F4F1E8', color: '#0E1667', overflow: 'hidden' }}>
      <div style={{ position: 'relative', zIndex: 3, maxWidth: '1040px', margin: '0 auto', textAlign: 'center' }}>
        <div data-reveal style={{ marginBottom: '36px' }}>
          <h2 style={{ margin: 0, fontWeight: 500, fontSize: 'clamp(30px,4.6vw,56px)', lineHeight: 1, letterSpacing: '-1.5px' }}>
            Community <span style={{ fontFamily: "'Roboto',sans-serif", fontWeight: 600, color: '#0D5CDB' }}>contributor</span>
          </h2>
        </div>
        <div data-reveal data-reveal-d="80" style={{ display: 'grid', gridTemplateColumns: 'minmax(170px, 220px)', justifyContent: 'center' }}>
          <div style={{ height: '130px', overflow: 'hidden', background: '#fff', border: '1px solid rgba(14,22,103,.08)', borderRadius: '14px', boxShadow: '0 6px 18px rgba(14,22,103,.08)' }}>
            <a href="https://www.jobrunr.io/en/" target="_blank" rel="noopener noreferrer" aria-label="JobRunr community contributor" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', overflow: 'hidden' }}>
              <img src={LOGO} alt="JobRunr" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'contain', transform: 'scale(1.4)' }} />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
