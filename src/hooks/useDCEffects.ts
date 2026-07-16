import { useEffect } from 'react'

/**
 * Scroll- and mount-driven behaviors ported from the original bundle's DCLogic
 * (componentDidMount / tick / initReveals / styleCTAs / setNav / initLightbox).
 *
 * Everything is DOM-driven via `data-*` selectors — exactly as the original was —
 * so it applies to whatever sections are rendered, section-agnostic. The nav is
 * located by `#cdj-nav` (its links by `#cdj-nav-links`) instead of a bound ref.
 */
export function useDCEffects() {
  useEffect(() => {
    let scrolled = false
    let raf = 0

    const animateCount = (el: HTMLElement) => {
      if (el.dataset.done) return
      el.dataset.done = '1'
      const target = parseFloat(el.dataset.count || '0')
      const suffix = el.dataset.suffix || ''
      const decimals = (String(el.dataset.count).split('.')[1] || '').length
      const dur = 1500
      const start = performance.now()
      const fmt = (v: number) => (decimals ? v.toFixed(decimals) : Math.round(v).toLocaleString('en-IN')) + suffix
      const step = (now: number) => {
        const p = Math.min(1, (now - start) / dur)
        const e = 1 - Math.pow(1 - p, 3)
        el.textContent = fmt(target * e)
        if (p < 1) requestAnimationFrame(step)
        else el.textContent = fmt(target)
      }
      requestAnimationFrame(step)
      setTimeout(() => { el.textContent = fmt(target) }, dur + 400)
    }

    const initReveals = () => {
      document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
        if (el.dataset.revInit) return
        el.dataset.revInit = '1'
        el.style.opacity = '0'
        el.style.transform = 'translateY(38px)'
        el.style.transition = 'opacity .85s cubic-bezier(.2,.7,.2,1), transform .85s cubic-bezier(.2,.7,.2,1)'
        el.style.transitionDelay = ((parseInt(el.dataset.revealD || '0') || 0) / 1000) + 's'
      })
    }

    const tick = () => {
      const vh = window.innerHeight
      const now = performance.now()
      document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
        if (!el.dataset.revShown) {
          const r = el.getBoundingClientRect()
          if (r.top < vh * 0.92 && r.bottom > 0) {
            el.dataset.revShown = '1'; el.dataset.shownAt = String(now)
            el.style.opacity = '1'; el.style.transform = 'none'
          }
        } else if (!el.dataset.revFin && now - parseFloat(el.dataset.shownAt || '0') > 1100) {
          el.dataset.revFin = '1'; el.style.transition = 'none'; el.style.opacity = '1'; el.style.transform = 'none'
        }
      })
      document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
        if (el.dataset.done) return
        const r = el.getBoundingClientRect()
        if (r.top < vh * 0.85 && r.bottom > 0) animateCount(el)
      })
      const nav = document.getElementById('cdj-nav')
      const y = window.scrollY || window.pageYOffset
      if (nav) {
        if (y > 40) {
          nav.style.background = 'rgba(13,19,70,.88)'; nav.style.backdropFilter = 'blur(12px)'
          nav.style.boxShadow = '0 8px 30px rgba(0,0,0,.28)'; nav.style.padding = '12px 40px'
        } else {
          nav.style.background = 'transparent'; nav.style.backdropFilter = 'none'
          nav.style.boxShadow = 'none'; nav.style.padding = '18px 40px'
        }
      }
      document.querySelectorAll<HTMLElement>('[data-zoom]').forEach((wrap) => {
        const img = wrap.querySelector('img') as HTMLElement | null
        if (!img) return
        const r = wrap.getBoundingClientRect()
        const prog = 1 - Math.min(1, Math.max(0, (r.top + r.height) / (vh + r.height)))
        img.style.transform = `scale(${(1.04 + prog * 0.16).toFixed(3)})`
      })
    }

    const revealAll = () => {
      document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
        el.dataset.revShown = '1'; el.dataset.revFin = '1'
        el.style.transition = 'none'; el.style.opacity = '1'; el.style.transform = 'none'
      })
      document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => animateCount(el))
    }

    const styleCTAs = () => {
      document.querySelectorAll<HTMLElement>('[data-cta]').forEach((b) => {
        b.style.backgroundImage = 'linear-gradient(90deg,#FEC400 0%,#FEC400 50%,#FF384B 50%,#FF384B 100%)'
        b.style.backgroundColor = '#FF384B'
        b.style.backgroundSize = '200% 100%'
        b.style.backgroundPosition = '100% 0'
        b.style.color = '#fff'
        b.style.border = 'none'
        b.style.boxShadow = '0 8px 24px rgba(255,56,75,.34)'
        b.style.transition = 'background-position .5s cubic-bezier(.4,0,.2,1), color .35s ease, transform .3s ease, box-shadow .3s ease'
      })
    }

    const setNav = () => {
      const links = document.getElementById('cdj-nav-links')
      if (links) links.style.display = window.innerWidth > 880 ? 'flex' : 'none'
    }

    let lightboxInit = false
    const initLightbox = () => {
      if (lightboxInit) return
      lightboxInit = true
      const ov = document.createElement('div')
      ov.style.cssText = 'position:fixed; inset:0; z-index:1000; display:none; align-items:center; justify-content:center; background:rgba(8,10,40,.93); backdrop-filter:blur(6px); padding:18px; box-sizing:border-box;'
      const img = document.createElement('img')
      img.style.cssText = 'max-width:100%; max-height:100%; border-radius:10px; box-shadow:0 24px 70px rgba(0,0,0,.55); object-fit:contain; display:block;'
      const close = document.createElement('button')
      close.type = 'button'; close.setAttribute('aria-label', 'Close'); close.innerHTML = '&times;'
      close.style.cssText = 'position:absolute; top:16px; right:16px; width:44px; height:44px; border:none; border-radius:50%; background:rgba(255,255,255,.16); color:#fff; font-size:26px; line-height:1; cursor:pointer; display:grid; place-items:center;'
      ov.appendChild(img); ov.appendChild(close)
      document.body.appendChild(ov)
      const hide = () => { ov.style.display = 'none'; document.body.style.overflow = '' }
      ov.addEventListener('click', hide)
      close.addEventListener('click', (e) => { e.stopPropagation(); hide() })
      img.addEventListener('click', (e) => e.stopPropagation())
      window.addEventListener('keydown', (e) => { if (e.key === 'Escape') hide() })
      const gal = document.getElementById('gallery')
      if (gal) {
        gal.addEventListener('click', (e) => {
          const t = (e.target as HTMLElement).closest('img') as HTMLImageElement | null
          if (!t) return
          img.src = t.src; ov.style.display = 'flex'; document.body.style.overflow = 'hidden'
        })
      }
      return ov
    }

    // ---- componentDidMount ----
    const introTimer = setTimeout(() => {
      const intro = document.getElementById('cdj-intro')
      if (intro) intro.style.display = 'none'
    }, 1200)
    initReveals()
    requestAnimationFrame(() => requestAnimationFrame(() => tick()))
    const onScroll = () => {
      if ((window.scrollY || window.pageYOffset) > 40) scrolled = true
      if (raf) return
      raf = requestAnimationFrame(() => { raf = 0; tick() })
    }
    const onResize = () => { setNav(); onScroll() }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    setNav()
    let n = 0
    const iv = setInterval(() => { initReveals(); tick(); if (++n > 24) clearInterval(iv) }, 250)
    styleCTAs(); const ctaTimer = setTimeout(styleCTAs, 700)
    const ov = initLightbox()
    const idleTimer = setTimeout(() => { if (!scrolled) revealAll() }, 1800)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      clearInterval(iv)
      clearTimeout(introTimer); clearTimeout(ctaTimer); clearTimeout(idleTimer)
      if (raf) cancelAnimationFrame(raf)
      if (ov && ov.parentNode) ov.parentNode.removeChild(ov)
    }
  }, [])
}
