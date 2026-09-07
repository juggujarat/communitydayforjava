import { useSyncExternalStore } from 'react'

/**
 * Shared open/close state for the tickets popup, so every `<TicketsCta>` instance
 * (Nav, Hero, Manifesto, Footer) opens the same single modal instance and the browser
 * URL reflects it as `/register` — without turning this into a real route: the popup
 * still renders in place, this only pushes/restores the address bar.
 *
 * `/register` has no page of its own. A hard load of it 404s on GitHub Pages, so
 * `public/404.html` bounces back to `/` with the path stashed in sessionStorage, and
 * an inline script in `index.html` restores it before this module (imported by
 * main.tsx) reads `location.pathname` below.
 */
const REGISTER_PATH = '/register'

type Listener = () => void
const listeners = new Set<Listener>()
let open = false
let prevPath: string | null = null

function emit() {
  listeners.forEach((l) => l())
}

function currentPath() {
  return location.pathname + location.search + location.hash
}

export function openTickets() {
  if (open) return
  if (location.pathname !== REGISTER_PATH) {
    prevPath = currentPath()
    history.pushState({ cdjTickets: true }, '', REGISTER_PATH)
  }
  open = true
  emit()
}

export function closeTickets() {
  if (!open) return
  open = false
  if (location.pathname === REGISTER_PATH) {
    history.replaceState(null, '', prevPath ?? '/')
  }
  prevPath = null
  emit()
}

if (typeof window !== 'undefined') {
  // Back/forward button while the popup is open just closes it — the pushState above
  // already put /register on top of the stack, so popping it is enough.
  window.addEventListener('popstate', () => {
    if (open) {
      open = false
      emit()
    }
  })
  // Deep link straight to /register (including the 404.html bounce-back): open already.
  if (location.pathname === REGISTER_PATH) {
    prevPath = '/'
    open = true
  }
}

export function useTicketsOpen() {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb)
      return () => listeners.delete(cb)
    },
    () => open,
  )
}
