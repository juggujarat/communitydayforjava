import React from 'react'
import ReactDOM from 'react-dom/client'
import Nav from './components/Nav'
import Footer from './components/Footer'
import SpeakerLinks from './components/SpeakerLinks'
import BrickDivider from './components/BrickDivider'
import { useDCEffects } from './hooks/useDCEffects'
import { A } from './lib/assets'
import './styles/global.css'

function SivaSpeakerPage() {
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
                <img src="/assets/siva reddy.jpg" alt="Siva Prasad Reddy Katamreddy" style={{ display: 'block', width: '100%', maxHeight: '340px', objectFit: 'cover', objectPosition: 'center' }} />
              </div>
              <div data-reveal>
                <div style={{ marginBottom: '12px', color: '#FEC400', fontSize: '14px', fontWeight: 800, letterSpacing: '2px' }}>COMMUNITY DAY FOR JAVA 2026 SPEAKER</div>
                <h1 style={{ margin: '0 0 14px', fontSize: 'clamp(34px,5vw,58px)', lineHeight: 1.05, color: '#fff' }}>Siva Prasad Reddy Katamreddy</h1>
                <p style={{ margin: '0 0 26px', color: '#c4caf0', fontSize: '20px', fontWeight: 600 }}>Developer Advocate at JetBrains</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {['Modern Java', 'Cloud-native architecture', 'Developer productivity'].map((topic) => <span key={topic} style={{ padding: '9px 14px', border: '1px solid rgba(254,196,0,.42)', borderRadius: '30px', background: 'rgba(254,196,0,.1)', color: '#ffe27a', fontSize: '14px', fontWeight: 600 }}>{topic}</span>)}
                </div>
              </div>
            </section>

            <section data-reveal style={{ marginTop: '60px', padding: '32px', borderRadius: '20px', background: 'rgba(255,255,255,.07)', border: '1px solid rgba(255,255,255,.13)' }}>
              <div style={{ color: '#FEC400', fontSize: '13px', fontWeight: 800, letterSpacing: '2px' }}>TALK DETAILS</div>
              <h2 style={{ margin: '10px 0 12px', color: '#fff', fontSize: '30px' }}>Sustainable Software Engineering in the Age of AI</h2>
              <p style={{ margin: '0 0 24px', color: '#ffe27a', fontSize: '17px', fontWeight: 700 }}>Summary</p>
              <p style={{ margin: '-16px 0 24px', color: '#c4caf0', fontSize: '17px', lineHeight: 1.7 }}>This session examines sustainable AI-assisted development through pragmatic code review, automated quality gates, verifiable changes, and strategies to prevent burnout and cognitive overload.</p>
              <h3 style={{ margin: '0 0 12px', color: '#fff', fontSize: '21px' }}>Description</h3>
              <p style={{ margin: '0 0 16px', color: '#c4caf0', fontSize: '17px', lineHeight: 1.7 }}>AI coding agents have fundamentally changed how we build software. We can generate code faster than ever, but faster coding doesn't necessarily mean sustainable software development. This session explores the less-discussed challenges of AI-assisted development: increasing code volume, context switching, comprehension debt, over-reliance on AI, inconsistent quality, and the pressure to continuously keep up with rapidly evolving tools.</p>
              <p style={{ margin: '0 0 12px', color: '#c4caf0', fontSize: '17px', lineHeight: 1.7 }}>Should we review AI-generated code? Absolutely! But reviewing everything line by line isn't sustainable either. We'll explore a pragmatic approach to maintaining quality without turning developers into full-time AI-code reviewers:</p>
              <ul style={{ margin: '0 0 22px', paddingLeft: '24px', color: '#c4caf0', fontSize: '17px', lineHeight: 1.9 }}>
                <li>What should always be reviewed?</li>
                <li>How much trust should we place in AI-generated code?</li>
                <li>How can tests, static analysis, architecture rules, and automated verification act as quality gates?</li>
                <li>How can specification-driven development and smaller, verifiable changes keep AI agents under control?</li>
              </ul>
              <p style={{ margin: 0, color: '#c4caf0', fontSize: '17px', lineHeight: 1.7 }}>Finally, we'll look beyond code quality at developer sustainability. If AI makes writing code cheaper, it can also make producing and reviewing more code the default. We'll discuss practical strategies for avoiding burnout, review fatigue, and AI-induced cognitive overloadâ€”so that AI becomes a force multiplier rather than another source of pressure.</p>
            </section>

            <section data-reveal style={{ marginTop: '34px' }}>
              <h2 style={{ margin: '0 0 18px', color: '#fff', fontSize: '30px' }}>About Siva</h2>
              <div style={{ display: 'grid', gap: '16px', color: '#d8dcf5', fontSize: '17px', lineHeight: 1.8 }}>
                <p style={{ margin: 0 }}>Siva is a Developer Advocate at JetBrains with over 19 years of experience building scalable, distributed enterprise systems. His career spans hands-on software development, architecture, and cloud-native system design across domains such as banking and e-commerce.</p>
                <p style={{ margin: 0 }}>He has deep expertise in the Java ecosystem and modern backend development using monolithic, microservices, and event-driven architectures, with a strong emphasis on code quality and scalability.</p>
                <p style={{ margin: 0 }}>In his role as a Developer Advocate, Siva focuses on empowering developers by simplifying complex concepts, creating educational content, and bridging the gap between engineering and developer communities. He shares practical insights through his <a href="https://sivalabs.in" target="_blank" rel="noreferrer" style={{ color: '#FEC400' }}>blog</a> and <a href="https://youtube.com/sivalabs" target="_blank" rel="noreferrer" style={{ color: '#FEC400' }}>YouTube channel</a>.</p>
                <p style={{ margin: 0 }}>Siva is the author of <em>Beginning Spring Boot</em> (Apress), <em>PrimeFaces Beginners Guide</em> (Packt), and <em>Java Persistence with MyBatis 3</em>. He has spoken at international and local conferences, sharing insights on cloud-native architectures, modern Java development, and developer productivity.</p>
              </div>
            </section>

            <section data-reveal style={{ marginTop: '34px' }}>
              <h2 style={{ margin: '0 0 18px', color: '#fff', fontSize: '30px' }}>Find Siva online</h2>
              <SpeakerLinks links={[
                { type: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/ksivaprasadreddy/' },
                { type: 'website', label: 'Blog', href: 'https://sivalabs.in' },
                { type: 'website', label: 'JetBrains', href: 'https://www.jetbrains.com' },
                { type: 'youtube', label: 'YouTube', href: 'https://youtube.com/sivalabs' },
                { type: 'website', label: 'Bluesky', href: 'https://bsky.app/profile/sivalabs.in' },
                { type: 'x', label: 'X · @sivalabs', href: 'https://x.com/sivalabs' },
              ]} />
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
    <SivaSpeakerPage />
  </React.StrictMode>,
)

