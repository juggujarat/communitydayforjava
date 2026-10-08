import { SocialLink } from '../lib/icons'
import PartnerTag from './PartnerTag'

/** Community supporter profile shown below the venue section. */
export default function CommunitySupporter() {
  return (
    <section id="community-supporter" style={{ position: 'relative', padding: '0 40px 56px', background: '#F4F1E8', color: '#0E1667', overflow: 'hidden' }}>
      <div style={{ position: 'relative', zIndex: 3, maxWidth: '1040px', margin: '0 auto', textAlign: 'center' }}>
        <div data-reveal style={{ marginBottom: '24px' }}>
          <PartnerTag>COMMUNITY SUPPORTER</PartnerTag>
        </div>
        <div data-reveal data-reveal-d="80" style={{ maxWidth: '220px', margin: '0 auto', textAlign: 'left' }}>
          <div style={{ aspectRatio: '1', marginBottom: '14px', borderRadius: '22px', overflow: 'hidden', background: '#fff', boxShadow: '0 16px 34px rgba(14,22,103,.12)', position: 'relative' }}>
              <img src="/assets/dhaval%20desai.jpg" alt="Dhaval Desai" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 18%', display: 'block' }} />
            <div style={{ position: 'absolute', left: '12px', bottom: '12px', zIndex: 2 }}>
              <SocialLink social={{ type: 'linkedin', href: 'https://www.linkedin.com/in/dhavaltdesai/', label: 'Dhaval Desai on LinkedIn' }} variant="dark" />
            </div>
          </div>
          <div style={{ fontWeight: 700, fontSize: '16px' }}>Dhaval Desai</div>
          <div style={{ fontSize: '13px', color: '#42498a', marginTop: '4px' }}>Product Manager - Maintainer</div>
          <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#0D5CDB', marginTop: '5px' }}>Gluu</div>
        </div>
      </div>
    </section>
  )
}
