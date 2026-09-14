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
 * only the ids are, to pre-select starting quantities. Ids come from the event's
 * `ticketsData` and are also visible in a checkout link as `?ticketId=<id>|<qty>`.
 *
 * Do NOT add a `tickets=<id,id>` param to the widget URL. It looks like a "show only
 * these tickets" filter, but the widget answers ANY value of it — valid ids, category
 * ids, a single id — with "No tickets available", which is what emptied the popup.
 * Without it the widget lists everything the event has published. Verified by rendering
 * the widget headless against the live event on 2026-08-24.
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
  118543, // Regular — INR 599
  118531, // Regular Plus Workshop — INR 799
  118542, // Community Supporter — INR 5000
]

/**
 * Ticket tiers shown on /tickets' "Ticket Details" cards and the popup's "What's
 * included?" strip. The widget itself doesn't render per-ticket descriptions (KonfHub
 * only has a whole-event description field, which is what `desc` below controls), so
 * this content is plain copy here — update it by hand if KonfHub's names, prices, or
 * inclusions change.
 */
export const TICKET_PLANS = [
  {
    label: 'Regular Pass',
    price: '₹599',
    accent: '#0D5CDB',
    intro: [
      'Your ticket to the complete Community Day for Java 2026 experience.',
      "Spend the day learning from insightful Java talks, connecting with fellow developers and industry professionals, and being part of Gujarat's growing Java community.",
    ],
    included: [
      '🎤 Access to all regular conference talks and sessions',
      '🤝 Networking with Java developers, architects, students, and industry professionals',
      '🎁 Exclusive Community Day for Java goodies',
      '☕ Community interactions and networking',
      '📸 A full day of learning, conversations, and community',
    ],
    perfectFor: 'Anyone who wants to experience the conference, learn from the speakers, and connect with the Java community.',
    availableTill: '23rd Oct 2026, 06:00 PM (GMT+05:30)',
  },
  {
    label: 'Regular + Workshop Pass',
    price: '₹799',
    accent: '#FF384B',
    tagline: 'Workshop Pass = Everything in the Regular Pass + Hands-on Workshop',
    intro: [
      'Go beyond the talks. Learn by doing.',
      'Get the complete Community Day for Java 2026 experience plus access to an exclusive hands-on workshop designed to take your learning a step further.',
    ],
    included: [
      '🛠️ Access to the exclusive hands-on workshop',
      '🎤 Access to all regular conference talks and sessions',
      '🤝 Networking with Java developers, architects, students, and industry professionals',
      '🎁 Exclusive Community Day for Java goodies',
      '☕ Community interactions and networking',
      '📸 A full day of learning, hands-on experience, and community',
    ],
    perfectFor: 'Developers and Java enthusiasts who want to go beyond the talks and gain practical, hands-on experience.',
    availableTill: '23rd Oct 2026, 06:00 PM (GMT+05:30)',
  },
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
 * `ticketId` is a semicolon-separated `<id>|<qty>` list of starting quantities;
 * URLSearchParams percent-encodes both separators, which is the form the widget
 * expects. Which tickets are listed is decided by KonfHub, not by us — see the
 * `tickets=` warning above.
 *
 * `desc: 'false'` hides the event description block the widget otherwise renders
 * above the ticket list (pulled live from the event's description field on KonfHub) —
 * by request, the popup shows only the ticket picker. The wording itself can't be
 * edited from here either way; it lives on KonfHub's event dashboard.
 */
export function widgetUrl() {
  const params = new URLSearchParams({
    ...THEME,
    desc: 'false',
    widget_type: 'standard',
    ticketId: KONFHUB_TICKET_IDS.map((id, i) => `${id}|${i === 0 ? 1 : 0}`).join(';'),
  })
  return `https://konfhub.com/widget/${KONFHUB_EVENT}?${params.toString()}`
}
