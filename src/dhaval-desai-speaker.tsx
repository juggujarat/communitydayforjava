import React from 'react'
import ReactDOM from 'react-dom/client'
import Nav from './components/Nav'
import Footer from './components/Footer'
import SpeakerLinks from './components/SpeakerLinks'
import BrickDivider from './components/BrickDivider'
import { useDCEffects } from './hooks/useDCEffects'
import { A } from './lib/assets'
import './styles/global.css'

const topics = ['Zero Trust', 'AI agent authorization', 'MCP security', 'Spring Boot', 'Identity & access']

function DhavalDesaiSpeakerPage() {
  useDCEffects()

  return (
    <div id="dc-root">
      <div id="speaker-page" style={{ position: 'relative', width: '100%', overflow: 'hidden', background: '#131C56', paddingTop: '110px' }}>
        <Nav hashPrefix="/" />
        <main style={{ padding: '52px 24px 84px', background: 'radial-gradient(100% 80% at 85% 0%,#1a2670,#0E1667 72%)' }}>
          <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
            <a href="/#speakers" style={{ display: 'inline-block', marginBottom: '28px', color: '#FEC400', fontWeight: 700, textDecoration: 'none' }}>All speakers</a>
            <section style={{ display: 'grid', gridTemplateColumns: 'minmax(200px, .6fr) minmax(0, 1.4fr)', gap: '48px', alignItems: 'center' }}>
              <div data-reveal style={{ maxWidth: '250px', overflow: 'hidden', borderRadius: '22px', border: '1px solid rgba(255,255,255,.2)', boxShadow: '0 24px 60px rgba(0,0,0,.3)', background: '#FEC400' }}>
                <img src="/assets/speaker-dhaval-desai-cutout.png" alt="Dhaval Desai" style={{ display: 'block', width: '100%', maxHeight: '340px', objectFit: 'contain', objectPosition: 'center bottom' }} />
              </div>
              <div data-reveal>
                <div style={{ marginBottom: '12px', color: '#FEC400', fontSize: '14px', fontWeight: 800, letterSpacing: '2px' }}>COMMUNITY DAY FOR JAVA 2026 SPEAKER</div>
                <h1 style={{ margin: '0 0 14px', fontSize: 'clamp(34px,5vw,58px)', lineHeight: 1.05, color: '#fff' }}>Dhaval Desai</h1>
                <p style={{ margin: '0 0 26px', color: '#c4caf0', fontSize: '20px', fontWeight: 600 }}>Community Manager at Gluu Inc.</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {topics.map((topic) => <span key={topic} style={{ padding: '9px 14px', border: '1px solid rgba(254,196,0,.42)', borderRadius: '30px', background: 'rgba(254,196,0,.1)', color: '#ffe27a', fontSize: '14px', fontWeight: 600 }}>{topic}</span>)}
                </div>
              </div>
            </section>

            <section data-reveal style={{ marginTop: '60px', padding: '32px', borderRadius: '20px', background: 'rgba(255,255,255,.07)', border: '1px solid rgba(255,255,255,.13)' }}>
              <div style={{ color: '#FEC400', fontSize: '13px', fontWeight: 800, letterSpacing: '2px' }}>TALK DETAILS</div>
              <h2 style={{ margin: '10px 0 20px', color: '#fff', fontSize: 'clamp(24px,3vw,34px)', lineHeight: 1.2 }}>Zero Trust Authorization for AI Workloads</h2>
              <h3 style={{ margin: '0 0 8px', color: '#fff', fontSize: '21px' }}>Summary</h3>
              <p style={{ margin: '0 0 24px', color: '#c4caf0', fontSize: '17px', lineHeight: 1.7 }}>Teilnehmende bauen eine Zero-Trust-Autorisierungsinfrastruktur für KI-Agenten mit dynamischer Registrierung, Identitätsketten, PDPs, AuthZEN, MCP-Tools und Spring-Boot-APIs.</p>
              <h3 style={{ margin: '0 0 8px', color: '#fff', fontSize: '21px' }}>Description</h3>
              <p style={{ margin: '0 0 22px', color: '#c4caf0', fontSize: '17px', lineHeight: 1.7 }}>Participants will build an end-to-end, zero-trust security infrastructure for AI agents.</p>
              <h3 style={{ margin: '0 0 8px', color: '#fff', fontSize: '21px' }}>Participants will learn</h3>
              <ul style={{ margin: '0 0 24px', paddingLeft: '24px', color: '#c4caf0', fontSize: '17px', lineHeight: 1.9 }}>
                <li>How to use dynamic client registration to enroll agents</li>
                <li>How to use <code>on-behalf-of</code> tokens to create a chain of identity from human to agents</li>
                <li>How to use the policy-as-code paradigm for modern authorization</li>
                <li>How to deploy an embeddable policy decision point to implement zero-trust authorization at different layers of an agentic application</li>
                <li>How to deploy and attach authorization in an agent gateway</li>
                <li>How to protect MCP tools using agent authorization</li>
                <li>How to deploy a separate PDP service that uses AuthZEN APIs to protect a backend Spring Boot Java service</li>
              </ul>
              <h3 style={{ margin: '0 0 8px', color: '#fff', fontSize: '21px' }}>How participants will build it</h3>
              <ul style={{ margin: 0, paddingLeft: '24px', color: '#c4caf0', fontSize: '17px', lineHeight: 1.9 }}>
                <li>Install Docker-based components and configure them to connect with each other</li>
                <li>Build a small Spring Boot Java app that exposes APIs, including APIs that support MCP tools</li>
                <li>Follow a step-by-step README provided for reference</li>
              </ul>
            </section>

            <section data-reveal style={{ marginTop: '34px' }}>
              <h2 style={{ margin: '0 0 18px', color: '#fff', fontSize: '30px' }}>About Dhaval</h2>
              <div style={{ display: 'grid', gap: '16px', color: '#d8dcf5', fontSize: '17px', lineHeight: 1.8 }}>
                <p style={{ margin: 0 }}>Dhaval is Community Manager at Gluu Inc., where he is currently building open-source identity, access, and governance software for agentic systems.</p>
                <p style={{ margin: 0 }}>He brings 22 years of industry experience across telecom R&amp;D, global banking, and identity and access management (IAM).</p>
              </div>
            </section>

            <section data-reveal style={{ marginTop: '34px' }}>
              <h2 style={{ margin: '0 0 18px', color: '#fff', fontSize: '30px' }}>Connect with Dhaval</h2>
              <SpeakerLinks links={[{ type: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/dhavaltdesai/' }]} />
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
    <DhavalDesaiSpeakerPage />
  </React.StrictMode>,
)
