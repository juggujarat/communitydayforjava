import { useState, type CSSProperties } from 'react'
import TicketsModal from './TicketsModal'
import { h } from '../lib/handlers'
import { TICKETS_COMING_SOON } from '../lib/links'

/**
 * The ticket CTA chip — opens the ticket picker popup.
 *
 * Every instance owns its own popup, so no shared state is needed across pages (only
 * the chip the visitor clicked can be open). Keeps `data-cta` so useDCEffects applies
 * the gradient CTA styling at mount and the mobile full-width rule in global.css still
 * matches; `style` carries the per-placement sizing that used to sit on the <span>.
 */
export default function TicketsCta({ style, label = TICKETS_COMING_SOON }: { style?: CSSProperties; label?: string }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button
        type="button"
        data-cta="1"
        onClick={() => setOpen(true)}
        onMouseEnter={h.btnOn}
        onMouseLeave={h.btnOff}
        style={{ fontFamily: 'inherit', border: 'none', cursor: 'pointer', background: '#FF384B', color: '#fff', ...style }}
      >
        {label}
      </button>
      {open && <TicketsModal onClose={() => setOpen(false)} />}
    </>
  )
}
