import type { ReactNode } from 'react'
import { h } from '../lib/handlers'
import { CFPShapes } from '../lib/decor'
import { CFP_SESSIONIZE } from '../lib/links'

/**
 * All copy in this file is transcribed VERBATIM from the official CFP page,
 * https://sessionize.com/community-day-for-java-2026/ — the Sessionize text is the
 * source of truth (it carries the terms speakers agree to). Do not reword, shorten,
 * or add sentences here; if the Sessionize page changes, re-copy it. The only exceptions
 * are the page headline ("Share your Java story with the community."), the
 * "Submit on Sessionize" button label, and the "(tentative)" marker on the event
 * date/location chips — all added deliberately.
 */

const EVENT_INTRO = [
  'Community Day for Java is an annual community-driven conference that brings together Java enthusiasts, developers, architects, students, and technology leaders to learn, connect, and share knowledge.',
  'Organized by the Java User Group, Gujarat community, the event features expert talks, real-world experiences, emerging trends, and networking opportunities aimed at fostering collaboration and continuous learning within the Java ecosystem.',
]

// The date and venue are not locked yet (Sessionize lists the venue as "To be discussed"),
// so these two carry a "tentative" marker — the only wording on this page not from Sessionize.
const FACTS = [
  { label: 'event date', value: '24 Oct 2026' },
  { label: 'location', value: 'Ahmedabad, India' },
  { label: 'Call opens at 12:00 AM', value: '10 Aug 2026' },
  { label: 'Call closes at 11:59 PM', value: '15 Sep 2026' },
]

const TIMEZONE_NOTE = 'Call closes in India Standard Time (UTC+05:30) timezone.'

const PROPOSALS_INTRO = [
  "Java continues to evolve at an incredible pace. From modern language features and JVM innovations to cloud-native architectures, platform engineering, native deployments, and the rise of AI-powered applications, today's Java developers are solving some of the most exciting challenges in software engineering.",
  "We're looking for sessions that go beyond buzzwords and marketing slides. We value practical experiences, production stories, lessons learned, architectural insights, and actionable techniques that attendees can take back to their teams and apply immediately.",
  "Whether you've modernized a legacy system, optimized JVM performance, built resilient distributed systems, adopted GraalVM Native Images, experimented with Virtual Threads, integrated AI capabilities into Java applications, contributed to open source, or discovered a better way to build software with Java—we want to hear your story.",
  "Don't worry about selecting the right track when submitting your proposal. Simply submit the session you want to deliver—our CFP Review Committee will evaluate every proposal and assign accepted sessions to the most appropriate track as we curate the overall conference program.",
]

const TRACKS = [
  {
    title: 'Track 1: Java & JVM',
    text: 'Deep dives into the Java platform, language evolution, JVM internals, performance engineering, concurrency, testing, developer productivity, modern APIs, and practical coding techniques.',
    lead: 'Suggested topics include:',
    topics: [
      'Modern Java and language features',
      'Virtual Threads and Structured Concurrency',
      'JVM internals and performance tuning',
      'Testing strategies and Testcontainers',
      'Migrations and automated modernization',
      'High-performance APIs and communication patterns',
      'AI-assisted developer productivity',
      'Developer tooling and craftsmanship',
    ],
  },
  {
    title: 'Track 2: Enterprise Java',
    text: 'Framework-neutral discussions focused on building, modernizing, deploying, and operating Java applications in production.',
    lead: 'We welcome sessions covering:',
    topics: [
      'Cloud-native Java architectures',
      'Spring Boot, Quarkus, Micronaut, Helidon, Jakarta EE, and other enterprise Java technologies',
      'GraalVM Native Images, CRaC, Project Leyden, and native deployment experiences',
      'Event-driven architectures and messaging systems',
      'Kubernetes and containerized Java workloads',
      'Observability and operational excellence',
      'Security and software supply chain practices',
      'Platform engineering and developer experience',
      'Modernization and migration journeys',
      'Practical applications of AI in enterprise Java, including RAG, AI agents, MCP, and real-world adoption stories',
    ],
  },
  {
    title: 'Track 3: Workshops',
    text: 'Hands-on experiences designed to help attendees learn by doing.',
    lead: "We're especially interested in workshops that enable participants to build, experiment, and leave with practical skills they can apply immediately. Topics may include AI-powered Java applications, cloud-native development, Virtual Threads, Kafka, GraalVM, observability, testing, modernization, security, and performance engineering.",
    topics: [],
  },
]

