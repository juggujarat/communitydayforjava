import { h } from '../lib/handlers'
import { SponsorShapes } from '../lib/decor'
import { Icon } from '../lib/icons'

const DECK_ID = '1HRvy4j8G7B_0tfvsxr3V5fmiTW7-pGHECAZ7WPTncBE'

/** Google Slides deck embed URL (manual navigation, no auto-advance). */
const SLIDES_EMBED = `https://docs.google.com/presentation/d/${DECK_ID}/embed`

/** Direct PDF export of the deck for download. */
const DECK_DOWNLOAD = `https://docs.google.com/presentation/d/${DECK_ID}/export/pdf`

/** WhatsApp chat with the organizer (98791 29867 → +91 98791 29867). */
const WHATSAPP =
  'https://wa.me/919879129867?text=Hi%2C%20I%27m%20interested%20in%20sponsoring%20Community%20Day%20for%20Java%202026.'

/** Sponsorship opportunities (#sponsor): embedded Google Slides deck. */
export default function Sponsor() {
  return (
    <section id="sponsor" style={{ position: 'relative', padding: '78px 40px', background: '#0A0E3A', overflow: 'hidden' }}>
      <SponsorShapes />
      <div style={{ position: 'relative', zIndex: 3, maxWidth: '1080px', margin: '0 auto' }}>
        <div data-reveal style={{ textAlign: 'center', marginBottom: '56px' }}>
          <h2 style={{ margin: 0, fontWeight: 500, fontSize: 'clamp(32px,5vw,64px)', lineHeight: 1, letterSpacing: '-1.5px' }}>Sponsorship <span style={{ fontFamily: "'Roboto',sans-serif", fontWeight: 600, color: '#02CF70' }}>opportunities</span></h2>
          <p style={{ margin: '18px auto 0', maxWidth: '560px', fontSize: '18px', fontWeight: 500, color: '#a8b0e0' }}>Connect, showcase and engage top talent at Gujarat's largest Java gathering: 600+ engaged, high-intent attendees.</p>
        </div>

        {/* Google Slides deck — responsive 16:9 embed */}
        <div data-reveal style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', borderRadius: '26px', overflow: 'hidden', border: '1.5px solid rgba(168,176,224,.25)', boxShadow: '0 20px 60px rgba(0,0,0,.35)' }}>
          <iframe
            src={SLIDES_EMBED}
            title="Community Day for Java — Sponsorship opportunities"
            allowFullScreen
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
          />
        </div>

        {/* Action buttons */}
        <div data-reveal style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px', marginTop: '40px' }}>
          <a href={DECK_DOWNLOAD} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: '#FF384B', color: '#fff', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1px', fontSize: '14px', padding: '15px 32px', borderRadius: '40px', textDecoration: 'none', boxShadow: '0 10px 28px rgba(255,56,75,.32)' }} data-cta="1" onMouseEnter={h.btnOn} onMouseLeave={h.btnOff}>Download Sponsor Deck</a>
          <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'transparent', border: '1.5px solid rgba(2,207,112,.5)', color: '#fff', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1px', fontSize: '14px', padding: '15px 32px', borderRadius: '40px', textDecoration: 'none' }} onMouseEnter={h.ghostOn} onMouseLeave={h.ghostOff}><Icon type="whatsapp" />WhatsApp 98791 29867</a>
        </div>
      </div>
    </section>
  )
}
