import React from 'react'
import ReactDOM from 'react-dom/client'
import Nav from './components/Nav'
import Footer from './components/Footer'
import SpeakerLinks from './components/SpeakerLinks'
import BrickDivider from './components/BrickDivider'
import { useDCEffects } from './hooks/useDCEffects'
import { A } from './lib/assets'
import './styles/global.css'

const topics = ['Spring Modulith', 'Modular architecture', 'AI-assisted engineering', 'Spring Boot', 'Production systems']
const links = [
  { type: 'email' as const, label: 'Email', href: 'mailto:vikas@techxplore.io' },
  { type: 'x' as const, label: 'X · @vikasrajputin', href: 'https://x.com/vikasrajputin' },
  { type: 'linkedin' as const, label: 'LinkedIn', href: 'https://www.linkedin.com/in/vikasrajputin' },
  { type: 'instagram' as const, label: 'Instagram', href: 'https://www.instagram.com/vikasrajputin/' },
  { type: 'website' as const, label: 'Blog', href: 'https://vikasrajput.in/blog' },
  { type: 'website' as const, label: 'Techxplore', href: 'https://techxplore.io' },
]

function VikasSpeakerPage() {
  useDCEffects()

  return (
    <div id="dc-root">
      <div id="speaker-page" style={{ position: 'relative', width: '100%', overflow: 'hidden', background: '#131C56', paddingTop: '110px' }}>
        <Nav hashPrefix="/" />
        <main style={{ padding: '52px 24px 84px', background: 'radial-gradient(100% 80% at 85% 0%,#1a2670,#0E1667 72%)' }}>
          <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
            <a href="/#speakers" style={{ display: 'inline-block', marginBottom: '28px', color: '#FEC400', fontWeight: 700, textDecoration: 'none' }}>All speakers</a>
            <section style={{ display: 'grid', gridTemplateColumns: 'minmax(200px, .6fr) minmax(0, 1.4fr)', gap: '48px', alignItems: 'center' }}>
              <div data-reveal style={{ maxWidth: '250px', overflow: 'hidden', borderRadius: '22px', border: '1px solid rgba(255,255,255,.2)', boxShadow: '0 24px 60px rgba(0,0,0,.3)' }}>
                <img src="/assets/vikas%20rajput.png" alt="Vikas Rajput" style={{ display: 'block', width: '100%', maxHeight: '340px', objectFit: 'cover', objectPosition: '50% 14%' }} />
              </div>
              <div data-reveal>
                <div style={{ marginBottom: '12px', color: '#FEC400', fontSize: '14px', fontWeight: 800, letterSpacing: '2px' }}>COMMUNITY DAY FOR JAVA 2026 SPEAKER</div>
                <h1 style={{ margin: '0 0 14px', fontSize: 'clamp(34px,5vw,58px)', lineHeight: 1.05, color: '#fff' }}>Vikas Rajput</h1>
                <p style={{ margin: '0 0 26px', color: '#c4caf0', fontSize: '20px', fontWeight: 600 }}>Founder @ Techxplore | Co-organizer @ Gujarat JUG</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {topics.map((topic) => <span key={topic} style={{ padding: '9px 14px', border: '1px solid rgba(254,196,0,.42)', borderRadius: '30px', background: 'rgba(254,196,0,.1)', color: '#ffe27a', fontSize: '14px', fontWeight: 600 }}>{topic}</span>)}
                </div>
              </div>
            </section>

            <section data-reveal style={{ marginTop: '60px', padding: '32px', borderRadius: '20px', background: 'rgba(255,255,255,.07)', border: '1px solid rgba(255,255,255,.13)' }}>
              <div style={{ color: '#FEC400', fontSize: '13px', fontWeight: 800, letterSpacing: '2px' }}>TALK DETAILS</div>
              <h2 style={{ margin: '10px 0 20px', color: '#fff', fontSize: 'clamp(24px,3vw,34px)', lineHeight: 1.2 }}>AI Can Generate Code. Who Enforces the Boundaries? — Spring Modulith in Production</h2>
              <h3 style={{ margin: '0 0 8px', color: '#fff', fontSize: '21px' }}>Summary</h3>
              <p style={{ margin: '0 0 24px', color: '#c4caf0', fontSize: '17px', lineHeight: 1.7 }}>Explora cómo Spring Modulith define y verifica límites modulares, dependencias, eventos y transacciones en aplicaciones Spring Boot desarrolladas con asistencia de IA.</p>
              <h3 style={{ margin: '0 0 8px', color: '#fff', fontSize: '21px' }}>Description</h3>
              <div style={{ display: 'grid', gap: '16px', color: '#c4caf0', fontSize: '17px', lineHeight: 1.75 }}>
                <p style={{ margin: 0 }}>AI-assisted development is dramatically increasing the speed at which we can create and modify software. But faster code generation doesn't remove architectural concerns such as coupling, dependency direction, domain boundaries, transactions, consistency, or maintainability.</p>
                <p style={{ margin: 0 }}>If anything, as more code is produced with the help of coding agents, making architectural intent explicit—and verifiable—becomes increasingly valuable.</p>
                <p style={{ margin: 0 }}>This is where a modular architecture becomes particularly interesting.</p>
                <p style={{ margin: 0 }}>Spring Modulith allows us to organize a Spring Boot application around explicit business modules, define their exposed APIs and permitted dependencies, and verify those architectural boundaries automatically.</p>
                <p style={{ margin: 0 }}>That gives both developers and AI-assisted development workflows something important: a codebase where architectural rules aren't merely documented—they can be tested.</p>
                <p style={{ margin: 0 }}>In this masterclass, we'll explore what that means in practice. We'll design module boundaries, establish communication patterns, work with events and transactions, enforce dependency rules, and examine how these decisions hold up when the application reaches production.</p>
                <p style={{ margin: 0 }}>We'll also explore how modern AI coding workflows can work within these boundaries—and what happens when generated code violates them.</p>
                <p style={{ margin: 0 }}>The goal isn't to claim that modular monoliths replace microservices in the AI era.</p>
                <p style={{ margin: 0, color: '#ffe27a', fontWeight: 700 }}>It's to answer a more important question:</p>
                <p style={{ margin: 0, color: '#fff', fontSize: '19px', fontWeight: 700 }}>When writing code is becoming easier than ever, how do we make sure our architecture doesn't become easier to break?</p>
              </div>
            </section>

            <section data-reveal style={{ marginTop: '34px' }}>
              <h2 style={{ margin: '0 0 18px', color: '#fff', fontSize: '30px' }}>About Vikas</h2>
              <div style={{ display: 'grid', gap: '16px', color: '#d8dcf5', fontSize: '17px', lineHeight: 1.8 }}>
                <p style={{ margin: 0 }}>Vikas Rajput is a Java Architect, technology consultant, speaker, and Founder of Techxplore IT Solutions, with over 11 years of experience designing and building enterprise-grade software systems.</p>
                <p style={{ margin: 0 }}>His expertise spans Java, Spring Boot, enterprise architecture, cloud-native development, and the design of scalable, secure, and maintainable applications. Throughout his career, he has worked on complex systems across multiple domains, helping teams modernize legacy applications, define strong architectural boundaries, and make pragmatic technology decisions for real-world production environments.</p>
                <p style={{ margin: 0 }}>In the age of AI-assisted software development, Vikas is particularly interested in the evolving role of software architecture and engineering judgment. While AI is transforming how quickly software can be written, he believes that decisions around architecture, modularity, scalability, security, performance, and long-term maintainability are becoming even more important. His work explores how developers and architects can combine AI-assisted development with sound engineering principles to build systems that remain structured, understandable, and resilient as they evolve.</p>
                <p style={{ margin: 0 }}>Beyond his professional work, Vikas leads the Java User Group Gujarat (Gujarat JUG), where he actively contributes to the developer ecosystem through technical meetups, conferences, and knowledge-sharing initiatives.</p>
                <p style={{ margin: 0 }}>As a speaker, he enjoys sharing practical experiences around Java, modern software architecture, AI-assisted engineering, scalability, and the lessons learned when architectural ideas meet the realities of production.</p>
              </div>
            </section>

            <section data-reveal style={{ marginTop: '34px' }}>
              <h2 style={{ margin: '0 0 18px', color: '#fff', fontSize: '30px' }}>Connect with Vikas</h2>
              <SpeakerLinks links={links} />
            </section>
          </div>
        </main>
        <BrickDivider src={A['6310b061-eeb8-4ae2-a75c-7a329ad216e1']} />
        <Footer />
      </div>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <VikasSpeakerPage />
  </React.StrictMode>,
)