const FORMATS_INTRO = 'To accommodate different styles of knowledge sharing, we invite proposals in the following formats:'

const FORMATS = [
  { label: 'Lightning Talk', duration: '15 minutes', text: 'Short, focused sessions designed to introduce a practical idea, library, JVM feature, production lesson, or open-source project. Lightning Talks are ideal for first-time speakers and emerging topics, with the goal of sparking curiosity and encouraging further discussion.' },
  { label: 'Tech Talk', duration: '25 minutes', text: 'Focused technical sessions that share a practical idea, implementation experience, case study, or specific lesson learned.' },
  { label: 'Deep Dive Session', duration: '40 minutes', text: 'Comprehensive sessions that explore a topic in greater depth through demonstrations, architectural discussions, production experiences, and actionable takeaways.' },
  { label: 'Hands-on Workshop', duration: '45 minutes', text: 'Interactive sessions designed to introduce participants to a technology or concept through guided exercises and practical examples.' },
  { label: 'Masterclass Workshop', duration: '90 minutes', text: 'Extended workshops that provide an immersive learning experience, enabling attendees to build, experiment, troubleshoot, and gain practical expertise through hands-on activities.' },
]

const STRONG_LEAD = 'We particularly value proposals that include:'

const STRONG_SUBMISSIONS = [
  'Real-world case studies and production experiences',
  'Honest lessons learned, including failures and trade-offs',
  'Live code demonstrations and interactive content',
  'Clear takeaways for attendees',
  'Open-source contributions and community experiences',
  'Practical approaches over theoretical discussions',
]

const LESS_LIKELY = [
  'Product pitches or vendor marketing',
  'Generic introductions with limited depth',
  'Benchmark-only talks without context',
  'Sessions that simply restate documentation',
  'AI hype without practical implementation or measurable outcomes',
  'Sessions that significantly overlap with commonly presented conference content without offering a unique perspective or practical experience.',
]

const REVIEW_PROCESS = [
  'Every submission is carefully reviewed by multiple members of our CFP Review Committee. We evaluate proposals based on their technical depth, originality, practical relevance, clarity, and overall value to the audience.',
  'Accepted speakers should expect to participate in a dry run with members of the review committee. These collaborative sessions provide constructive feedback on technical depth, content flow, demonstrations, communication, and time management. The goal is to help speakers refine their presentations—not to serve as an additional selection stage.',
  'Our goal is to build a balanced conference program. In addition to technical quality, we consider topic diversity, audience levels, session formats, and avoiding significant overlap between accepted sessions. As a result, even high-quality proposals may not be selected if they cover substantially similar content to other accepted talks.',
]

const AUDIENCE_LEAD = 'Our audience primarily consists of members of the professional Java community:'

const AUDIENCE = [
  '~70% working professionals, including junior and senior Java developers, technical leads, architects, engineering managers, and CXOs.',
  '~30% students and aspiring developers who are passionate about Java and eager to learn from experienced practitioners.',
]

const AUDIENCE_NOTE = "During submission, you'll also be asked to indicate the intended audience level for your session (Beginner, Intermediate, or Advanced). This helps us curate a balanced conference program and allows attendees to choose sessions that best match their experience."

const FIRST_TIME = [
  "First-time speakers are warmly encouraged to submit—if you have practical experiences, lessons learned, or ideas that can help fellow developers, we'd love to hear your story. Whether this is your first CFP or your fiftieth, we welcome diverse voices and perspectives from across the Java community.",
  "If you're new to public speaking, we especially encourage you to consider submitting a Lightning Talk or Tech Talk. Many experienced conference speakers began with shorter sessions, and we'd be delighted to help you start your speaking journey.",
]

