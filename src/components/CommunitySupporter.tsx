import { SocialLink } from '../lib/icons'
import PartnerTag from './PartnerTag'

/**
 * Community Supporter (#community-supporter): an individual's contribution to the community.
 * Deliberately NOT part of the sponsor tiers (SponsorsWall) — it isn't a sponsorship — so it
 * gets its own section, with a short line saying so.
 */
export default function CommunitySupporter() {
  return (
<<<<<<< HEAD
    <section id="community-supporter" style={{ position: 'relative', padding: '0 40px 56px', background: '#F4F1E8', color: '#0E1667', overflow: 'hidden' }}>
      <div style={{ position: 'relative', zIndex: 3, maxWidth: '1040px', margin: '0 auto', textAlign: 'center' }}>
        <div data-reveal style={{ marginBottom: '24px' }}>
=======
    <section id="community-supporter" style={{ position: 'relative', padding: '8px 40px 64px', background: '#F4F1E8', color: '#0E1667', overflow: 'hidden' }}>
      <div style={{ position: 'relative', zIndex: 3, maxWidth: '760px', margin: '0 auto', textAlign: 'center', paddingTop: '40px', borderTop: '1px solid rgba(14,22,103,.12)' }}>
        <div data-reveal style={{ marginBottom: '8px' }}>
>>>>>>> f26f9c0bcd83f569095558d728e153644610e60b
          <PartnerTag>COMMUNITY SUPPORTER</PartnerTag>
          <p style={{ margin: '0 auto', maxWidth: '520px', fontSize: '15.5px', fontWeight: 500, lineHeight: 1.55, color: '#42498a' }}>Backing the Java community with their time and effort.</p>
        </div>
        <div data-reveal data-reveal-d="80" style={{ display: 'inline-flex', alignItems: 'center', gap: '20px', marginTop: '22px', padding: '16px 24px 16px 16px', background: '#fff', border: '1px solid rgba(14,22,103,.08)', borderRadius: '20px', boxShadow: '0 12px 30px rgba(14,22,103,.08)', textAlign: 'left' }}>
          <div style={{ position: 'relative', flex: 'none', width: '110px', height: '110px', borderRadius: '16px', overflow: 'hidden', background: '#F4F1E8' }}>
            <img src="/assets/dhaval%20desai.jpg" alt="Dhaval Desai" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 18%', display: 'block' }} />
            <div style={{ position: 'absolute', left: '8px', bottom: '8px', zIndex: 2 }}>
              <SocialLink social={{ type: 'linkedin', href: 'https://www.linkedin.com/in/dhavaltdesai/', label: 'Dhaval Desai on LinkedIn' }} variant="dark" />
            </div>
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '18px' }}>Dhaval Desai</div>
            <div style={{ fontSize: '14px', color: '#42498a', marginTop: '4px' }}>Product Manager - Maintainer</div>
            <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#0D5CDB', marginTop: '5px' }}>Gluu</div>
          </div>
        </div>
      </div>
    </section>
  )
}
