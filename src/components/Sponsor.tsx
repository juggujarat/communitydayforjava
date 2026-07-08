import { h } from '../lib/handlers'
import { SponsorShapes } from '../lib/decor'
import { MAIL } from '../lib/links'

const row = (accent: string, node: React.ReactNode, key: number) => (
  <div key={key} style={{ display: 'flex', gap: '11px', fontSize: '14px', lineHeight: 1.4 }}>
    <span style={{ color: accent, fontWeight: 900 }}>✓</span>
    <span>{node}</span>
  </div>
)

/** Sponsorship opportunities (#sponsor): Platinum + Gold tier cards. */
export default function Sponsor() {
  return (
    <section id="sponsor" style={{ position: 'relative', padding: '130px 40px', background: '#0A0E3A', overflow: 'hidden' }}>
      <SponsorShapes />
      <div style={{ position: 'relative', zIndex: 3, maxWidth: '1080px', margin: '0 auto' }}>
        <div data-reveal style={{ textAlign: 'center', marginBottom: '56px' }}>
          <h2 style={{ margin: 0, fontWeight: 500, fontSize: 'clamp(32px,5vw,64px)', lineHeight: 1, letterSpacing: '-1.5px' }}>Sponsorship <span style={{ fontFamily: "'Roboto',sans-serif", fontWeight: 600, color: '#02CF70' }}>opportunities</span></h2>
          <p style={{ margin: '18px auto 0', maxWidth: '560px', fontSize: '18px', fontWeight: 500, color: '#a8b0e0' }}>Connect, showcase and engage top talent at Gujarat's largest Java gathering: 600+ engaged, high-intent attendees.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px, 1fr))', gap: '24px', alignItems: 'start' }}>
          {/* Platinum */}
          <div data-reveal style={{ position: 'relative', padding: '40px 34px', borderRadius: '26px', background: 'linear-gradient(160deg,#1a2266,#0E1667)', border: '1.5px solid rgba(254,196,0,.5)', overflow: 'hidden' }}>
            <div style={{ display: 'inline-block', padding: '6px 14px', borderRadius: '30px', background: '#FEC400', color: '#0E1667', fontWeight: 800, fontSize: '11px', letterSpacing: '2px' }}>PLATINUM · 2 SLOTS</div>
            <div style={{ margin: '22px 0 4px', fontWeight: 900, fontSize: '44px', lineHeight: 1 }}>₹1,00,000</div>
            <div style={{ fontSize: '14px', color: '#9aa3d6', marginBottom: '24px' }}>≈ 1100 USD · Maximum exposure &amp; premium stage time</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {row('#FEC400', <>30-min tech talk on Java &amp; AI to showcase leadership <span style={{ color: '#9aa3d6' }}>(via CFP)</span></>, 0)}
              {row('#FEC400', "Premium 10'×10' exhibition booth with custom backdrop", 1)}
              {row('#FEC400', 'Logo on passes, lanyards, website & stage', 2)}
              {row('#FEC400', 'Full social package + memento on stage', 3)}
              {row('#FEC400', '3 complimentary representative passes', 4)}
            </div>
            <a href={MAIL} style={{ marginTop: '28px', display: 'block', textAlign: 'center', background: '#FF384B', color: '#fff', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1px', padding: '15px', borderRadius: '40px', textDecoration: 'none', boxShadow: '0 10px 28px rgba(255,56,75,.32)' }} data-cta="1" onMouseEnter={h.btnOn} onMouseLeave={h.btnOff}>Reserve Platinum</a>
          </div>
          {/* Gold */}
          <div data-reveal data-reveal-d="100" style={{ position: 'relative', padding: '40px 34px', borderRadius: '26px', background: 'rgba(255,255,255,.04)', border: '1.5px solid rgba(255,255,255,.12)', overflow: 'hidden' }}>
            <div style={{ display: 'inline-block', padding: '6px 14px', borderRadius: '30px', background: 'rgba(255,255,255,.12)', color: '#fff', fontWeight: 800, fontSize: '11px', letterSpacing: '2px' }}>GOLD · 3 SLOTS</div>
            <div style={{ margin: '22px 0 4px', fontWeight: 900, fontSize: '44px', lineHeight: 1 }}>₹75,000</div>
            <div style={{ fontSize: '14px', color: '#9aa3d6', marginBottom: '24px' }}>≈ 850 USD · Networking &amp; brand visibility</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {row('#02CF70', "Premium 10'×10' exhibition booth with custom backdrop", 0)}
              {row('#02CF70', 'Table, 3 chairs, extended display & electrical setup', 1)}
              {row('#02CF70', 'Logo on passes, lanyards, website & stage', 2)}
              {row('#02CF70', 'Social package across all platforms', 3)}
              {row('#02CF70', '3 complimentary representative passes', 4)}
            </div>
            <a href={MAIL} style={{ marginTop: '28px', display: 'block', textAlign: 'center', background: 'transparent', border: '1.5px solid rgba(255,255,255,.3)', color: '#fff', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1px', padding: '15px', borderRadius: '40px', textDecoration: 'none' }} onMouseEnter={h.ghostOn} onMouseLeave={h.ghostOff}>Reserve Gold</a>
          </div>
        </div>
      </div>
    </section>
  )
}
