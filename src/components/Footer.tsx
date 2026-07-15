import { h } from '../lib/handlers'
import { A } from '../lib/assets'
import BrickDivider from './BrickDivider'
import FollowSocials from './FollowSocials'

const bigSpan: React.CSSProperties = {
  fontWeight: 800, fontSize: 'clamp(44px,13vw,200px)', lineHeight: 0.9, letterSpacing: '-4px',
  color: 'transparent', WebkitTextStroke: '2px rgba(255,255,255,.22)', paddingRight: '.4em',
}
const MARQUEE = 'Join the Biggest Java Community Event in Gujarat! · '

export default function Footer() {
  return (
    <footer style={{ position: 'relative', background: '#070B34', padding: '100px 40px 0', overflow: 'hidden' }}>
      <div style={{ position: 'relative', zIndex: 3, maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', borderRadius: '30px', overflow: 'hidden', marginBottom: '64px', boxShadow: '0 34px 74px rgba(0,0,0,.45)', border: '1px solid rgba(255,255,255,.08)' }}>
          <div style={{ position: 'relative', background: 'linear-gradient(150deg,#1a2670,#0E1667)', padding: '56px 46px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '28px', overflow: 'hidden' }}>
            <span style={{ position: 'absolute', top: '-26px', right: '-26px', width: '120px', height: '120px', borderRadius: '50%', background: 'rgba(254,196,0,.14)' }} />
            <span style={{ position: 'absolute', bottom: '18px', right: '30px', width: '30px', height: '30px', background: '#FF384B', clipPath: 'polygon(50% 0,100% 50%,50% 100%,0 50%)', animation: 'cdj-float2 8s ease-in-out infinite', opacity: 0.8 }} />
            <div style={{ position: 'relative' }}>
              <h2 style={{ margin: 0, fontWeight: 600, fontSize: 'clamp(30px,3.6vw,52px)', lineHeight: 1.04, letterSpacing: '-1.5px', color: '#fff' }}>Let's build the <span style={{ color: '#FEC400' }}>future of Java</span>, together.</h2>
            </div>
            <div style={{ position: 'relative', display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: '#FF384B', color: '#fff', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1px', fontSize: '14px', padding: '15px 28px', borderRadius: '46px', textDecoration: 'none', boxShadow: '0 14px 36px rgba(255,56,75,.36)', cursor: 'default' }} data-cta="1" onMouseEnter={h.btnOn} onMouseLeave={h.btnOff}>Tickets Coming Soon</span>
            </div>
            <div style={{ position: 'relative' }}>
              <FollowSocials caption="Registration opens soon — follow us for ticket updates." align="start" />
            </div>
          </div>
          <div style={{ position: 'relative', minHeight: '300px' }}>
            <img src={A['232c97e2-524f-4bdc-9971-6119b9012aef']} alt="Community Day for Java attendees" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(110deg,rgba(14,22,103,.55) 0%,rgba(14,22,103,0) 38%)' }} />
          </div>
        </div>

        <div style={{ padding: '20px 0 28px', borderTop: '1px solid rgba(255,255,255,.08)', display: 'flex', flexWrap: 'wrap', gap: '14px', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '12px', color: '#8890c8' }}>© 2026 Gujarat JUG · Community Day for Java</div>
          <div style={{ fontSize: '12px', color: '#8890c8' }}>Built by the community, for the community.</div>
        </div>
      </div>

      <div style={{ position: 'relative', zIndex: 1, marginTop: '10px', overflow: 'hidden', width: '100vw', marginLeft: 'calc(50% - 50vw)' }}>
        <div style={{ display: 'inline-flex', whiteSpace: 'nowrap', animation: 'cdj-marquee 24s linear infinite', willChange: 'transform', userSelect: 'none' }}>
          <span style={bigSpan}>{MARQUEE}</span>
          <span style={bigSpan}>{MARQUEE}</span>
        </div>
      </div>
      <BrickDivider id="footer-pattern" src={A['eb39f299-12ce-4961-a7ca-fd4eb4bad829']} height={120} fullBleed />
    </footer>
  )
}
