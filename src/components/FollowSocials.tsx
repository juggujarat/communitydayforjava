import { Icon } from '../lib/icons'
import { SOCIALS } from '../lib/socials'

/**
 * Reusable "follow our socials" block: a row of outlined LinkedIn/Instagram/X
 * chips + a caption. Used under the CFP and "Tickets Coming Soon" CTAs.
 */
export default function FollowSocials({ caption, align = 'center' }: { caption: string; align?: 'center' | 'start' }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: align === 'center' ? 'center' : 'flex-start', gap: '12px' }}>
      <div style={{ display: 'flex', gap: '12px' }}>
        {SOCIALS.map((s, i) => (
          <a key={i} href={s.href} target="_blank" rel="noopener" aria-label={s.label} style={{ width: '44px', height: '44px', borderRadius: '50%', border: '1.5px solid rgba(255,255,255,.5)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#fff', textDecoration: 'none', transition: 'background .25s ease, border-color .25s ease' }} onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,.12)'; e.currentTarget.style.borderColor = '#fff' }} onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,255,255,.5)' }}>
            <Icon type={s.type} />
          </a>
        ))}
      </div>
      <div style={{ fontSize: '14px', color: '#a8b0e0', fontWeight: 500 }}>{caption}</div>
    </div>
  )
}
