import { useState } from 'react'
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
  const [showMore, setShowMore] = useState(false)
  const [showMoreGold, setShowMoreGold] = useState(false)
  return (
    <section id="sponsor" style={{ position: 'relative', padding: '130px 40px', background: '#0A0E3A', overflow: 'hidden' }}>
      <SponsorShapes />
      <div style={{ position: 'relative', zIndex: 3, maxWidth: '1080px', margin: '0 auto' }}>
        <div data-reveal style={{ textAlign: 'center', marginBottom: '56px' }}>
          <h2 style={{ margin: 0, fontWeight: 500, fontSize: 'clamp(32px,5vw,64px)', lineHeight: 1, letterSpacing: '-1.5px' }}>Sponsorship <span style={{ fontFamily: "'Roboto',sans-serif", fontWeight: 600, color: '#02CF70' }}>opportunities</span></h2>
          <p style={{ margin: '18px auto 0', maxWidth: '560px', fontSize: '18px', fontWeight: 500, color: '#a8b0e0' }}>Connect, showcase and engage top talent at Gujarat's largest Java gathering: 600+ engaged, high-intent attendees.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px, 1fr))', gap: '24px', alignItems: 'stretch' }}>
          {/* Platinum */}
          <div data-reveal style={{ position: 'relative', padding: '40px 34px', borderRadius: '26px', background: 'linear-gradient(160deg,#1a2266,#0E1667)', border: '1.5px solid rgba(254,196,0,.5)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'inline-block', padding: '6px 14px', borderRadius: '30px', background: '#FEC400', color: '#0E1667', fontWeight: 800, fontSize: '11px', letterSpacing: '2px' }}>PLATINUM</div>
            <div style={{ margin: '22px 0 4px', fontWeight: 900, fontSize: '44px', lineHeight: 1 }}>₹50,000</div>
            <div style={{ fontSize: '14px', color: '#9aa3d6', marginBottom: '24px' }}>≈ $600 · Maximum exposure, direct audience engagement &amp; brand leadership</div>

            {/* Exclusive Time on Stage */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontWeight: 700, fontSize: '13px', letterSpacing: '1.5px', color: '#FEC400', marginBottom: '10px', textTransform: 'uppercase' }}>Exclusive Time on Stage</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {row('#FEC400', '5-minute product/service presentation on stage in front of the entire audience', 0)}
                {row('#FEC400', 'Memento & Letter of Appreciation presented on stage', 1)}
              </div>
            </div>

            {/* Exhibition Booth */}
            <div>
              <div style={{ fontWeight: 700, fontSize: '13px', letterSpacing: '1.5px', color: '#FEC400', marginBottom: '10px', textTransform: 'uppercase' }}>Exhibition Booth</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {row('#FEC400', 'Open booth for maximum engagement with attendees', 2)}
                {row('#FEC400', 'Custom backdrop with Gujarat JUG Community Day branding & your company logo', 3)}
                {row('#FEC400', 'Booth setup: 1 Table, 2 Chairs, and an Electrical Plug', 4)}
                {row('#FEC400', 'Ample time for interaction with 300+ attendees', 5)}
              </div>
            </div>

            {/* See more toggle */}
            <button
              onClick={() => setShowMore(v => !v)}
              style={{
                marginTop: '16px',
                background: 'none',
                border: 'none',
                color: '#FEC400',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 600,
                padding: '4px 0',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'opacity .2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.75')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              {showMore ? 'See less' : 'See more...'}
              <span style={{ display: 'inline-block', transform: showMore ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform .25s ease' }}>▼</span>
            </button>

            {showMore && (
              <div style={{ marginTop: '14px', animation: 'fadeIn .3s ease' }}>
                <div style={{ display: 'inline-block', padding: '5px 12px', borderRadius: '20px', background: 'rgba(254,196,0,.15)', color: '#FEC400', fontWeight: 700, fontSize: '12px', letterSpacing: '1.2px', textTransform: 'uppercase', marginBottom: '14px' }}>Platinum Sponsor — cont'd</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {row('#FEC400', 'Your logo featured on attendee passes & lanyards', 6)}
                  {row('#FEC400', 'Your company logo displayed on conference website, agenda schedule, registration desk & stage', 7)}
                  {row('#FEC400', 'Social Media Package for brand promotion across all Gujarat JUG social media platforms', 8)}
                  {row('#FEC400', '5 Complimentary Passes for representatives from your company to attend the event', 9)}
                </div>
              </div>
            )}

            <a href={MAIL} style={{ marginTop: 'auto', paddingTop: '28px', display: 'block', textAlign: 'center', background: '#FF384B', color: '#fff', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1px', padding: '15px', borderRadius: '40px', textDecoration: 'none', boxShadow: '0 10px 28px rgba(255,56,75,.32)' }} data-cta="1" onMouseEnter={h.btnOn} onMouseLeave={h.btnOff}>Reserve Platinum</a>
          </div>
          {/* Gold */}
          <div data-reveal data-reveal-d="100" style={{ position: 'relative', padding: '40px 34px', borderRadius: '26px', background: 'rgba(255,255,255,.04)', border: '1.5px solid rgba(2,207,112,.35)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'inline-block', padding: '6px 14px', borderRadius: '30px', background: '#02CF70', color: '#0E1667', fontWeight: 800, fontSize: '11px', letterSpacing: '2px' }}>GOLD</div>
            <div style={{ margin: '22px 0 4px', fontWeight: 900, fontSize: '44px', lineHeight: 1 }}>₹25,000</div>
            <div style={{ fontSize: '14px', color: '#9aa3d6', marginBottom: '24px' }}>≈ $300 · Networking &amp; branding opportunities</div>

            {/* Exhibition Booth */}
            <div>
              <div style={{ fontWeight: 700, fontSize: '13px', letterSpacing: '1.5px', color: '#02CF70', marginBottom: '10px', textTransform: 'uppercase' }}>Exhibition Booth</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {row('#02CF70', 'Open booth for maximum engagement with attendees', 0)}
                {row('#02CF70', 'Custom backdrop with Gujarat JUG Community Day branding & your company logo', 1)}
                {row('#02CF70', 'Booth setup: 1 Table, 2 Chairs, and an Electrical Plug', 2)}
                {row('#02CF70', 'Ample time for interaction with 300+ attendees', 3)}
              </div>
            </div>

            {/* See more toggle */}
            <button
              onClick={() => setShowMoreGold(v => !v)}
              style={{
                marginTop: '16px',
                background: 'none',
                border: 'none',
                color: '#02CF70',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 600,
                padding: '4px 0',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'opacity .2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.75')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              {showMoreGold ? 'See less' : 'See more...'}
              <span style={{ display: 'inline-block', transform: showMoreGold ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform .25s ease' }}>▼</span>
            </button>

            {showMoreGold && (
              <div style={{ marginTop: '14px', animation: 'fadeIn .3s ease' }}>
                <div style={{ display: 'inline-block', padding: '5px 12px', borderRadius: '20px', background: 'rgba(2,207,112,.15)', color: '#02CF70', fontWeight: 700, fontSize: '12px', letterSpacing: '1.2px', textTransform: 'uppercase', marginBottom: '14px' }}>Gold Sponsor — cont'd</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {row('#02CF70', 'Your logo featured on attendee passes & lanyards', 4)}
                  {row('#02CF70', 'Your company logo displayed on conference website, agenda schedule, registration desk & stage', 5)}
                  {row('#02CF70', 'Social Media Package for brand promotion across all Gujarat JUG social media platforms', 6)}
                  {row('#02CF70', '3 Complimentary Passes for representatives from your company to attend the event', 7)}
                </div>
              </div>
            )}

            <a href={MAIL} style={{ marginTop: 'auto', paddingTop: '28px', display: 'block', textAlign: 'center', background: 'transparent', border: '1.5px solid rgba(2,207,112,.4)', color: '#fff', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1px', padding: '15px', borderRadius: '40px', textDecoration: 'none' }} onMouseEnter={h.ghostOn} onMouseLeave={h.ghostOff}>Reserve Gold</a>
          </div>
        </div>

        {/* Community Supporter */}
        <div data-reveal data-reveal-d="200" style={{ marginTop: '40px', maxWidth: '1080px', margin: '40px auto 0' }}>
          <div style={{ position: 'relative', padding: '40px 34px', borderRadius: '26px', background: 'linear-gradient(160deg, rgba(255,255,255,.06), rgba(255,255,255,.02))', border: '1.5px solid rgba(168,176,224,.25)', overflow: 'hidden' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
              <div style={{ display: 'inline-block', padding: '6px 14px', borderRadius: '30px', background: 'rgba(168,176,224,.18)', color: '#a8b0e0', fontWeight: 800, fontSize: '11px', letterSpacing: '2px' }}>COMMUNITY SUPPORTER</div>
            </div>
            <div style={{ margin: '18px 0 4px', fontWeight: 900, fontSize: '44px', lineHeight: 1 }}>₹5,000</div>
            <div style={{ fontSize: '14px', color: '#9aa3d6', marginBottom: '24px' }}>≈ $75 · Perfect for individual Java advocates and community supporters!</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '10px' }}>
              {row('#a8b0e0', <><strong>Social Media Shoutout</strong> — Recognizing your support across our social media channels</>, 0)}
              {row('#a8b0e0', <><strong>VIP Experience</strong> — Front-row seating & access to the VIP networking lounge</>, 1)}
              {row('#a8b0e0', <><strong>Special Lunch + Networking</strong> — Exclusive opportunity to interact with speakers & Java experts</>, 2)}
              {row('#a8b0e0', <><strong>Recognition on Stage</strong> — A token of appreciation and a special shoutout at the event</>, 3)}
              {row('#a8b0e0', <><strong>Exclusive Goodies</strong> — Limited-edition Gujarat JUG swag!</>, 4)}
              {row('#a8b0e0', <><strong>+1 Complimentary Pass</strong> — Invite your colleagues or friends to join the event</>, 5)}
            </div>
            <a href={MAIL} style={{ marginTop: '28px', display: 'inline-block', textAlign: 'center', background: 'transparent', border: '1.5px solid rgba(168,176,224,.3)', color: '#fff', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1px', padding: '15px 40px', borderRadius: '40px', textDecoration: 'none' }} onMouseEnter={h.ghostOn} onMouseLeave={h.ghostOff}>Become a Supporter</a>
          </div>
        </div>
      </div>
    </section>
  )
}
