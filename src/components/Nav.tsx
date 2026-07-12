import { h } from '../lib/handlers'

const TICKET_MAILTO =
  'mailto:juggujarat@gmail.com?subject=Community%20Day%20for%20Java%20%E2%80%94%20Ticket%20registration'

/** Announcement bar + fixed nav + mobile sticky CTA. */
export default function Nav() {
  return (
    <>
      <nav id="cdj-nav" style={{ position: 'fixed', top: '0', left: '0', right: '0', zIndex: '100', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 40px', transition: 'background .35s ease, padding .35s ease, box-shadow .35s ease', background: 'transparent' }}>
        <a href="#top" style={{ display: 'flex', alignItems: 'center', gap: '13px', textDecoration: 'none' }}>
          <img src="/assets/cd2b3de0-e87e-45cf-8bd3-459baf76597f.svg" alt="Community Day for Java" style={{ height: '74px', width: 'auto', display: 'block' }} />
        </a>
        <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
          <div id="cdj-nav-links" style={{ display: 'none', alignItems: 'center', gap: '28px' }}>
            <a href="#why" style={{ fontSize: '13px', fontWeight: '600', letterSpacing: '.3px', color: '#cdd3f0', textDecoration: 'none' }} onMouseEnter={h.linkOn} onMouseLeave={h.linkOff}>Why</a>
            <a href="#speakers" style={{ fontSize: '13px', fontWeight: '600', letterSpacing: '.3px', color: '#cdd3f0', textDecoration: 'none' }} onMouseEnter={h.linkOn} onMouseLeave={h.linkOff}>Speakers</a>
            <a href="#agenda" style={{ fontSize: '13px', fontWeight: '600', letterSpacing: '.3px', color: '#cdd3f0', textDecoration: 'none' }} onMouseEnter={h.linkOn} onMouseLeave={h.linkOff}>Agenda</a>
            <a href="#venue" style={{ fontSize: '13px', fontWeight: '600', letterSpacing: '.3px', color: '#cdd3f0', textDecoration: 'none' }} onMouseEnter={h.linkOn} onMouseLeave={h.linkOff}>Venue</a>
            <a href="#partners" style={{ fontSize: '13px', fontWeight: '600', letterSpacing: '.3px', color: '#cdd3f0', textDecoration: 'none' }} onMouseEnter={h.linkOn} onMouseLeave={h.linkOff}>Partners</a>
            <a href="#sponsor" style={{ fontSize: '13px', fontWeight: '600', letterSpacing: '.3px', color: '#cdd3f0', textDecoration: 'none' }} onMouseEnter={h.linkOn} onMouseLeave={h.linkOff}>Sponsor</a>
          </div>
          <a href="#sponsor" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#FF384B', color: '#fff', fontWeight: '500', textTransform: 'uppercase', fontSize: '13px', letterSpacing: '1px', padding: '11px 20px', borderRadius: '40px', textDecoration: 'none', boxShadow: '0 6px 22px rgba(255,56,75,.34)' }} data-cta="1" onMouseEnter={h.btnOn} onMouseLeave={h.btnOff}>Become Sponsor</a>
        </div>
      </nav>

      <div id="cdj-sticky-cta" style={{ display: 'none', position: 'fixed', left: '0', right: '0', bottom: '0', zIndex: '300', padding: '10px 14px', background: 'rgba(13,19,70,.94)', backdropFilter: 'blur(10px)', borderTop: '1px solid rgba(255,255,255,.12)' }}>
        <a href={TICKET_MAILTO} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#FF384B', color: '#fff', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '14px', padding: '14px', borderRadius: '46px', textDecoration: 'none' }}>Register now →</a>
      </div>
    </>
  )
}
