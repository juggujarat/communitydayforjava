/**
 * KonfHub ticketing.
 *
 * Tickets are sold on KonfHub and the whole purchase flow (ticket list, quantities,
 * discount code, attendee form, payment) runs inside KonfHub's embeddable widget,
 * which TicketsModal loads in an iframe — the visitor never leaves this site, and
 * nothing is charged here. Payment must run on KonfHub: this is a static site with no
 * backend or payment gateway, so do NOT "simplify" this into a link to
 * konfhub.com/checkout (navigating away has been rejected).
 *
 * Because the widget is live, ticket names/prices/availability are NOT mirrored here;
 * only the ids are, to tell the widget which tickets to show and pre-select. Ids come
 * from the event's `ticketsData` and are also visible in a checkout link as
 * `?ticketId=<id>|<qty>`. Add an id below when a new ticket type is created on KonfHub,
 * otherwise it will not appear in the popup.
 *
 * BRANDING: the widget renders a footer image from the event's `checkout_footer_icon`
 * field, which defaults to a KonfHub logo. It cannot be hidden, restyled or cropped
 * from this side — it is replaced by uploading our own artwork under White Labelling in
 * the KonfHub event dashboard (https://events.konfhub.com), which is how TechSparks
 * shows "Powered by YourStory" instead. Fix it there, never with markup hacks here.
 */

/** KonfHub event slug — the last path segment of the public event URL. */
export const KONFHUB_EVENT = 'community-day-for-java-2026'

/** Public event page, linked from the popup as a fallback. */
export const KONFHUB_EVENT_URL = `https://konfhub.com/${KONFHUB_EVENT}`

/** KonfHub `ticket_id`s to offer, in display order. The first one starts at qty 1. */
export const KONFHUB_TICKET_IDS = [
  108132, // Regular Ticket
]

/** Widget theming — CDJ palette mapped onto KonfHub's colour params (hex, no `#`). */
const THEME = {
  bg: 'FFFFFF',
  secondaryBg: 'F5F6FC',
  ticketBg: 'FFFFFF',
  borderCl: 'E4E7F5',
  fontColor: '0E1667',
  ticketCl: '0E1667',
  btnColor: 'FF384B',
  fontFamily: 'Roboto',
  borderRadius: '14',
}

/**
 * Embeddable KonfHub checkout widget for this event.
 *
 * `tickets` is a comma-separated id list (which tickets to show) and `ticketId` is a
 * semicolon-separated `<id>|<qty>` list (their starting quantities); URLSearchParams
 * percent-encodes both separators, which is the form KonfHub's widget expects.
 */
export function widgetUrl() {
  const params = new URLSearchParams({
    ...THEME,
    desc: 'true',
    widget_type: 'standard',
    tickets: KONFHUB_TICKET_IDS.join(','),
    ticketId: KONFHUB_TICKET_IDS.map((id, i) => `${id}|${i === 0 ? 1 : 0}`).join(';'),
  })
  return `https://konfhub.com/widget/${KONFHUB_EVENT}?${params.toString()}`
}
