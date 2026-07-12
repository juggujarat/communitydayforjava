/**
 * Interaction handlers ported verbatim from the original bundle's `renderVals()`.
 * Each mutates inline styles on the hovered element — the design tool wired these
 * to `onmouseenter`/`onmouseleave`; here they are plain React event handlers.
 */
type ME = React.MouseEvent<HTMLElement>

const el = (e: ME) => e.currentTarget as HTMLElement

export const h = {
  linkOn: (e: ME) => { el(e).style.color = '#FEC400' },
  linkOff: (e: ME) => {
    el(e).style.color = el(e).closest('footer') ? '#c3c9ee' : '#cdd3f0'
  },
  btnOn: (e: ME) => {
    const t = el(e)
    t.style.backgroundPosition = '0% 0'
    t.style.color = '#0E1667'
    t.style.transform = 'translateY(-3px)'
    t.style.boxShadow = '0 16px 40px rgba(254,196,0,.5)'
  },
  btnOff: (e: ME) => {
    const t = el(e)
    t.style.backgroundPosition = '100% 0'
    t.style.color = '#fff'
    t.style.transform = 'none'
    t.style.boxShadow = '0 8px 24px rgba(255,56,75,.34)'
  },
  ghostOn: (e: ME) => {
    el(e).style.background = 'rgba(255,255,255,.1)'
    el(e).style.borderColor = 'rgba(255,255,255,.6)'
  },
  ghostOff: (e: ME) => {
    el(e).style.background = 'transparent'
    el(e).style.borderColor = 'rgba(255,255,255,.32)'
  },
  socOn: (e: ME) => {
    const t = el(e)
    t.style.background = '#FEC400'
    t.style.color = '#0E1667'
    t.style.transform = 'translateY(-2px)'
  },
  socOff: (e: ME) => {
    const t = el(e)
    t.style.background = 'rgba(255,255,255,.08)'
    t.style.color = '#cdd3f0'
    t.style.transform = 'none'
  },
  cardOn: (e: ME) => {
    const t = el(e)
    t.style.transform = 'translateY(-6px)'
    t.style.background = 'rgba(255,255,255,.07)'
    t.style.borderColor = 'rgba(254,196,0,.4)'
    t.style.transition = 'all .3s ease'
  },
  cardOff: (e: ME) => {
    const t = el(e)
    t.style.transform = 'none'
    t.style.background = 'rgba(255,255,255,.04)'
    t.style.borderColor = 'rgba(255,255,255,.08)'
  },
  galOn: (e: ME) => {
    const c = el(e).firstElementChild as HTMLElement | null
    if (c) c.style.transform = 'scale(1.07)'
    el(e).style.borderColor = 'rgba(254,196,0,.45)'
  },
  galOff: (e: ME) => {
    const c = el(e).firstElementChild as HTMLElement | null
    if (c) c.style.transform = 'none'
    el(e).style.borderColor = 'rgba(255,255,255,.08)'
  },
  mqPause: (e: ME) => { el(e).style.animationPlayState = 'paused' },
  mqPlay: (e: ME) => { el(e).style.animationPlayState = 'running' },
  statOn: (e: ME) => {
    const t = el(e)
    t.style.transform = 'rotate(0deg) translateY(-16px) scale(1.05)'
    t.style.zIndex = '20'
    t.style.boxShadow = '0 42px 72px rgba(0,0,0,.6)'
    const im = t.querySelector('img') as HTMLElement | null
    if (im) { im.style.transition = 'transform .5s cubic-bezier(.2,.7,.2,1)'; im.style.transform = 'scale(1.1)' }
  },
  statOff: (e: ME) => {
    const t = el(e)
    t.style.transform = `rotate(${t.dataset.rot || 0}deg)`
    t.style.zIndex = ''
    t.style.boxShadow = '0 26px 52px rgba(0,0,0,.55)'
    const im = t.querySelector('img') as HTMLElement | null
    if (im) im.style.transform = 'none'
  },
  // Agenda track tabs: highlight the active tab and dim the other track columns.
  trackTab: (e: ME) => {
    const btn = el(e)
    const i = parseInt(btn.dataset.tab || '-1')
    const row = btn.parentElement
    if (row) {
      row.querySelectorAll<HTMLElement>('[data-tab]').forEach((b) => {
        const on = b === btn
        b.style.background = on ? (b.dataset.acc || 'transparent') : 'transparent'
        b.style.color = on ? '#fff' : '#5a6299'
      })
    }
    const tb = document.querySelector('#agenda table tbody')
    if (tb) {
      tb.querySelectorAll<HTMLElement>('tr').forEach((tr) => {
        if (tr.children.length === 4) {
          for (let c = 1; c <= 3; c++) {
            const cell = tr.children[c] as HTMLElement
            cell.style.transition = 'opacity .3s ease'
            cell.style.opacity = (i === -1 || c === i + 1) ? '1' : '0.22'
          }
        }
      })
    }
  },
}
