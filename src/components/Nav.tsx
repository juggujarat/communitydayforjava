import { useEffect, useRef, useState } from 'react'
import { h } from '../lib/handlers'
import { SocialLink } from '../lib/icons'
import { SOCIALS } from '../lib/socials'
import { TICKETS_COMING_SOON } from '../lib/links'

/** Links + social handles shown inside the mobile menu panel. */
const MENU_LINKS = [
  { href: '#manifesto', label: 'Agenda' },
  { href: '#venue', label: 'Venue' },
  { href: '#speakers', label: 'Speakers' },
  { href: '#sponsors-wall', label: 'Sponsor' },
  { href: '#organizers', label: 'Team' },
]

/** Past editions of the event, linked out to their standalone JUG pages. */
const PAST_EDITIONS = [
  { year: '2025', href: 'https://www.gujaratjug.org/community-day-for-java-2025' },
]

const chevron = (open: boolean) => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .2s ease' }}>
    <path d="M6 9l6 6 6-6" />
  </svg>
)

/** Announcement bar + fixed nav + mobile sticky CTA + mobile menu. */
export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [pastOpen, setPastOpen] = useState(false)
  const pastRef = useRef<HTMLDivElement>(null)
  const close = () => setMenuOpen(false)

  useEffect(() => {
    // Only guards the DESKTOP dropdown (wrapped in pastRef). Skip when the mobile menu is open —
    // that dropdown isn't inside pastRef, so this mousedown handler would unmount the 2025 link
    // before its click fires, closing the dropdown without opening the link.
    if (!pastOpen || menuOpen) return
    const onClickOutside = (e: MouseEvent) => {
      if (pastRef.current && !pastRef.current.contains(e.target as Node)) setPastOpen(false)
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [pastOpen, menuOpen])

  return (
    <>
      <nav id="cdj-nav" style={{ position: 'fixed', top: '0', left: '0', right: '0', zIndex: '100', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 40px', transition: 'background .35s ease, padding .35s ease, box-shadow .35s ease', background: 'transparent' }}>
        <a href="#top" style={{ display: 'flex', alignItems: 'center', gap: '13px', textDecoration: 'none' }}>
          <img src="/assets/cd2b3de0-e87e-45cf-8bd3-459baf76597f.svg" alt="Community Day for Java" style={{ height: '74px', width: 'auto', display: 'block' }} />
        </a>
        <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
          <div id="cdj-nav-links" style={{ display: 'none', alignItems: 'center', gap: '28px' }}>
            <a href="#manifesto" style={{ fontSize: '13px', fontWeight: '600', letterSpacing: '.3px', color: '#cdd3f0', textDecoration: 'none' }} onMouseEnter={h.linkOn} onMouseLeave={h.linkOff}>Agenda</a>
            <a href="#venue" style={{ fontSize: '13px', fontWeight: '600', letterSpacing: '.3px', color: '#cdd3f0', textDecoration: 'none' }} onMouseEnter={h.linkOn} onMouseLeave={h.linkOff}>Venue</a>
            <a href="#speakers" style={{ fontSize: '13px', fontWeight: '600', letterSpacing: '.3px', color: '#cdd3f0', textDecoration: 'none' }} onMouseEnter={h.linkOn} onMouseLeave={h.linkOff}>Speakers</a>
            <a href="#sponsors-wall" style={{ fontSize: '13px', fontWeight: '600', letterSpacing: '.3px', color: '#cdd3f0', textDecoration: 'none' }} onMouseEnter={h.linkOn} onMouseLeave={h.linkOff}>Sponsor</a>
            <a href="#organizers" style={{ fontSize: '13px', fontWeight: '600', letterSpacing: '.3px', color: '#cdd3f0', textDecoration: 'none' }} onMouseEnter={h.linkOn} onMouseLeave={h.linkOff}>Team</a>
            <div ref={pastRef} style={{ position: 'relative' }}>
              <button
                type="button"
                onClick={() => setPastOpen((o) => !o)}
                aria-expanded={pastOpen}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: 'none', border: 'none', padding: 0, fontSize: '13px', fontWeight: 600, letterSpacing: '.3px', color: '#cdd3f0', cursor: 'pointer' }}
                onMouseEnter={h.linkOn} onMouseLeave={h.linkOff}
              >
                Past Edition {chevron(pastOpen)}
              </button>
              {pastOpen && (
                <div style={{ position: 'absolute', top: '28px', left: 0, minWidth: '120px', background: '#fff', borderRadius: '14px', padding: '8px', boxShadow: '0 20px 44px rgba(0,0,0,.3)' }}>
                  {PAST_EDITIONS.map((p) => (
                    <a
                      key={p.year}
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setPastOpen(false)}
                      style={{ display: 'block', padding: '8px 12px', borderRadius: '8px', fontSize: '13px', fontWeight: 700, color: '#0E1667', textDecoration: 'none' }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(14,22,103,.06)' }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
                    >
                      {p.year}
                    </a>
                  ))}
                </div>
              )}
            </div>
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
              <button
                type="button"
                onClick={() => setPastOpen((o) => !o)}
                aria-expanded={pastOpen}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', background: 'none', border: 'none', padding: '9px 0', fontSize: '19px', fontWeight: 700, color: '#0E1667', letterSpacing: '-.2px', cursor: 'pointer' }}
              >
                Past Edition {chevron(pastOpen)}
              </button>
              {pastOpen && (
                <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '12px' }}>
                  {/* Defer close: in React 18 a synchronous close() unmounts the <a> before the browser opens the target="_blank" link, losing the navigation. */}
                  {PAST_EDITIONS.map((p) => (
                    <a key={p.year} href={p.href} target="_blank" rel="noopener noreferrer" onClick={() => setTimeout(close, 0)} style={{ padding: '7px 0', fontSize: '16px', fontWeight: 600, color: '#42498a', textDecoration: 'none' }}>{p.year}</a>
                  ))}
                </div>
              )}
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
