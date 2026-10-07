export default function PartnerTag({ children }: { children: string }) {
  return (
    <div style={{ display: 'flex', width: 'fit-content', alignItems: 'center', justifyContent: 'center', gap: '10px', margin: '0 auto 18px', padding: '12px 24px', borderRadius: '999px', background: '#10175F', color: '#fff', fontSize: '16px', fontWeight: 800, letterSpacing: '2px', lineHeight: 1 }}>
      <span aria-hidden="true" style={{ width: '10px', height: '10px', flex: '0 0 10px', borderRadius: '50%', background: '#FEC400' }} />
      {children}
    </div>
  )
}
