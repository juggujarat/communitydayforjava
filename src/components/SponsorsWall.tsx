import type { ReactNode } from 'react'

/**
 * Sponsors (#sponsors-wall): every sponsorship tier in ONE compact grid, laid out as a
 * side-by-side grid (two rows of two, widths mirrored so it stays symmetric); the bigger the
 * contribution, the bigger the logo and label:
 *
 *        [    PLATINUM (7)     ] [   GOLD (5)   ]      main sponsors, biggest logos
 *        [ VENUE SPONSOR (5) ] [ COMMUNITY PATREON (7) ]   smaller logos
 *
 * Each tier keeps a colour-coded label + top edge. (Community Supporter is an individual's
 * contribution, not a sponsorship, so it lives in its own section: CommunitySupporter.tsx.)
 * The grid collapses on small screens — see #sponsor-tiers in global.css, which keys off the
 * data-tier attributes below.
 */

const NAVY = '#0E1667'

interface Logo { name: string; src: string; href: string; scale?: number }

const PLATINUM: Logo = { name: 'JetBrains', src: '/assets/jetbrains-logo.svg', href: 'https://www.jetbrains.com/idea/' }
const GOLD: Logo = { name: 'Xynnity', src: '/assets/xynnity.png', href: 'https://www.xynnity.com/' }
const VENUE: Logo = { name: 'Gujarat University Centre For Professional Courses', src: '/assets/cpc%20gu%20logo.png', href: 'https://gucpc.in/' }
const PATRONS: Logo[] = [
  { name: 'JobRunr', src: '/assets/jobrunner%20community%20contributor.jfif', href: 'https://www.jobrunr.io/en/', scale: 1.4 },
  { name: 'Techxplore', src: '/assets/techxplore%20logo.png', href: 'https://www.techxplore.io/', scale: 0.78 },
]

/** Clickable white logo tile. */
function LogoTile({ logo, height, padding = 14 }: { logo: Logo; height: number; padding?: number }) {
  return (
    <a data-logo="1" href={logo.href} target="_blank" rel="noopener noreferrer" aria-label={`${logo.name} (opens in a new tab)`} style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', height, padding, boxSizing: 'border-box', overflow: 'hidden', background: '#fff', border: '1px solid rgba(14,22,103,.08)', borderRadius: '12px', boxShadow: '0 4px 14px rgba(14,22,103,.06)' }}>
      <img src={logo.src} alt={logo.name} loading="lazy" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', display: 'block', transform: logo.scale ? `scale(${logo.scale})` : undefined }} />
    </a>
  )
}

/** One sponsorship category: colour-coded label + top edge, content below. `size` scales the label too. */
function Tier({ id, label, accent, column, size = 1, children }: { id: string; label: string; accent: string; column: string; size?: number; children: ReactNode }) {
  return (
    <div data-reveal data-tier={id} style={{ gridColumn: column, display: 'flex', flexDirection: 'column', gap: '12px', padding: `${12 + size * 3}px ${14 + size * 3}px ${14 + size * 3}px`, background: '#FBFAF6', border: '1px solid rgba(14,22,103,.1)', borderTop: `${3 + size}px solid ${accent}`, borderRadius: '18px', boxShadow: `0 ${6 + size * 4}px ${20 + size * 8}px rgba(14,22,103,.07)`, textAlign: 'left' }}>
      <div style={{ display: 'flex', width: 'fit-content', alignItems: 'center', gap: '8px', background: NAVY, color: '#fff', fontWeight: 800, fontSize: `${10.5 + size}px`, letterSpacing: '1.8px', padding: `${5 + size * 2}px ${12 + size * 2}px`, borderRadius: '999px' }}>
        <span aria-hidden="true" style={{ width: '8px', height: '8px', flex: 'none', borderRadius: '50%', background: accent }} />
        {label}
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>{children}</div>
    </div>
  )
}

export default function SponsorsWall() {
  return (
    <section id="sponsors-wall" style={{ position: 'relative', padding: '64px 40px 40px', background: '#F4F1E8', color: NAVY, overflow: 'hidden' }}>
      <div style={{ position: 'relative', zIndex: 3, maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
        <div data-reveal style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2 style={{ margin: 0, fontWeight: 500, fontSize: 'clamp(30px,4.6vw,56px)', lineHeight: 1, letterSpacing: '-1.5px' }}>Our <span style={{ color: '#0D5CDB' }}>Esteemed</span> <span style={{ fontFamily: "'Roboto',sans-serif", fontWeight: 600, color: '#0D5CDB' }}>Sponsors</span></h2>
        </div>
<<<<<<< HEAD
        <div data-reveal data-reveal-d="80" style={{ maxWidth: '920px', margin: '0 auto', textAlign: 'left' }}>
          <div style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', width: 'fit-content', alignItems: 'center', gap: '8px', background: '#0E1667', color: '#fff', fontWeight: 800, fontSize: '12px', letterSpacing: '2px', padding: '7px 16px', borderRadius: '30px', margin: '0 auto 18px' }}><span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#FEC400' }} />PLATINUM</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'min(100%, 460px)', justifyContent: 'center', gap: '16px' }}>
              <Slot id="cdj-sp-1" label="Platinum logo" height={170} padding={28} img="/assets/jetbrains-logo.svg" alt="JetBrains" href="https://www.jetbrains.com/" />
=======

        <div id="sponsor-tiers" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, minmax(0, 1fr))', gap: '16px' }}>
          {/* Apex: Platinum — widest card, biggest logo */}
          {/* Row 1: the two main sponsors side by side — Platinum wider, with the biggest logo */}
          <Tier id="platinum" label="PLATINUM" accent="#8E97B8" column="span 7" size={3}>
            <LogoTile logo={PLATINUM} height={150} padding={26} />
          </Tier>
          <Tier id="gold" label="GOLD" accent="#FEC400" column="span 5" size={2}>
            <LogoTile logo={GOLD} height={128} padding={22} />
          </Tier>

          {/* Row 2: mirrored widths — Venue Sponsor | Community Patreon, smaller logos */}
          <Tier id="venue" label="VENUE SPONSOR" accent="#0D5CDB" column="span 5" size={1}>
            <LogoTile logo={VENUE} height={100} padding={6} />
          </Tier>
          <Tier id="patreon" label="COMMUNITY PATREON" accent="#FF384B" column="span 7" size={1}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '12px' }}>
              {PATRONS.map((p) => <LogoTile key={p.name} logo={p} height={100} padding={8} />)}
>>>>>>> f26f9c0bcd83f569095558d728e153644610e60b
            </div>
          </Tier>
        </div>
      </div>
    </section>
  )
}
