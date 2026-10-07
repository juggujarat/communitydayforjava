import { Icon, type Social } from '../lib/icons'

export default function SpeakerLinks({ links }: { links: Social[] }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
      {links.map((link) => (
        <a key={link.label} href={link.href} target={link.href.startsWith('mailto:') ? undefined : '_blank'} rel={link.href.startsWith('mailto:') ? undefined : 'noreferrer'} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '11px 17px', borderRadius: '30px', background: '#FEC400', color: '#131C56', fontSize: '14px', fontWeight: 800, textDecoration: 'none' }}>
          {link.type !== 'x' && <Icon type={link.type} />}
          {link.label}
        </a>
      ))}
    </div>
  )
}
