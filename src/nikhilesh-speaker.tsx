import React from 'react'
import ReactDOM from 'react-dom/client'
import Nav from './components/Nav'
import Footer from './components/Footer'
import SpeakerLinks from './components/SpeakerLinks'
import BrickDivider from './components/BrickDivider'
import { useDCEffects } from './hooks/useDCEffects'
import { A } from './lib/assets'
import './styles/global.css'

const links = [
  { type: 'email' as const, label: 'Email', href: 'mailto:nt@aimletc.com' },
  { type: 'linkedin' as const, label: 'LinkedIn', href: 'https://www.linkedin.com/in/nikhileshtayal/' },
  { type: 'website' as const, label: 'AI ML etc.', href: 'https://aimletc.com' },
  { type: 'website' as const, label: 'AI ML etc. Blog', href: 'https://aimletc.com/blogs' },
]

function NikhileshSpeakerPage() {
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
                <img src="/assets/Nikhilesh Tayal.jpg" alt="Nikhilesh Tayal" style={{ display: 'block', width: '100%', maxHeight: '340px', objectFit: 'cover', objectPosition: 'center' }} />
              </div>
              <div data-reveal>
                <div style={{ marginBottom: '12px', color: '#FEC400', fontSize: '14px', fontWeight: 800, letterSpacing: '2px' }}>COMMUNITY DAY FOR JAVA 2026 SPEAKER</div>
                <h1 style={{ margin: '0 0 14px', fontSize: 'clamp(34px,5vw,58px)', lineHeight: 1.05, color: '#fff' }}>Nikhilesh Tayal</h1>
                <p style={{ margin: '0 0 20px', color: '#c4caf0', fontSize: '20px', fontWeight: 600 }}>Google Developer Expert for AI</p>
                <p style={{ margin: '0 0 26px', color: '#d8dcf5', fontSize: '17px', lineHeight: 1.7 }}>Founder of AI ML etc., an educational platform helping senior IT professionals learn AI.</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {['Artificial Intelligence', 'AI education', '70+ speaking assignments'].map((topic) => <span key={topic} style={{ padding: '9px 14px', border: '1px solid rgba(254,196,0,.42)', borderRadius: '30px', background: 'rgba(254,196,0,.1)', color: '#ffe27a', fontSize: '14px', fontWeight: 600 }}>{topic}</span>)}
                </div>
              </div>
            </section>

            <section data-reveal style={{ marginTop: '60px', padding: '32px', borderRadius: '20px', background: 'rgba(255,255,255,.07)', border: '1px solid rgba(255,255,255,.13)' }}>
              <div style={{ color: '#FEC400', fontSize: '13px', fontWeight: 800, letterSpacing: '2px' }}>TALK DETAILS</div>
              <h2 style={{ margin: '10px 0 12px', color: '#fff', fontSize: 'clamp(24px,3vw,34px)', lineHeight: 1.2 }}>Engineering Production-Scale RAG for Enterprise Java Applications</h2>
              <h3 style={{ margin: '0 0 8px', color: '#fff', fontSize: '21px' }}>Summary</h3>
              <p style={{ margin: '0 0 24px', color: '#c4caf0', fontSize: '17px', lineHeight: 1.7 }}>Praktische Techniken fÃ¼r skalierbare, zuverlÃ¤ssige RAG-Systeme in Enterprise-Java-Anwendungen und die Abgrenzung zu AI-Agenten.</p>
              <h3 style={{ margin: '0 0 8px', color: '#fff', fontSize: '21px' }}>Description</h3>
              <div style={{ display: 'grid', gap: '16px', color: '#c4caf0', fontSize: '17px', lineHeight: 1.75 }}>
                <p style={{ margin: 0, color: '#ffe27a', fontWeight: 700 }}>Your RAG prototype works. Now what?</p>
                <p style={{ margin: 0 }}>The engineering challenge begins when the system needs to handle millions of documents, maintain retrieval quality, survive failures, control latency, manage cost, and operate reliably in production.</p>
                <p style={{ margin: 0 }}>This session is a practical deep dive into the engineering techniques that can take RAG beyond a prototype.</p>
                <p style={{ margin: 0 }}>We will talk about:</p>
                <ul style={{ margin: '-10px 0 0', paddingLeft: '24px', lineHeight: 1.9 }}>
                  <li>Query expansion</li>
                  <li>Cross-encoder re-ranking</li>
                  <li>Metadata filtering</li>
                  <li>Prompt compression</li>
                </ul>
                <p style={{ margin: 0 }}>In a world increasingly focused on Agentic AI, we will take a step back and look at an equally important question: how far can we take a well-engineered RAG system before we actually need an AI agent?</p>
              </div>
            </section>

            <section data-reveal style={{ marginTop: '34px' }}>
              <h2 style={{ margin: '0 0 18px', color: '#fff', fontSize: '30px' }}>About Nikhilesh</h2>
              <div style={{ display: 'grid', gap: '16px', color: '#d8dcf5', fontSize: '17px', lineHeight: 1.8 }}>
                <p style={{ margin: 0 }}>Nikhilesh is an entrepreneur, teacher, and tech nerd. He is an IIT Kharagpur alumnus and a Google Developer Expert in AI, with over 18,000 followers on LinkedIn.</p>
                <p style={{ margin: 0 }}>He currently runs AI ML etc., an AI-enabled educational platform for senior IT professionals to learn AI. He has spoken at more than 70 technology events across the globe.</p>
                <p style={{ margin: 0 }}>Recently, he was felicitated by the Chief Minister of Rajasthan for his contribution to education.</p>
              </div>
            </section>

            <section data-reveal style={{ marginTop: '34px' }}>
              <h2 style={{ margin: '0 0 18px', color: '#fff', fontSize: '30px' }}>Connect with Nikhilesh</h2>
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
    <NikhileshSpeakerPage />
  </React.StrictMode>,
)