const SPEAKER_GUIDELINES = [
  'You may submit multiple proposals.',
  'A maximum of two speakers is permitted per session.',
  'Original content is strongly encouraged.',
  'Live demonstrations are welcome where appropriate.',
  'Please ensure your proposal clearly communicates the value attendees will gain from attending your session.',
]

const EXPENSE_NOTE = [
  'We are a community-driven, volunteer-led conference organized with the sole objective of creating meaningful learning experiences for the Java community. We do not operate as a for-profit event, and our goal each year is simply to break even while delivering the best possible experience for our attendees.',
  'As a result, our ability to support speaker travel and accommodation is limited and depends on the overall event budget and sponsorship contributions. For accepted speakers travelling from outside Gujarat, we may be able to provide partial or full assistance on a case-by-case basis, subject to budget availability. Unfortunately, we are unable to guarantee such support for all speakers.',
  "If your organization has programs that support community speaking engagements, we'd be delighted if you could explore that option. In appreciation of their support, we would be happy to acknowledge your organization as a Community Supporter on our event website and give them a special shout-out across our social media channels.",
  'Thank you for your understanding and for helping us keep this conference sustainable, accessible, and truly community-first.',
]

const EXPENSE_TERMS = 'As a not-for-profit community conference, speaker expense coverage is limited and considered on a case-by-case basis, subject to available budget, sponsorship commitments, and applicable terms and conditions.'

const FINAL_NOTE = [
  "The Java ecosystem thrives because developers are willing to share what they've learned with others. Some of the best conference talks don't begin with a groundbreaking new framework—they begin with a difficult production problem, an unexpected discovery, or a hard-earned lesson that can help someone else become a better engineer.",
  "We can't wait to see what you'll bring to the stage.",
]

const cardStyle = {
  background: '#fff',
  borderRadius: '28px',
  padding: '30px',
  border: '1px solid rgba(14,22,103,.08)',
  boxShadow: '0 18px 42px rgba(14,22,103,.08)',
} as const

const eyebrowStyle = {
  fontSize: '13px',
  fontWeight: 800,
  letterSpacing: '1px',
  textTransform: 'uppercase',
  color: '#0D5CDB',
  marginBottom: '16px',
} as const

const bodyStyle = { fontSize: '14px', lineHeight: 1.7, color: '#42498a' } as const

/** A bulleted line with a coloured dot, matching the rest of the page's list styling. */
function Bullet({ children, color }: { children: ReactNode; color: string }) {
  return (
    <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', ...bodyStyle }}>
      <span style={{ flex: '0 0 auto', width: '8px', height: '8px', borderRadius: '50%', background: color, marginTop: '8px' }} />
      <span>{children}</span>
    </div>
  )
}

