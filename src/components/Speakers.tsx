/** Speakers section (#speakers). */
const speakers = [
  { name: 'Nikhilesh Tayal', role: 'Google Developer Expert for AI · Founder, AI ML etc.', image: '/assets/speaker-nikhilesh-cutout.png', href: '/speakers/nikhilesh-tayal/', bg: '#FF384B' },
  { name: 'Ravi Soni', role: 'The CodeFather · Java & Cloud-Native Architect', image: '/assets/ravi_soni-removebg-preview.png', href: '/speakers/ravi-soni/', bg: '#7D00BC' },
  { name: 'Siva Prasad Reddy Katamreddy', role: 'Developer Advocate at JetBrains', image: '/assets/speaker-siva-cutout.png', href: '/speakers/siva-prasad-reddy/', bg: '#0D5CDB' },
  { name: 'Dhaval Shah', role: 'Cloud Native Architect · Fintech Platforms at Scale', image: '/assets/speaker-dhaval-cutout.png', href: '/speakers/dhaval-shah/', bg: '#02CF70' },
]

export default function Speakers() {
  return (
    <section id="speakers" style={{ position: 'relative', padding: '72px 40px', background: 'radial-gradient(120% 100% at 80% 0%,#1a2670,#0E1667 72%)', overflow: 'hidden' }}>
      <div style={{ position: 'relative', zIndex: 3, maxWidth: '1080px', margin: '0 auto', textAlign: 'center' }}>
        <div data-reveal style={{ marginBottom: '48px' }}>
          <h2 style={{ margin: 0, fontWeight: 500, fontSize: 'clamp(30px,4.6vw,56px)', lineHeight: 1, letterSpacing: '-1.5px' }}>Meet the <span style={{ fontFamily: "'Roboto',sans-serif", fontWeight: 600, color: '#FEC400' }}>speakers</span></h2>
          <p style={{ margin: '16px auto 0', maxWidth: '100%', fontSize: '18px', fontWeight: 500, color: '#a8b0e0' }}>10+ industry speakers exploring Java in the age of AI.</p>
        </div>
        <div data-reveal data-reveal-d="80" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '34px 24px', maxWidth: '1080px', margin: '0 auto', textAlign: 'left' }}>
          {speakers.map((speaker) => (
            <a key={speaker.name} href={speaker.href} aria-label={`View ${speaker.name}'s speaker profile`} style={{ display: 'flex', flexDirection: 'column', color: 'inherit', textDecoration: 'none' }}>
              <div style={{ aspectRatio: '1', margin: '0 0 16px', width: '100%', borderRadius: '22px', overflow: 'hidden', background: speaker.bg, boxShadow: '0 16px 34px rgba(0,0,0,.34)' }}>
                <img src={speaker.image} alt={speaker.name} loading="lazy" style={{ display: 'block', width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center bottom' }} />
              </div>
              <div style={{ fontWeight: 700, fontSize: '16px', color: '#fff' }}>{speaker.name}</div>
              <div style={{ fontSize: '13px', color: '#9aa3d6', marginTop: '4px' }}>{speaker.role}</div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '12px', color: '#FEC400', fontSize: '12px', fontWeight: 700 }}>
                View speaker &amp; talk details <span aria-hidden="true">→</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
