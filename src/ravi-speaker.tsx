import React from 'react'
import ReactDOM from 'react-dom/client'
import Nav from './components/Nav'
import Footer from './components/Footer'
import SpeakerLinks from './components/SpeakerLinks'
import BrickDivider from './components/BrickDivider'
import { useDCEffects } from './hooks/useDCEffects'
import { A } from './lib/assets'
import './styles/global.css'

const topics = ['JVM performance', 'JFR & JDK Mission Control', 'AI & MCP', 'Spring Boot', 'Production diagnostics']
const links = [
  { type: 'email' as const, label: 'Email', href: 'mailto:my.ravisoni@gmail.com' },
  { type: 'x' as const, label: 'X · @rvsoni', href: 'https://x.com/rvsoni' },
  { type: 'linkedin' as const, label: 'LinkedIn', href: 'https://www.linkedin.com/in/rvsoni/' },
  { type: 'instagram' as const, label: 'Instagram', href: 'https://www.instagram.com/rvsoni23/' },
  { type: 'website' as const, label: 'Blog', href: 'https://rvsoni.com' },
]

function RaviSpeakerPage() {
  useDCEffects()

  return (
    <div id="dc-root">
      <div id="speaker-page" style={{ position: 'relative', width: '100%', overflow: 'hidden', background: '#131C56', paddingTop: '110px' }}>
        <Nav hashPrefix="/" />
        <main style={{ padding: '52px 24px 84px', background: 'radial-gradient(100% 80% at 85% 0%,#1a2670,#0E1667 72%)' }}>
          <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
            <a href="/#speakers" style={{ display: 'inline-block', marginBottom: '28px', color: '#FEC400', fontWeight: 700, textDecoration: 'none' }}>All speakers</a>
            <section style={{ display: 'grid', gridTemplateColumns: 'minmax(200px, .6fr) minmax(0, 1.4fr)', gap: '48px', alignItems: 'center' }}>
              <div data-reveal style={{ maxWidth: '250px', overflow: 'hidden', borderRadius: '22px', border: '1px solid rgba(255,255,255,.2)', boxShadow: '0 24px 60px rgba(0,0,0,.3)', background: '#fff' }}>
                <img src="/assets/ravi_soni-removebg-preview.png" alt="Ravi Soni" style={{ display: 'block', width: '100%', maxHeight: '340px', objectFit: 'contain', objectPosition: 'center bottom' }} />
              </div>
              <div data-reveal>
                <div style={{ marginBottom: '12px', color: '#FEC400', fontSize: '14px', fontWeight: 800, letterSpacing: '2px' }}>COMMUNITY DAY FOR JAVA 2026 SPEAKER</div>
                <h1 style={{ margin: '0 0 14px', fontSize: 'clamp(34px,5vw,58px)', lineHeight: 1.05, color: '#fff' }}>Ravi Soni</h1>
                <p style={{ margin: '0 0 26px', color: '#c4caf0', fontSize: '20px', fontWeight: 600 }}>The CodeFather</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {topics.map((topic) => <span key={topic} style={{ padding: '9px 14px', border: '1px solid rgba(254,196,0,.42)', borderRadius: '30px', background: 'rgba(254,196,0,.1)', color: '#ffe27a', fontSize: '14px', fontWeight: 600 }}>{topic}</span>)}
                </div>
              </div>
            </section>

            <section data-reveal style={{ marginTop: '60px', padding: '32px', borderRadius: '20px', background: 'rgba(255,255,255,.07)', border: '1px solid rgba(255,255,255,.13)' }}>
              <div style={{ color: '#FEC400', fontSize: '13px', fontWeight: 800, letterSpacing: '2px' }}>TALK DETAILS</div>
              <h2 style={{ margin: '10px 0 20px', color: '#fff', fontSize: 'clamp(24px,3vw,34px)', lineHeight: 1.2 }}>Give Your JVM an AI Assistant: JFR, JDK Mission Control and MCP for Production Performance</h2>
              <h3 style={{ margin: '0 0 8px', color: '#fff', fontSize: '21px' }}>Summary</h3>
              <p style={{ margin: '0 0 24px', color: '#c4caf0', fontSize: '17px', lineHeight: 1.7 }}>This session demonstrates an evidence-driven JVM performance workflow using JFR, JMC, AI, and MCP to diagnose and validate production issues.</p>
              <h3 style={{ margin: '0 0 8px', color: '#fff', fontSize: '21px' }}>Description</h3>
              <div style={{ display: 'grid', gap: '16px', color: '#c4caf0', fontSize: '17px', lineHeight: 1.75 }}>
                <p style={{ margin: 0, color: '#ffe27a', fontWeight: 700 }}>Your Java application is slow. What do you do next?</p>
                <p style={{ margin: 0 }}>Production JVM performance investigations often begin with the same symptoms: rising latency, high CPU, increased allocation, GC activity, blocked threads, or unexpected throughput degradation. The challenge is not collecting telemetryâ€”it is connecting the evidence quickly enough to identify the real bottleneck.</p>
                <p style={{ margin: 0 }}>In this session, we explore a practical approach to giving your JVM an AI assistant by combining JDK Flight Recorder (JFR), JDK Mission Control (JMC), AI, and Model Context Protocol (MCP).</p>
                <p style={{ margin: 0 }}>JFR provides rich runtime evidence from the JVM, while JMC provides powerful capabilities for analyzing CPU usage, memory allocation, garbage collection, threads, locks, and application behavior. MCP provides a way to expose these diagnostic capabilities as tools that an AI assistant can interact with.</p>
                <p style={{ margin: 0 }}>Rather than asking an LLM to guess what is wrong, we will give the AI access to real JVM evidence and let it investigate a production-style incident. Through a hands-on Spring Boot scenario, we will move from an initial performance symptom to JFR capture, JMC analysis, AI-assisted investigation, root-cause hypothesis, remediation, and finally a second JFR recording to validate the improvement.</p>
                <p style={{ margin: 0 }}>We will investigate common JVM problems including CPU hotspots, excessive object allocation, GC pressure, thread contention, locking, and latency. We will also demonstrate how MCP can turn JVM diagnostics into actionable tools for an AI assistantâ€”allowing developers to ask questions such as â€œWhy is this service slow?â€, â€œWhat is consuming the CPU?â€, â€œAre threads blocked?â€, and â€œDid our performance fix actually work?â€</p>
                <p style={{ margin: 0 }}>The goal is not to replace JVM engineers with AI. It is to demonstrate a new evidence-driven performance engineering workflow, where JFR provides the facts, AI helps navigate and correlate those facts, and engineers remain responsible for validating the diagnosis and deciding what changes should reach production.</p>
                <p style={{ margin: 0 }}>The key idea is simple: don't ask AI to guess why your Java application is slow.</p>
              </div>
            </section>

            <section data-reveal style={{ marginTop: '34px' }}>
              <h2 style={{ margin: '0 0 18px', color: '#fff', fontSize: '30px' }}>About Ravi</h2>
              <p style={{ margin: 0, color: '#d8dcf5', fontSize: '17px', lineHeight: 1.8 }}>Ravi Soni, known as The CodeFather, is AWS Certified and a Java and cloud-native architect with 15+ years of professional experience in the design, development, maintenance, and migration of Java, JavaEE, Spring Boot, Kafka, and Kubernetes-based distributed and microservice applications.</p>
            </section>

            <section data-reveal style={{ marginTop: '34px' }}>
              <h2 style={{ margin: '0 0 18px', color: '#fff', fontSize: '30px' }}>Connect with Ravi</h2>
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
    <RaviSpeakerPage />
  </React.StrictMode>,
)