export default function CFP() {
  return (
    <section id="cfp" style={{ position: 'relative', padding: '84px 40px', background: 'linear-gradient(180deg,#F4F1E8 0%,#fff8ee 100%)', color: '#0E1667', overflow: 'hidden' }}>
      <CFPShapes />

      <div style={{ position: 'relative', zIndex: 3, maxWidth: '1180px', margin: '0 auto' }}>
        <div data-reveal style={{ marginBottom: '30px', maxWidth: '900px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(13,92,219,.08)', color: '#0D5CDB', padding: '9px 14px', borderRadius: '999px', fontSize: '12px', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '18px' }}>
            Call for Papers
          </div>
          <h2 style={{ margin: 0, fontWeight: 500, fontSize: 'clamp(30px,4.4vw,58px)', lineHeight: 1, letterSpacing: '-1.7px' }}>
            Share your <span style={{ fontFamily: "'Roboto',sans-serif", fontWeight: 700, color: '#0D5CDB' }}>Java story</span> with the community.
          </h2>
          {EVENT_INTRO.map((p) => (
            <p key={p} style={{ margin: '18px 0 0', maxWidth: '860px', fontSize: '17px', lineHeight: 1.65, fontWeight: 500, color: '#42498a' }}>{p}</p>
          ))}
        </div>

        {/* `repeat(4, 1fr)` on purpose, NOT `minmax(0, 1fr)`: global.css turns any grid whose
            inline style reads "repeat(4, minmax(0px, 1fr)" into a swipeable card carousel at
            <=600px, which is wrong for these short chips. See the #cfp-facts rules there. */}
        <div id="cfp-facts" data-reveal data-reveal-d="40" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '14px' }}>
          {FACTS.map((f) => (
            <div key={f.label} style={{ background: '#fff', borderRadius: '20px', padding: '18px 20px', border: '1px solid rgba(14,22,103,.08)', boxShadow: '0 14px 32px rgba(14,22,103,.06)' }}>
              <div style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '.6px', textTransform: 'uppercase', color: '#0D5CDB', marginBottom: '8px' }}>{f.label}</div>
              <div style={{ fontSize: '19px', fontWeight: 800, color: '#0E1667' }}>{f.value}</div>
            </div>
          ))}
        </div>
        <div data-reveal data-reveal-d="50" style={{ marginBottom: '28px', fontSize: '13.5px', fontWeight: 600, color: '#5a6299' }}>{TIMEZONE_NOTE}</div>

        {/* Landscape hero card: the blue panel runs the full width, the white cards follow below. */}
        <div id="cfp-layout" style={{ display: 'grid', gap: '24px' }}>
          <div data-reveal data-reveal-d="60" style={{ position: 'relative', background: 'linear-gradient(150deg,#1a2670,#0E1667)', borderRadius: '30px', padding: '40px', color: '#fff', boxShadow: '0 34px 74px rgba(14,22,103,.22)', overflow: 'hidden' }}>
            <span style={{ position: 'absolute', top: '-26px', right: '-26px', width: '120px', height: '120px', borderRadius: '50%', background: 'rgba(254,196,0,.12)' }} />
            <span style={{ position: 'absolute', bottom: '22px', right: '28px', width: '26px', height: '26px', borderRadius: '50%', background: 'rgba(255,255,255,.14)' }} />

            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <h3 style={{ margin: 0, fontSize: 'clamp(28px,3.8vw,48px)', lineHeight: 1.02, letterSpacing: '-1.4px', fontWeight: 600 }}>
                Call for Proposals
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {PROPOSALS_INTRO.map((p) => (
                  <p key={p} style={{ margin: 0, maxWidth: '1000px', fontSize: '16px', lineHeight: 1.75, color: '#d5dbff' }}>{p}</p>
                ))}
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                <a href={CFP_SESSIONIZE} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: '#FEC400', color: '#0E1667', fontWeight: 800, fontSize: '14px', padding: '15px 24px', borderRadius: '46px', textDecoration: 'none', boxShadow: '0 16px 40px rgba(254,196,0,.32)' }} onMouseEnter={h.btnOn} onMouseLeave={h.btnOff}>
                  Submit on Sessionize
                </a>
              </div>

              <div id="cfp-tracks" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '14px', marginTop: '8px', alignItems: 'start' }}>
                {TRACKS.map((track) => (
                  <div key={track.title} style={{ background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.1)', borderRadius: '18px', padding: '18px 20px', fontSize: '14px', lineHeight: 1.6, color: '#eef1ff' }}>
                    <div style={{ fontWeight: 800, fontSize: '16px', marginBottom: '8px', color: '#fff' }}>{track.title}</div>
                    <div>{track.text}</div>
                    <div style={{ marginTop: '10px', fontSize: '13.5px', color: '#c3cbff' }}>{track.lead}</div>
                    {track.topics.length > 0 && (
                      <div style={{ marginTop: '12px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {track.topics.map((topic) => (
                          <span key={topic} style={{ display: 'inline-flex', alignItems: 'center', background: 'rgba(254,196,0,.12)', color: '#FEC400', padding: '6px 10px', borderRadius: '999px', fontSize: '12px', fontWeight: 700 }}>
                            {topic}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '24px', display: 'grid', gap: '18px' }}>
          <div data-reveal data-reveal-d="40" style={cardStyle}>
            <div style={eyebrowStyle}>Session Formats</div>
            <p style={{ margin: '0 0 16px', ...bodyStyle }}>{FORMATS_INTRO}</p>
            <div id="cfp-formats" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '14px' }}>
              {FORMATS.map((format) => (
                <div key={format.label} style={{ border: '1px solid rgba(14,22,103,.08)', borderRadius: '20px', padding: '18px', background: 'linear-gradient(180deg,#fff,#f9fbff)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', alignItems: 'baseline', marginBottom: '8px' }}>
                    <div style={{ fontWeight: 800, fontSize: '16px', color: '#0E1667' }}>{format.label}</div>
                    <div style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '1px', color: '#0D5CDB', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{format.duration}</div>
                  </div>
                  <div style={{ fontSize: '13.5px', lineHeight: 1.6, color: '#5a6299' }}>{format.text}</div>
                </div>
              ))}
            </div>
          </div>

          <div id="cfp-value-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '18px', alignItems: 'start' }}>
            <div data-reveal data-reveal-d="80" style={cardStyle}>
              <div style={eyebrowStyle}>What Makes a Strong Submission?</div>
              <p style={{ margin: '0 0 14px', ...bodyStyle }}>{STRONG_LEAD}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {STRONG_SUBMISSIONS.map((item) => <Bullet key={item} color="#02CF70">{item}</Bullet>)}
              </div>
            </div>

            <div data-reveal data-reveal-d="100" style={cardStyle}>
              <div style={eyebrowStyle}>What We're Less Likely to Accept</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {LESS_LIKELY.map((item) => <Bullet key={item} color="#FF384B">{item}</Bullet>)}
              </div>
            </div>
          </div>

          <div id="cfp-info-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '18px', alignItems: 'start' }}>
            <div data-reveal data-reveal-d="120" style={cardStyle}>
              <div style={eyebrowStyle}>Our Review Process</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {REVIEW_PROCESS.map((p) => <p key={p} style={{ margin: 0, ...bodyStyle }}>{p}</p>)}
              </div>
            </div>

            <div data-reveal data-reveal-d="140" style={cardStyle}>
              <div style={eyebrowStyle}>Who Will Be in the Audience?</div>
              <p style={{ margin: '0 0 14px', ...bodyStyle }}>{AUDIENCE_LEAD}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {AUDIENCE.map((item) => <Bullet key={item} color="#FEC400">{item}</Bullet>)}
              </div>
              <p style={{ margin: '14px 0 0', ...bodyStyle }}>{AUDIENCE_NOTE}</p>
            </div>
          </div>

          <div id="cfp-steps-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '18px', alignItems: 'start' }}>
            <div data-reveal data-reveal-d="150" style={cardStyle}>
              <div style={eyebrowStyle}>First Time Speakers are Welcome!</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {FIRST_TIME.map((p) => <p key={p} style={{ margin: 0, ...bodyStyle }}>{p}</p>)}
              </div>
            </div>

            <div data-reveal data-reveal-d="160" style={cardStyle}>
              <div style={eyebrowStyle}>Speaker Guidelines</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {SPEAKER_GUIDELINES.map((item) => <Bullet key={item} color="#FF384B">{item}</Bullet>)}
              </div>
            </div>
          </div>

          <div data-reveal data-reveal-d="180" style={{ background: 'linear-gradient(150deg,#1a2670,#0E1667)', color: '#fff', borderRadius: '28px', padding: '30px', boxShadow: '0 18px 42px rgba(14,22,103,.2)' }}>
            <div style={{ fontSize: '13px', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase', color: '#FEC400', marginBottom: '16px' }}>
              Special Note on Speaker Expense Coverage
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', lineHeight: 1.75, color: '#d5dbff' }}>
              {EXPENSE_NOTE.map((p) => <p key={p} style={{ margin: 0 }}>{p}</p>)}
            </div>
            <div style={{ marginTop: '18px', paddingTop: '18px', borderTop: '1px solid rgba(255,255,255,.14)', fontSize: '13px', lineHeight: 1.6, color: '#eef1ff' }}>
              {EXPENSE_TERMS}
            </div>
          </div>

          <div data-reveal data-reveal-d="200" style={cardStyle}>
            <div style={eyebrowStyle}>Final Note</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {FINAL_NOTE.map((p) => <p key={p} style={{ margin: 0, ...bodyStyle }}>{p}</p>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
