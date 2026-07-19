import { useCallback } from 'react'

const btnStyle: React.CSSProperties = {
  width: 44, height: 44, borderRadius: '50%', border: 'none', cursor: 'pointer',
  background: 'rgba(19,28,86,.88)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
  boxShadow: '0 8px 22px rgba(0,0,0,.28)', backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)',
  transition: 'background .2s ease, transform .2s ease',
}

function onEnter(e: React.MouseEvent<HTMLButtonElement>) {
  e.currentTarget.style.background = '#FF384B'
  e.currentTarget.style.transform = 'translateY(-2px)'
}
function onLeave(e: React.MouseEvent<HTMLButtonElement>) {
  e.currentTarget.style.background = 'rgba(19,28,86,.88)'
  e.currentTarget.style.transform = 'none'
}

/** Sticky scroll-to-top / scroll-to-bottom buttons, fixed bottom-right on every viewport. */
export default function ScrollButtons() {
  const scrollToTop = useCallback(() => window.scrollTo({ top: 0, behavior: 'smooth' }), [])
  const scrollToBottom = useCallback(
    () => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' }),
    [],
  )

  return (
    <div style={{ position: 'fixed', right: '16px', bottom: '16px', zIndex: 90, display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <button type="button" aria-label="Scroll to top" onClick={scrollToTop} style={btnStyle} onMouseEnter={onEnter} onMouseLeave={onLeave}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M18 15l-6-6-6 6" />
        </svg>
      </button>
      <button type="button" aria-label="Scroll to bottom" onClick={scrollToBottom} style={btnStyle} onMouseEnter={onEnter} onMouseLeave={onLeave}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
    </div>
  )
}
