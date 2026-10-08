import Organizers from '../components/Organizers'
import Committee from '../components/Committee'
import Volunteers from '../components/Volunteers'
import BrickDivider from '../components/BrickDivider'
import { A } from '../lib/assets'
import PageShell, { Crumbs } from './PageShell'

/**
 * /team/ — the people behind the event: core organizers, the CFP review committee and the
 * volunteers. These were sections of the home page; they live here so the home page stays
 * focused. The section components are the same ones, rendered full width below the header.
 */
export default function TeamPage() {
  return (
    <PageShell
      after={
        <>
          <Organizers />
          <Committee />
          <BrickDivider id="volunteers-divider" src={A['eb39f299-12ce-4961-a7ca-fd4eb4bad829']} />
          <Volunteers />
        </>
      }
    >
      <Crumbs items={[['Home', '/'], ['Team']]} />

      <div data-reveal style={{ maxWidth: '820px' }}>
        <div style={{ marginBottom: '12px', color: '#FEC400', fontSize: '14px', fontWeight: 800, letterSpacing: '2px' }}>COMMUNITY DAY FOR JAVA 2026</div>
        <h1 style={{ margin: '0 0 14px', fontSize: 'clamp(34px,5vw,58px)', lineHeight: 1.05, color: '#fff' }}>The Team</h1>
        <p style={{ margin: 0, color: '#c4caf0', fontSize: '19px', lineHeight: 1.6 }}>
          Community Day for Java is organized by Java User Group Gujarat and run entirely by volunteers. Meet the people who make it happen.
        </p>
      </div>
    </PageShell>
  )
}
