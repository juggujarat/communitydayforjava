import { Icon } from '../lib/icons'
import { SOCIALS } from '../lib/socials'

/**
 * Reusable "follow our socials" block: a row of outlined LinkedIn/Instagram/X
 * chips + a caption. Used under the CFP and "Tickets Coming Soon" CTAs.
 */
export default function FollowSocials({ caption, align = 'center', tone = 'dark' }: { caption: string; align?: 'center' | 'start'; tone?: 'dark' | 'light' }) {
  const border = tone === 'light' ? 'rgba(14,22,103,.28)' : 'rgba(255,255,255,.5)'
  const color = tone === 'light' ? '#0E1667' : '#fff'
  const hoverBg = tone === 'light' ? 'rgba(14,22,103,.08)' : 'rgba(255,255,255,.12)'
  const hoverBorder = tone === 'light' ? '#0E1667' : '#fff'
  const captionColor = tone === 'light' ? '#6b73a8' : '#a8b0e0'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: align === 'center' ? 'center' : 'flex-start', gap: '12px' }}>
      <div style={{ display: 'flex', gap: '12px' }}>
        {SOCIALS.map((s, i) => (
          <a key={i} href={s.href} target="_blank" rel="noopener" aria-label={s.label} style={{ width: '44px', height: '44px', borderRadius: '50%', border: `1.5px solid ${border}`, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color, textDecoration: 'none', transition: 'background .25s ease, border-color .25s ease' }} onMouseEnter={e => { e.currentTarget.style.background = hoverBg; e.currentTarget.style.borderColor = hoverBorder }} onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = border }}>
            <Icon type={s.type} />
          </a>
        ))}
      </div>
      <div style={{ fontSize: '14px', color: captionColor, fontWeight: 500 }}>{caption}</div>
    </div>
  )
}
