import { useEffect, useRef, useState } from 'react'
import TicketsCta from './TicketsCta'

/** Links + social handles shown inside the mobile menu panel. */
const MENU_LINKS = [
  { href: '/agenda/', label: 'Agenda' },
  { href: '/badge/', label: 'Badge' },
  { href: '/speakers/', label: 'Speakers' },
  { href: '#sponsors-wall', label: 'Sponsor' },
  { href: '#organizers', label: 'Team' },
]

/** Which top-level link a URL path belongs to — drives the resting position of the glass highlight. */
const activeKey = (path: string): string | null => {
  const hit = MENU_LINKS.find((l) => !l.href.startsWith('#') && path.startsWith(l.href.replace(/\/$/, '')))
  return hit ? hit.href : null
}

const linkStyle: React.CSSProperties = { position: 'relative', zIndex: 1, display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '10px 13px', borderRadius: '999px', fontSize: '13px', fontWeight: 600, letterSpacing: '.3px', whiteSpace: 'nowrap', textDecoration: 'none', background: 'none', border: 'none', fontFamily: 'inherit', cursor: 'pointer', transition: 'color .25s ease' }

/**
 * Floating glass nav: a centred frosted pill (backdrop blur over whatever scrolls beneath)
 * with soft brand-coloured blobs drifting behind the glass, a highlight that slides to the
 * hovered link and rests on the current page's link, a spring entrance, and the Register
 * CTA on the right. Below 1040px the links collapse into the burger panel.
 *
 * `#cdj-nav` is only a click-through fixed wrapper; the scroll hook (useDCEffects) restyles
 * `#cdj-nav-pill` and toggles `#cdj-nav-links` by viewport width, so keep those ids.
 *
 * `hashPrefix` is prepended to the in-page anchors so the same nav can be reused on
 * standalone pages (e.g. `/cfp/` passes `"/"`, turning `#venue` into `/#venue`).
 */
