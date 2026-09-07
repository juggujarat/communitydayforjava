import type { CSSProperties } from 'react'
import { h } from '../lib/handlers'
import { TICKETS_CTA_LABEL } from '../lib/links'
import { openTickets } from '../hooks/useTicketsModal'

/**
 * The ticket CTA chip — opens the shared ticket popup (rendered once in App.tsx) and
 * pushes the URL to /register. Keeps `data-cta` so useDCEffects applies the gradient
 * CTA styling at mount and the mobile full-width rule in global.css still matches;
 * `style` carries the per-placement sizing that used to sit on the <span>.
 */
export default function TicketsCta({ style, label = TICKETS_CTA_LABEL }: { style?: CSSProperties; label?: string }) {
  return (
    <button
      type="button"
      data-cta="1"
      onClick={openTickets}
      onMouseEnter={h.btnOn}
      onMouseLeave={h.btnOff}
      style={{ fontFamily: 'inherit', border: 'none', cursor: 'pointer', background: '#FF384B', color: '#fff', ...style }}
    >
      {label}
    </button>
  )
}
