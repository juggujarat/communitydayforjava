import { useState } from 'react'
import { h } from '../lib/handlers'
import { SocialLink } from '../lib/icons'
import { SOCIALS } from '../lib/socials'
import { TICKETS_COMING_SOON } from '../lib/links'

/** Links + social handles shown inside the mobile menu panel. */
const MENU_LINKS = [
  { href: '#speakers', label: 'Speakers' },
  { href: '#venue', label: 'Venue' },
  { href: '#agenda', label: 'Tracks' },
  { href: '#sponsors-wall', label: 'Sponsor' },
  { href: '#organizers', label: 'Organizers' },
]

/** Announcement bar + fixed nav + mobile sticky CTA + mobile menu. */
export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const close = () => setMenuOpen(false)

  return (
    <>
      <nav id="cdj-nav" style={{ position: 'fixed', top: '0', left: '0', right: '0', zIndex: '100', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 40px', transition: 'background .35s ease, padding .35s ease, box-shadow .35s ease', background: 'transparent' }}>
        <a href="#top" style={{ display: 'flex', alignItems: 'center', gap: '13px', textDecoration: 'none' }}>
          <img src="/assets/cd2b3de0-e87e-45cf-8bd3-459baf76597f.svg" alt="Community Day for Java" style={{ height: '74px', width: 'auto', display: 'block' }} />
        </a>
        <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
          <div id="cdj-nav-links" style={{ display: 'none', alignItems: 'center', gap: '28px' }}>
            <a href="#speakers" style={{ fontSize: '13px', fontWeight: '600', letterSpacing: '.3px', color: '#cdd3f0', textDecoration: 'none' }} onMouseEnter={h.linkOn} onMouseLeave={h.linkOff}>Speakers</a>
            <a href="#venue" style={{ fontSize: '13px', fontWeight: '600', letterSpacing: '.3px', color: '#cdd3f0', textDecoration: 'none' }} onMouseEnter={h.linkOn} onMouseLeave={h.linkOff}>Venue</a>
            <a href="#agenda" style={{ fontSize: '13px', fontWeight: '600', letterSpacing: '.3px', color: '#cdd3f0', textDecoration: 'none' }} onMouseEnter={h.linkOn} onMouseLeave={h.linkOff}>Tracks</a>
            <a href="#sponsors-wall" style={{ fontSize: '13px', fontWeight: '600', letterSpacing: '.3px', color: '#cdd3f0', textDecoration: 'none' }} onMouseEnter={h.linkOn} onMouseLeave={h.linkOff}>Sponsor</a>
            <a href="#organizers" style={{ fontSize: '13px', fontWeight: '600', letterSpacing: '.3px', color: '#cdd3f0', textDecoration: 'none' }} onMouseEnter={h.linkOn} onMouseLeave={h.linkOff}>Organizers</a>
          </div>
          <a href="#sponsor" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#FF384B', color: '#fff', fontWeight: '500', textTransform: 'uppercase', fontSize: '13px', letterSpacing: '1px', padding: '11px 20px', borderRadius: '40px', textDecoration: 'none', boxShadow: '0 6px 22px rgba(255,56,75,.34)' }} data-cta="1" onMouseEnter={h.btnOn} onMouseLeave={h.btnOff}>Become Sponsor</a>
          <button id="cdj-burger" type="button" aria-label="Open menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(true)} style={{ display: 'none', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', padding: '6px', margin: 0, lineHeight: 0 }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M3 6h18" /><path d="M3 12h18" /><path d="M3 18h18" /></svg>
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div onClick={close} style={{ position: 'fixed', inset: 0, zIndex: 400, background: 'rgba(8,10,40,.55)', backdropFilter: 'blur(3px)', WebkitBackdropFilter: 'blur(3px)', display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-end', padding: '12px', animation: 'fadeIn .2s ease' }}>
          <div onClick={e => e.stopPropagation()} style={{ marginTop: '54px', width: '100%', maxWidth: '360px', background: '#fff', borderRadius: '20px', padding: '26px 26px 28px', boxShadow: '0 30px 70px rgba(0,0,0,.42)', position: 'relative' }}>
            <button type="button" onClick={close} aria-label="Close menu" style={{ position: 'absolute', top: '18px', right: '18px', background: 'transparent', border: 'none', color: '#0E1667', cursor: 'pointer', padding: '4px', lineHeight: 0 }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
            </button>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {MENU_LINKS.map(l => (
                <a key={l.href} href={l.href} onClick={close} style={{ padding: '9px 0', fontSize: '19px', fontWeight: 700, color: '#0E1667', textDecoration: 'none', letterSpacing: '-.2px' }}>{l.label}</a>
              ))}
            </div>
            <div style={{ borderTop: '1px solid rgba(14,22,103,.12)', margin: '16px 0 14px' }} />
            <p style={{ margin: '0 0 12px', fontSize: '13.5px', fontWeight: 600, color: '#42498a' }}>Follow our social handles for more updates.</p>
            <div style={{ display: 'flex', gap: '10px' }}>
              {SOCIALS.map((s, i) => <SocialLink key={i} social={s} variant="light" />)}
            </div>
          </div>
        </div>
      )}

      <div id="cdj-sticky-cta" style={{ display: 'none', position: 'fixed', left: '0', right: '0', bottom: '0', zIndex: '300', padding: '10px 14px', background: 'rgba(13,19,70,.94)', backdropFilter: 'blur(10px)', borderTop: '1px solid rgba(255,255,255,.12)' }}>
        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#FF384B', color: '#fff', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '14px', padding: '14px', borderRadius: '46px', cursor: 'default' }}>{TICKETS_COMING_SOON}</span>
      </div>
    </>
  )
}
