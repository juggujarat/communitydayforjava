export default function PartnerTag({ children }: { children: string }) {
  return (
    <div style={{ display: 'flex', width: 'fit-content', alignItems: 'center', justifyContent: 'center', gap: '8px', margin: '0 auto 18px', padding: '8px 18px', borderRadius: '999px', background: '#10175F', color: '#fff', fontSize: '11px', fontWeight: 800, letterSpacing: '1.4px', lineHeight: 1 }}>
      <span aria-hidden="true" style={{ width: '7px', height: '7px', flex: '0 0 7px', borderRadius: '50%', background: '#FEC400' }} />
      {children}
    </div>
  )
}
