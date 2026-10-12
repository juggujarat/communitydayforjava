import type { CSSProperties } from 'react'
import { TICKETS_CTA_LABEL } from '../lib/links'

/**
 * Ticket sales are closed. Keep the shared CTA in place, but render it disabled so
 * every placement communicates that tickets are purchased and cannot open checkout.
 */
export default function TicketsCta({ style, label = TICKETS_CTA_LABEL }: { style?: CSSProperties; label?: string }) {
  return (
    <button
      type="button"
      data-cta="1"
      disabled
      aria-label="Tickets purchased; registration is closed"
      style={{ fontFamily: 'inherit', border: 'none', cursor: 'not-allowed', opacity: 0.72, background: '#FF384B', color: '#fff', ...style }}
    >
      {label}
    </button>
  )
}
