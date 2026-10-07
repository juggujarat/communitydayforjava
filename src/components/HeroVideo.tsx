import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

/** CD4J 2025 teaser on the JUG Gujarat YouTube channel. */
export const HIGHLIGHTS_ID = '8Q4lAQ9kW44'
/** % of the video frame height cropped off the top to hide its burned-in logos. */
const CROP_TOP = 18
const POSTER =`https://i.ytimg.com/vi/${HIGHLIGHTS_ID}/maxresdefault.jpg`

/**
 * Hero backdrop: the 2025 teaser, muted and looping behind the headline so the
 * visitor feels the event before reading a word. The poster frame paints immediately; the
 * iframe is only mounted after the page has loaded, and not at all on phones, Save-Data
 * connections or for visitors who prefer reduced motion (they keep the poster, and the
 * "Watch the teaser" button still opens the full video with sound).
 */
export function HeroVideoBackdrop() {
  const [play, setPlay] = useState(false)
  const [ready, setReady] = useState(false)
  const frame = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
    const skip =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      window.matchMedia('(max-width: 768px)').matches ||
      conn?.saveData === true
    if (skip) return
    let t: number
    const start = () => { t = window.setTimeout(() => setPlay(true), 400) }
    if (document.readyState === 'complete') start()
    else window.addEventListener('load', start, { once: true })
    return () => { window.removeEventListener('load', start); window.clearTimeout(t) }
  }, [])

  // Loop and fade-in are driven through YouTube's postMessage API (enablejsapi=1) instead of
  // `loop=1&playlist=ID`: a playlist makes the embed draw its own prev / pause / next overlay
  // on top of the footage. Without it the player shows no chrome at all.
  useEffect(() => {
    if (!play) return
    const post = (msg: object) => frame.current?.contentWindow?.postMessage(JSON.stringify(msg), '*')
    const onMessage = (e: MessageEvent) => {
      if (e.source !== frame.current?.contentWindow || typeof e.data !== 'string') return
      let data: { event?: string; info?: unknown }
      try { data = JSON.parse(e.data) } catch { return }
      if (data.event === 'onReady') post({ event: 'listening', id: 1, channel: 'widget' })
      const info = data.info as { playerState?: number } | number | undefined
      const state = data.event === 'onStateChange' ? info : data.event === 'infoDelivery' && info && typeof info === 'object' ? info.playerState : undefined
      if (state === 1) setReady(true)
      if (state === 0) {
        setReady(false)
        post({ event: 'command', func: 'seekTo', args: [0, true] })
        post({ event: 'command', func: 'playVideo', args: [] })
      }
    }
    window.addEventListener('message', onMessage)
    // If YouTube never reports back, still reveal the video rather than keep the poster forever.
    const fallback = window.setTimeout(() => setReady(true), 8000)
    return () => { window.removeEventListener('message', onMessage); window.clearTimeout(fallback) }
  }, [play])

  const src =
    `https://www.youtube-nocookie.com/embed/${HIGHLIGHTS_ID}?autoplay=1&mute=1&enablejsapi=1` +
    '&controls=0&disablekb=1&fs=0&modestbranding=1&playsinline=1&rel=0&iv_load_policy=3'

  return (
    <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden', background: '#0E1667', pointerEvents: 'none' }}>
      {/* The reel has CDJ and JUG Gujarat logos burned into its top corners, which would
          double up with our own nav. They can't be removed from a YouTube embed, so the
          frame is oversized and pushed up by CROP_TOP so that strip falls outside the hero
          (overflow hidden). Poster and iframe share this frame so they line up. Width is
          120% of a plain "cover" fit, which leaves the visible 82% still covering the hero. */}
      <div style={{ position: 'absolute', top: 0, left: '50%', width: 'max(120vw, 256vh)', aspectRatio: '16 / 9', transform: `translate(-50%, -${CROP_TOP}%)` }}>
        <img src={POSTER} alt="" decoding="async" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        {play && (
          <iframe
            ref={frame}
            title="Community Day for Java 2025 teaser (background)"
            src={src}
            tabIndex={-1}
            allow="autoplay; encrypted-media"
            referrerPolicy="strict-origin-when-cross-origin"
            onLoad={() => frame.current?.contentWindow?.postMessage(JSON.stringify({ event: 'listening', id: 1, channel: 'widget' }), '*')}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none', opacity: ready ? 1 : 0, transition: 'opacity 1s ease' }}
          />
        )}
      </div>
      {/* Navy wash keeps the headline readable and the brand colour dominant. */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(14,22,103,.8) 0%, rgba(19,28,86,.66) 38%, rgba(14,22,103,.9) 100%)' }} />
    </div>
  )
}

/** Lightbox: the full teaser with sound (opened from a user gesture, so autoplay is allowed). */
export function HighlightsModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = prev }
  }, [onClose])

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Community Day for Java 2025 teaser"
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', background: 'rgba(7,11,52,.88)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)', animation: 'fadeIn .18s ease' }}
    >
      <div onClick={(e) => e.stopPropagation()} style={{ position: 'relative', width: '100%', maxWidth: 'min(1100px, 170vh)', aspectRatio: '16 / 9', borderRadius: '16px', overflow: 'hidden', background: '#000', boxShadow: '0 40px 90px rgba(0,0,0,.6)' }}>
        <iframe
          title="Community Day for Java 2025 teaser"
          src={`https://www.youtube-nocookie.com/embed/${HIGHLIGHTS_ID}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
        />
      </div>
      <button
        type="button"
        aria-label="Close video"
        onClick={onClose}
        style={{ position: 'absolute', top: '16px', right: '16px', width: '42px', height: '42px', borderRadius: '50%', border: 'none', cursor: 'pointer', background: 'rgba(255,255,255,.14)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
      </button>
    </div>,
    document.body,
  )
}
