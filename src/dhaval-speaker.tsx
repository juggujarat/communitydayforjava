import React from 'react'
import ReactDOM from 'react-dom/client'
import Nav from './components/Nav'
import Footer from './components/Footer'
import SpeakerLinks from './components/SpeakerLinks'
import BrickDivider from './components/BrickDivider'
import { useDCEffects } from './hooks/useDCEffects'
import { A } from './lib/assets'
import './styles/global.css'

const topics = ['Cloud-native architecture', 'Java 21 & Spring Boot', 'Reactive systems', 'Kafka & event-driven systems', 'Azure & Kubernetes']
const links = [
  { type: 'email' as const, label: 'Email', href: 'mailto:shah_d_p@yahoo.com' },
  { type: 'x' as const, label: 'X · @dhaval201279', href: 'https://x.com/dhaval201279' },
  { type: 'linkedin' as const, label: 'LinkedIn', href: 'https://www.linkedin.com/in/dhavalshah201279/' },
  { type: 'website' as const, label: 'Blog & company', href: 'https://dhaval-shah.com' },
]

function DhavalSpeakerPage() {
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
                <img src="/assets/Dhaval Shah.png" alt="Dhaval Shah" style={{ display: 'block', width: '100%', maxHeight: '340px', objectFit: 'cover', objectPosition: 'center' }} />
              </div>
              <div data-reveal>
                <div style={{ marginBottom: '12px', color: '#FEC400', fontSize: '14px', fontWeight: 800, letterSpacing: '2px' }}>COMMUNITY DAY FOR JAVA 2026 SPEAKER</div>
                <h1 style={{ margin: '0 0 14px', fontSize: 'clamp(34px,5vw,58px)', lineHeight: 1.05, color: '#fff' }}>Dhaval Shah</h1>
                <p style={{ margin: '0 0 26px', color: '#c4caf0', fontSize: '20px', fontWeight: 600 }}>Principal Cloud Native Architect</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {topics.map((topic) => <span key={topic} style={{ padding: '9px 14px', border: '1px solid rgba(254,196,0,.42)', borderRadius: '30px', background: 'rgba(254,196,0,.1)', color: '#ffe27a', fontSize: '14px', fontWeight: 600 }}>{topic}</span>)}
                </div>
              </div>
            </section>

            <section data-reveal style={{ marginTop: '60px', padding: '32px', borderRadius: '20px', background: 'rgba(255,255,255,.07)', border: '1px solid rgba(255,255,255,.13)' }}>
              <div style={{ color: '#FEC400', fontSize: '13px', fontWeight: 800, letterSpacing: '2px' }}>TALK DETAILS</div>
              <h2 style={{ margin: '10px 0 12px', color: '#fff', fontSize: '30px' }}>From REST APIs to AI Agents: Designing AI-Native Enterprise Systems in Java</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', margin: '0 0 22px' }}>
                <span style={{ padding: '8px 13px', borderRadius: '24px', background: 'rgba(254,196,0,.12)', color: '#ffe27a', fontSize: '14px', fontWeight: 700 }}>Track: Enterprise Java</span>
                <span style={{ padding: '8px 13px', borderRadius: '24px', background: 'rgba(255,255,255,.1)', color: '#fff', fontSize: '14px', fontWeight: 700 }}>Duration: 45 mins</span>
              </div>
              <h3 style={{ margin: '0 0 8px', color: '#fff', fontSize: '21px' }}>Summary</h3>
              <p style={{ margin: '0 0 22px', color: '#c4caf0', fontSize: '17px', lineHeight: 1.7 }}>Explains AI agents and their plan-act-observe architecture, contrasting them with REST endpoints and outlining JVM-based designs for enterprise Java systems.</p>
              <h3 style={{ margin: '0 0 8px', color: '#fff', fontSize: '21px' }}>Abstract</h3>
              <p style={{ margin: '0 0 16px', color: '#c4caf0', fontSize: '17px', lineHeight: 1.7 }}>So far we have been building enterprise Java based systems that assumed one thing: the client already knows exactly what to ask for and in exactly what order. REST allowed us to have clean contracts, predictable calls, and a REST client that orchestrated the workflow. But with AI, enterprise workflow doesn't fit that mold anymore.</p>
              <p style={{ margin: '0 0 18px', color: '#c4caf0', fontSize: '17px', lineHeight: 1.7 }}>This talk explains what an â€œAI agentâ€ actually isâ€”a reasoning engine, a set of tools, memory, and a plan-act-observe loopâ€”while respecting the architectural standards that we, as Java community members, hold ourselves responsible for.</p>
              <h3 style={{ margin: '0 0 8px', color: '#fff', fontSize: '21px' }}>Key takeaways</h3>
              <ul style={{ margin: 0, paddingLeft: '24px', color: '#c4caf0', fontSize: '17px', lineHeight: 1.9 }}>
                <li>What an AI agent is and how it differs from a REST endpoint</li>
                <li>A reference architecture for building AI-native systems on the JVM</li>
                <li>Non-negotiable architectural considerations for running agents in real enterprise systems</li>
              </ul>
            </section>

            <section data-reveal style={{ marginTop: '34px' }}>
              <h2 style={{ margin: '0 0 18px', color: '#fff', fontSize: '30px' }}>About Dhaval</h2>
              <p style={{ margin: 0, color: '#d8dcf5', fontSize: '17px', lineHeight: 1.8 }}>Dhaval designs and scales high-throughput, low-latency fintech platforms in highly regulated environments. With 21+ years of experience, he has built cloud-native systems on Azure and Kubernetes using Java 21, Spring Boot, reactive programming, Kafka, and Redis, with a strong focus on event-driven architecture. He combines hands-on engineering with technical leadership to help teams build platforms that are fast, resilient, and compliant.</p>
            </section>

            <section data-reveal style={{ marginTop: '34px' }}>
              <h2 style={{ margin: '0 0 18px', color: '#fff', fontSize: '30px' }}>Connect with Dhaval</h2>
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
    <DhavalSpeakerPage />
  </React.StrictMode>,
)

