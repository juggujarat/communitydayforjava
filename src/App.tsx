/**
 * Community Day for Java (CDJ 2026) — root component.
 *
 * Converted from the original design-tool bundle (see legacy/original-bundle.html).
 * The wrapper keeps id="dc-root" because global.css targets `#dc-root h1/h2`,
 * `#dc-root nav`, `#dc-root section`, etc. for typography and mobile layout.
 *
 * Sections are ordered exactly as the original rendered document; useDCEffects()
 * ports the original's DOM-driven scroll behaviors (reveals, count-ups, nav
 * background, gallery zoom, mobile lightbox).
 */
import Nav from './components/Nav'
import Hero from './components/Hero'
import Manifesto from './components/Manifesto'
import Venue from './components/Venue'
import Agenda from './components/Agenda'
import WhyImpact from './components/WhyImpact'
import Gallery from './components/Gallery'
import Speakers from './components/Speakers'
import SponsorsWall from './components/SponsorsWall'
import Sponsor from './components/Sponsor'
import Partners from './components/Partners'
import CommunityPartners from './components/CommunityPartners'
import Organizers from './components/Organizers'
import Committee from './components/Committee'
import Volunteers from './components/Volunteers'
import Footer from './components/Footer'
import BrickDivider from './components/BrickDivider'
import ScrollButtons from './components/ScrollButtons'
import { useDCEffects } from './hooks/useDCEffects'
import { A } from './lib/assets'

export default function App() {
  useDCEffects()
  return (
    <div id="dc-root">
      <div style={{ position: 'relative', width: '100%', overflow: 'hidden', background: '#131C56' }}>
        <Nav />
        <Hero />
        <Manifesto />
        <BrickDivider id="venue-divider" src={A['eb39f299-12ce-4961-a7ca-fd4eb4bad829']} />
        <Venue />
        <Agenda />
        <BrickDivider id="why-divider" src={A['eb39f299-12ce-4961-a7ca-fd4eb4bad829']} />
        <WhyImpact />
        <Gallery />
        <BrickDivider id="speakers-divider" src={A['eb39f299-12ce-4961-a7ca-fd4eb4bad829']} />
        <Speakers />
        <SponsorsWall />
        <BrickDivider id="sponsor-divider" src={A['eb39f299-12ce-4961-a7ca-fd4eb4bad829']} />
        <Sponsor />
        <Partners />
        <CommunityPartners />
        <BrickDivider src={A['8cb11cf6-f516-467b-8a0f-27f4125d339f']} />
        <Organizers />
        <Committee />
        <BrickDivider id="volunteers-divider" src={A['eb39f299-12ce-4961-a7ca-fd4eb4bad829']} />
        <Volunteers />
        <BrickDivider src={A['6310b061-eeb8-4ae2-a75c-7a329ad216e1']} />
        <Footer />
      </div>
      <ScrollButtons />
    </div>
  )
}