export default function Nav({ hashPrefix = '' }: { hashPrefix?: string }) {
  const to = (href: string) => (href.startsWith('#') ? `${hashPrefix}${href}` : href)
  const [menuOpen, setMenuOpen] = useState(false)
  const [hover, setHover] = useState<string | null>(null)
  const [active, setActive] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const [ind, setInd] = useState({ left: 0, width: 0 })
  const items = useRef<Record<string, HTMLElement | null>>({})
  const close = () => setMenuOpen(false)

  useEffect(() => { setActive(activeKey(location.pathname)) }, [])

  // At the top the nav is the plain full-width bar; past 40px of scroll it morphs into the glass pill.
  useEffect(() => {
    const onScroll = () => setScrolled((window.scrollY || window.pageYOffset) > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Slide the highlight under the hovered link, else the current page's link.
  const target = hover ?? active
  useEffect(() => {
    const place = () => {
      const el = target ? items.current[target] : null
      if (el && el.offsetWidth) setInd({ left: el.offsetLeft, width: el.offsetWidth })
    }
    // Deferred a frame: the links container only becomes visible after the scroll hook's
    // first width check, and hidden elements measure 0.
    const raf = requestAnimationFrame(place)
    window.addEventListener('resize', place)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', place) }
  }, [target, scrolled])

  const hl = (key: string) => ({
    ref: (el: HTMLElement | null) => { items.current[key] = el },
    onMouseEnter: () => setHover(key),
    onMouseLeave: () => setHover(null),
    onFocus: () => setHover(key),
    onBlur: () => setHover(null),
  })

  return (
    <>
      <nav id="cdj-nav" data-scrolled={scrolled} style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, padding: scrolled ? '14px 24px 0' : '0 0 0', pointerEvents: 'none', transition: 'padding .5s cubic-bezier(.4,0,.2,1)' }}>
        <div id="cdj-nav-pill" data-scrolled={scrolled} style={{ position: 'relative', width: '100%', maxWidth: scrolled ? '1180px' : '1920px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px', padding: scrolled ? '10px 10px 10px 24px' : '18px 40px', borderRadius: scrolled ? '999px' : '0px', pointerEvents: 'auto', background: scrolled ? 'rgba(13,19,70,.66)' : 'rgba(13,19,70,0)', border: `1px solid ${scrolled ? 'rgba(255,255,255,.18)' : 'rgba(255,255,255,0)'}`, backdropFilter: scrolled ? 'blur(18px) saturate(160%)' : 'blur(0px) saturate(100%)', WebkitBackdropFilter: scrolled ? 'blur(18px) saturate(160%)' : 'blur(0px) saturate(100%)', boxShadow: scrolled ? '0 14px 40px rgba(5,8,40,.5), inset 0 1px 0 rgba(255,255,255,.2)' : '0 0 0 rgba(5,8,40,0), inset 0 1px 0 rgba(255,255,255,0)', transition: 'max-width .6s cubic-bezier(.4,0,.2,1), padding .5s cubic-bezier(.4,0,.2,1), border-radius .6s cubic-bezier(.4,0,.2,1), background .5s ease, border-color .5s ease, backdrop-filter .5s ease, box-shadow .5s ease' }}>
          {/* Ambient colour behind the glass, clipped to the pill. */}
          <span aria-hidden="true" style={{ position: 'absolute', inset: 0, borderRadius: 'inherit', overflow: 'hidden', pointerEvents: 'none', opacity: scrolled ? 1 : 0, transition: 'opacity .6s ease' }}>
            <span style={{ position: 'absolute', left: '14%', top: '-70%', width: '170px', height: '150px', borderRadius: '50%', background: '#FF384B', opacity: 0.38, filter: 'blur(34px)', animation: 'cdj-blob1 9s ease-in-out infinite' }} />
            <span style={{ position: 'absolute', right: '22%', bottom: '-80%', width: '190px', height: '150px', borderRadius: '50%', background: '#FEC400', opacity: 0.26, filter: 'blur(36px)', animation: 'cdj-blob2 11s ease-in-out infinite' }} />
          </span>

          <a href={to('#top')} aria-label="Community Day for Java, home" style={{ position: 'relative', display: 'flex', alignItems: 'center', textDecoration: 'none', flex: 'none' }}>
            <img src="/assets/cd2b3de0-e87e-45cf-8bd3-459baf76597f.svg" alt="Community Day for Java" style={{ height: scrolled ? '38px' : '74px', width: 'auto', display: 'block', transition: 'height .5s cubic-bezier(.4,0,.2,1)' }} />
          </a>

          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div id="cdj-nav-links" style={{ position: 'relative', display: 'none', alignItems: 'center', gap: '2px' }}>
              {/* The sliding glass highlight. */}
              <span aria-hidden="true" style={{ position: 'absolute', top: '2px', bottom: '2px', left: ind.left, width: ind.width, borderRadius: '999px', background: 'rgba(255,255,255,.15)', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,.2), 0 4px 14px rgba(0,0,0,.14)', opacity: scrolled && target && ind.width ? 1 : 0, transition: 'left .45s cubic-bezier(.34,1.56,.64,1), width .45s cubic-bezier(.34,1.56,.64,1), opacity .2s ease', pointerEvents: 'none' }} />

              {MENU_LINKS.map((l) => (
                <a key={l.href} href={to(l.href)} {...hl(l.href)} aria-current={active === l.href ? 'page' : undefined} style={{ ...linkStyle, color: target === l.href ? (scrolled ? '#fff' : '#FEC400') : '#cdd3f0' }}>{l.label}</a>
              ))}

            </div>

            <TicketsCta style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontWeight: '500', textTransform: 'uppercase', fontSize: '13px', letterSpacing: '1px', padding: '12px 22px', borderRadius: '40px', boxShadow: '0 6px 22px rgba(255,56,75,.34)' }} />
            <button id="cdj-burger" type="button" aria-label="Open menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(true)} style={{ display: 'none', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', padding: '6px', margin: 0, lineHeight: 0 }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M3 6h18" /><path d="M3 12h18" /><path d="M3 18h18" /></svg>
            </button>
          </div>
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
                <a key={l.href} href={to(l.href)} onClick={close} style={{ padding: '9px 0', fontSize: '19px', fontWeight: 700, color: '#0E1667', textDecoration: 'none', letterSpacing: '-.2px' }}>{l.label}</a>
              ))}
            </div>
          </div>
        </div>
      )}

      <div id="cdj-sticky-cta" style={{ display: 'none', position: 'fixed', left: '0', right: '0', bottom: '0', zIndex: '300', padding: '10px 14px', background: 'rgba(13,19,70,.94)', backdropFilter: 'blur(10px)', borderTop: '1px solid rgba(255,255,255,.12)' }}>
        <TicketsCta style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center', gap: '8px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '14px', padding: '14px', borderRadius: '46px' }} />
      </div>
    </>
  )
}
