import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { TICKET_PLANS, widgetUrl } from '../lib/tickets'

const chevron = (open: boolean) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ flex: 'none', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .2s ease' }}>
    <path d="M6 9l6 6 6-6" />
  </svg>
)

/**
 * Ticket popup: KonfHub's embeddable checkout widget in an iframe, so the whole flow —
 * ticket list, quantities, discount code, attendee form and payment — happens inside
 * the popup and the visitor stays on this site. `allow="payment"` is what lets the
 * payment step run in-frame.
 *
 * The widget's footer image comes from the event's `checkout_footer_icon` on KonfHub
 * (see lib/tickets.ts) — replace it under White Labelling in their dashboard to show
 * CDJ branding instead of KonfHub's. It cannot be removed from this component.
 *
 * The "What's included?" strip above the iframe is our own content (TICKET_PLANS) —
 * KonfHub's widget doesn't render per-ticket descriptions itself, so this is the only
 * way to show that copy as part of the popup.
 *
 * Rendered in a portal on document.body (outside #dc-root) so the page's inline-style
 * attribute selectors in global.css can't reach into it; its own responsive rules are
 * scoped to the #cdj-tickets-* ids.
 */
export default function TicketsModal({ onClose }: { onClose: () => void }) {
  const [loaded, setLoaded] = useState(false)
  const [showIncluded, setShowIncluded] = useState(false)

  // Close on Escape and freeze the page behind the overlay while it is open. A click on
  // the backdrop deliberately does NOT close it — a stray click mid-checkout would throw
  // away whatever the visitor had already filled in. The X button is the way out.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [onClose])

  // Safety net: if the iframe's load event never reaches us, drop the spinner anyway
  // rather than leaving it covering a widget that has already painted.
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 6000)
    return () => clearTimeout(t)
  }, [])

  return createPortal(
    <div
      id="cdj-tickets-overlay"
      role="presentation"
      style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', background: 'rgba(7,11,52,.72)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)', animation: 'fadeIn .18s ease' }}
    >
      <div
        id="cdj-tickets-card"
        role="dialog"
        aria-modal="true"
        aria-label="Register for Community Day for Java 2026"
        style={{ position: 'relative', width: '100%', maxWidth: '940px', maxHeight: '92vh', overflowY: 'auto', WebkitOverflowScrolling: 'touch', background: '#fff', color: '#0E1667', borderRadius: '20px', boxShadow: '0 40px 90px rgba(0,0,0,.5)' }}
      >
        <button
          type="button"
          aria-label="Close tickets"
          onClick={onClose}
          style={{ position: 'absolute', top: '14px', right: '14px', zIndex: 5, width: '38px', height: '38px', borderRadius: '50%', border: 'none', cursor: 'pointer', background: 'rgba(14,22,103,.08)', color: '#0E1667', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background .2s ease, color .2s ease' }}
          onMouseEnter={(e) => { e.currentTarget.style.background = '#FF384B'; e.currentTarget.style.color = '#fff' }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(14,22,103,.08)'; e.currentTarget.style.color = '#0E1667' }}
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>

        <div id="cdj-tickets-included" style={{ padding: '18px 54px 4px 18px' }}>
          <button
            type="button"
            onClick={() => setShowIncluded((o) => !o)}
            aria-expanded={showIncluded}
            style={{ display: 'flex', width: '100%', alignItems: 'center', gap: '8px', background: '#F5F6FC', border: '1px solid #E4E7F5', borderRadius: '14px', padding: '12px 16px', fontFamily: 'inherit', fontSize: '13.5px', fontWeight: 700, color: '#0E1667', cursor: 'pointer', textAlign: 'left' }}
          >
            <span style={{ flex: 1 }}>What's included?</span>
            {chevron(showIncluded)}
          </button>

          {showIncluded && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', margin: '12px 0 4px' }}>
              {TICKET_PLANS.map((plan) => (
                <div key={plan.label} style={{ background: '#F5F6FC', border: '1px solid #E4E7F5', borderRadius: '14px', padding: '16px' }}>
                  <div style={{ fontSize: '15px', fontWeight: 800, color: '#0E1667', marginBottom: '2px' }}>{plan.label}</div>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: plan.accent, marginBottom: '12px' }}>{plan.price}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '10px' }}>
                    {plan.included.map((item) => <div key={item} style={{ fontSize: '12.5px', lineHeight: 1.5, color: '#42498a' }}>{item}</div>)}
                  </div>
                  <div style={{ fontSize: '12px', lineHeight: 1.5, color: '#5a6299' }}>
                    <strong style={{ color: '#0E1667' }}>Perfect for:</strong> {plan.perfectFor}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ position: 'relative' }}>
          {!loaded && (
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '14px', background: '#fff', borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px' }}>
              <span style={{ width: '34px', height: '34px', borderRadius: '50%', border: '3px solid rgba(14,22,103,.15)', borderTopColor: '#FF384B', animation: 'cdj-spin .8s linear infinite' }} />
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#6b73a8' }}>Loading tickets…</span>
            </div>
          )}

          <iframe
            id="cdj-tickets-frame"
            src={widgetUrl()}
            title="Community Day for Java 2026 tickets"
            allow="payment"
            onLoad={() => setLoaded(true)}
            style={{ display: 'block', width: '100%', height: '660px', border: 'none', borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px' }}
          />
        </div>
      </div>
    </div>,
    document.body,
  )
}
