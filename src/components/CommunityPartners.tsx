import LogoCard, { type Logo } from './LogoCard'

const COMMUNITIES: Logo[] = [
  { img: '/assets/aws%20guj.png', alt: 'Ahmedabad Amazon AWS Cloud Meetup', href: 'https://www.meetup.com/ahmedabad-amazon-aws-cloud-meetup/', dur: 4.6, delay: '0s', padding: 24, height: 130 },
  { img: '/assets/devconf-in.svg', alt: 'DevConf India', href: 'https://www.devconf.info/in/', dur: 4.8, delay: '-0.7s', padding: 8, height: 130 },
  { img: '/assets/binary%20brains.jpeg', alt: 'Binary Brains', href: 'https://www.instagram.com/binarybrains23?igsi=OWptbGNsMXNqaDNo', dur: 5, delay: '-1.2s', padding: 16, height: 130 },
]

/** Community partners — tech communities across Gujarat (#community-partners). */
export default function CommunityPartners() {
  return (
    <section id="community-partners" style={{ position: 'relative', padding: '72px 40px', background: '#F4F1E8', color: '#0E1667', overflow: 'hidden' }}>
      <span style={{ position: 'absolute', top: '14%', left: '7%', width: '28px', height: '28px', borderRadius: '50%', background: '#02CF70', animation: 'cdj-float1 9s ease-in-out infinite', opacity: 0.8 }} />
      <div style={{ position: 'relative', zIndex: 3, maxWidth: '1040px', margin: '0 auto', textAlign: 'center' }}>
        <div data-reveal style={{ marginBottom: '44px' }}>
          <h2 style={{ margin: 0, fontWeight: 500, fontSize: 'clamp(30px,4.6vw,56px)', lineHeight: 1, letterSpacing: '-1.5px' }}>Community <span style={{ fontFamily: "'Roboto',sans-serif", fontWeight: 600, color: '#02CF70' }}>partners</span></h2>
          <p style={{ margin: '16px auto 0', maxWidth: '720px', fontSize: '18px', fontWeight: 500, color: '#42498a' }}>Tech communities across Gujarat joining hands to power the day.</p>
        </div>
        <div data-reveal data-reveal-d="80" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(170px, 220px))', justifyContent: 'center', gap: '14px' }}>
          {COMMUNITIES.map((l, i) => <LogoCard key={i} {...l} />)}
        </div>
      </div>
    </section>
  )
}
