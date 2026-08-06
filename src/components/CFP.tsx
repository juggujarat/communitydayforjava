import { h } from '../lib/handlers'
import { CFP_MAILTO, CFP_SESSIONIZE } from '../lib/links'

const STEP_SPECS = [
  {
    title: 'Pick a topic',
    text: 'Choose a talk that fits one of our tracks: Core Java, Enterprise & Cloud, Workshops, or Java for the AI era.',
  },
  {
    title: 'Submit on Sessionize',
    text: 'Use the official form to share your title, abstract, speaker bio, and any practical details that help the committee review it.',
  },
  {
    title: 'Committee review',
    text: 'The CFP committee reviews proposals for clarity, relevance, audience fit, and the value they bring to the community.',
  },
  {
    title: 'Follow-up and lineup',
    text: 'Accepted speakers are contacted with the next steps, and the final schedule is published closer to the event.',
  },
]

const TRACKS = [
  {
    title: 'Java & JVM',
    text: 'Modern Java language features, JVM internals, concurrency, testing, performance engineering, developer productivity, and practical coding techniques.',
    topics: [
      'Modern Java and language features',
      'Virtual Threads and Structured Concurrency',
      'JVM internals and performance tuning',
      'Testing strategies and Testcontainers',
      'Migrations and automated modernization',
      'AI-assisted developer productivity',
    ],
  },
  {
    title: 'Enterprise Java',
    text: 'Framework-neutral sessions on building, deploying, operating, and modernizing Java applications in production.',
    topics: [
      'Cloud-native Java architectures',
      'Spring Boot, Quarkus, Micronaut, Helidon, Jakarta EE',
      'GraalVM Native Images and native deployment',
      'Event-driven architectures and messaging',
      'Kubernetes and containerized Java workloads',
      'Observability, security, and platform engineering',
    ],
  },
  {
    title: 'Workshops',
    text: 'Hands-on learning experiences where attendees build, experiment, and leave with practical skills they can apply immediately.',
    topics: [
      'AI-powered Java applications',
      'Cloud-native development',
      'Virtual Threads and concurrency',
      'Kafka, GraalVM, observability, and testing',
      'Modernization and security',
      'Performance engineering labs',
    ],
  },
  {
    title: 'AI in Java',
    text: 'Practical applications of AI in Java, including RAG, AI agents, MCP, and real-world adoption stories.',
    topics: [
      'Java applications with AI capabilities',
      'RAG pipelines and assistants',
      'AI agents and orchestration',
      'MCP integrations',
      'Production learnings and trade-offs',
      'Measurable outcomes over hype',
    ],
  },
]

const FORMATS = [
  { label: 'Lightning Talk', duration: '15 min', text: 'Short, focused sessions that introduce a practical idea, library, JVM feature, production lesson, or open-source project.' },
  { label: 'Tech Talk', duration: '25 min', text: 'Focused technical sessions that share a practical idea, implementation experience, case study, or specific lesson learned.' },
  { label: 'Deep Dive Session', duration: '40 min', text: 'Comprehensive sessions with demonstrations, architectural discussion, production experiences, and actionable takeaways.' },
  { label: 'Hands-on Workshop', duration: '45 min', text: 'Interactive sessions that guide attendees through a technology or concept using exercises and examples.' },
  { label: 'Masterclass Workshop', duration: '90 min', text: 'Extended workshops that provide an immersive learning experience with hands-on activities and troubleshooting.' },
]

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
  'Topics that heavily overlap with common conference talks without a unique angle',
]

const REVIEW_POINTS = [
  'Every submission is reviewed by multiple committee members.',
  'We look at technical depth, originality, practical relevance, clarity, and value to the audience.',
  'Accepted speakers should expect a dry run with the committee so we can help refine the talk.',
  'We also balance the final program by topic, audience level, format, and overlap across sessions.',
]

const AUDIENCE = [
  '~70% working professionals, including developers, leads, architects, engineering managers, and CXOs',
  '~30% students and aspiring developers who want to learn from experienced practitioners',
  'During submission, you will be asked to indicate the intended audience level: Beginner, Intermediate, or Advanced',
]

const SPEAKER_GUIDELINES = [
  'You may submit multiple proposals.',
  'A maximum of two speakers is permitted per session.',
  'Original content is strongly encouraged.',
  'Live demonstrations are welcome where appropriate.',
  'Make the value to attendees obvious in the proposal.',
]

const SUPPORT_NOTES = [
  'We are a volunteer-led, community-driven conference and do not guarantee travel or accommodation support.',
  'For accepted speakers outside Gujarat, assistance may be available on a case-by-case basis depending on budget and sponsorship support.',
  'If your organization supports community speaking, we would appreciate that help and will gladly acknowledge it as a community supporter.',
]

export default function CFP() {
  return (
    <section id="cfp" style={{ position: 'relative', padding: '84px 40px', background: 'linear-gradient(180deg,#F4F1E8 0%,#fff8ee 100%)', color: '#0E1667', overflow: 'hidden' }}>
      <span style={{ position: 'absolute', top: '10%', left: '7%', width: '72px', height: '72px', borderRadius: '50%', background: 'rgba(13,92,219,.12)' }} />
      <span style={{ position: 'absolute', bottom: '10%', right: '6%', width: '26px', height: '26px', background: '#FF384B', clipPath: 'polygon(50% 0,100% 50%,50% 100%,0 50%)', opacity: 0.8, animation: 'cdj-float2 9s ease-in-out infinite' }} />

      <div style={{ position: 'relative', zIndex: 3, maxWidth: '1180px', margin: '0 auto' }}>
        <div data-reveal style={{ marginBottom: '42px', maxWidth: '820px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(13,92,219,.08)', color: '#0D5CDB', padding: '9px 14px', borderRadius: '999px', fontSize: '12px', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '18px' }}>
            Call for Papers
          </div>
          <h2 style={{ margin: 0, fontWeight: 500, fontSize: 'clamp(34px,5vw,66px)', lineHeight: 0.96, letterSpacing: '-1.7px' }}>
            Share your <span style={{ fontFamily: "'Roboto',sans-serif", fontWeight: 700, color: '#0D5CDB' }}>Java story</span> with the community.
          </h2>
          <p style={{ margin: '18px 0 0', maxWidth: '760px', fontSize: '18px', lineHeight: 1.65, fontWeight: 500, color: '#42498a' }}>
            Community Day for Java uses Sessionize for CFP submissions. If you have a practical talk, a real-world case study, or a hands-on workshop, this is the place to submit it.
          </p>
        </div>

        <div id="cfp-layout" style={{ display: 'grid', gridTemplateColumns: '1.1fr .9fr', gap: '24px', alignItems: 'stretch' }}>
          <div data-reveal data-reveal-d="60" style={{ position: 'relative', background: 'linear-gradient(150deg,#1a2670,#0E1667)', borderRadius: '30px', padding: '40px', color: '#fff', boxShadow: '0 34px 74px rgba(14,22,103,.22)', overflow: 'hidden' }}>
            <span style={{ position: 'absolute', top: '-26px', right: '-26px', width: '120px', height: '120px', borderRadius: '50%', background: 'rgba(254,196,0,.12)' }} />
            <span style={{ position: 'absolute', bottom: '22px', right: '28px', width: '26px', height: '26px', borderRadius: '50%', background: 'rgba(255,255,255,.14)' }} />

            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase', color: '#FEC400', marginBottom: '10px' }}>
                  How the CFP works
                </div>
                <h3 style={{ margin: 0, fontSize: 'clamp(28px,3.8vw,48px)', lineHeight: 1.02, letterSpacing: '-1.4px', fontWeight: 600 }}>
                  Submit through Sessionize, then let the committee do the review.
                </h3>
              </div>

              <p style={{ margin: 0, maxWidth: '620px', fontSize: '17px', lineHeight: 1.7, color: '#d5dbff' }}>
                We want talks that are useful on stage and useful after the event. If your session is grounded in experience, has a clear audience, and offers practical takeaways, it belongs here.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                <a href={CFP_SESSIONIZE} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: '#FEC400', color: '#0E1667', fontWeight: 800, fontSize: '14px', padding: '15px 24px', borderRadius: '46px', textDecoration: 'none', boxShadow: '0 16px 40px rgba(254,196,0,.32)' }} onMouseEnter={h.btnOn} onMouseLeave={h.btnOff}>
                  Submit on Sessionize
                </a>
                <a href={CFP_MAILTO} style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'transparent', color: '#fff', fontWeight: 700, fontSize: '14px', padding: '15px 22px', borderRadius: '46px', textDecoration: 'none', border: '1.5px solid rgba(255,255,255,.28)' }} onMouseEnter={h.ghostOn} onMouseLeave={h.ghostOff}>
                  Email the organizers
                </a>
              </div>

              <div id="cfp-tracks" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '14px', marginTop: '8px' }}>
                {TRACKS.map((track) => (
                  <div key={track.title} style={{ background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.1)', borderRadius: '18px', padding: '16px 18px', fontSize: '14px', lineHeight: 1.5, color: '#eef1ff' }}>
                    <div style={{ fontWeight: 800, fontSize: '15px', marginBottom: '6px', color: '#fff' }}>{track.title}</div>
                    <div>{track.text}</div>
                    <div style={{ marginTop: '12px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {track.topics.map((topic) => (
                        <span key={topic} style={{ display: 'inline-flex', alignItems: 'center', background: 'rgba(254,196,0,.12)', color: '#FEC400', padding: '6px 10px', borderRadius: '999px', fontSize: '12px', fontWeight: 700 }}>
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div data-reveal data-reveal-d="120" style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div style={{ background: '#fff', borderRadius: '26px', padding: '26px', border: '1px solid rgba(14,22,103,.08)', boxShadow: '0 18px 42px rgba(14,22,103,.08)' }}>
              <div style={{ fontSize: '13px', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase', color: '#0D5CDB', marginBottom: '18px' }}>
                Submission process
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {STEP_SPECS.map((step, index) => (
                  <div key={step.title} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    <div style={{ flex: '0 0 auto', width: '34px', height: '34px', borderRadius: '50%', background: index === 1 ? '#FEC400' : 'rgba(13,92,219,.08)', color: index === 1 ? '#0E1667' : '#0D5CDB', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 800 }}>
                      {index + 1}
                    </div>
                    <div>
                      <div style={{ fontSize: '16px', fontWeight: 800, color: '#0E1667', marginBottom: '4px' }}>{step.title}</div>
                      <div style={{ fontSize: '13.5px', lineHeight: 1.6, color: '#5a6299' }}>{step.text}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: '#fff', borderRadius: '26px', padding: '26px', border: '1px solid rgba(14,22,103,.08)', boxShadow: '0 18px 42px rgba(14,22,103,.08)' }}>
              <div style={{ fontSize: '13px', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase', color: '#0D5CDB', marginBottom: '14px' }}>
                Submission checklist
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  'Submit the session you want to deliver; do not worry about choosing a track.',
                  'Explain the problem, the approach, and the outcome in plain language.',
                  'Include the intended audience level when the form asks for it.',
                  'If it is a workshop, make the hands-on structure explicit.',
                  'Use the description to show practical value, not just topic keywords.',
                ].map((item) => (
                  <div key={item} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: '14px', lineHeight: 1.6, color: '#42498a' }}>
                    <span style={{ flex: '0 0 auto', width: '8px', height: '8px', borderRadius: '50%', background: '#FF384B', marginTop: '8px' }} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '24px', display: 'grid', gap: '18px' }}>
          <div data-reveal data-reveal-d="40" style={{ background: '#fff', borderRadius: '28px', padding: '30px', border: '1px solid rgba(14,22,103,.08)', boxShadow: '0 18px 42px rgba(14,22,103,.08)' }}>
            <div style={{ fontSize: '13px', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase', color: '#0D5CDB', marginBottom: '16px' }}>
              Session formats
            </div>
            <div id="cfp-formats" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '14px' }}>
              {FORMATS.map((format) => (
                <div key={format.label} style={{ border: '1px solid rgba(14,22,103,.08)', borderRadius: '20px', padding: '18px', background: 'linear-gradient(180deg,#fff,#f9fbff)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', alignItems: 'baseline', marginBottom: '8px' }}>
                    <div style={{ fontWeight: 800, fontSize: '16px', color: '#0E1667' }}>{format.label}</div>
                    <div style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '1px', color: '#0D5CDB', textTransform: 'uppercase' }}>{format.duration}</div>
                  </div>
                  <div style={{ fontSize: '13.5px', lineHeight: 1.6, color: '#5a6299' }}>{format.text}</div>
                </div>
              ))}
            </div>
          </div>

          <div id="cfp-value-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '18px' }}>
            <div data-reveal data-reveal-d="80" style={{ background: '#fff', borderRadius: '28px', padding: '30px', border: '1px solid rgba(14,22,103,.08)', boxShadow: '0 18px 42px rgba(14,22,103,.08)' }}>
              <div style={{ fontSize: '13px', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase', color: '#0D5CDB', marginBottom: '16px' }}>
                What we value
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {STRONG_SUBMISSIONS.map((item) => (
                  <div key={item} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: '14px', lineHeight: 1.6, color: '#42498a' }}>
                    <span style={{ flex: '0 0 auto', width: '8px', height: '8px', borderRadius: '50%', background: '#02CF70', marginTop: '8px' }} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div data-reveal data-reveal-d="100" style={{ background: '#fff', borderRadius: '28px', padding: '30px', border: '1px solid rgba(14,22,103,.08)', boxShadow: '0 18px 42px rgba(14,22,103,.08)' }}>
              <div style={{ fontSize: '13px', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase', color: '#0D5CDB', marginBottom: '16px' }}>
                Less likely to be accepted
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {LESS_LIKELY.map((item) => (
                  <div key={item} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: '14px', lineHeight: 1.6, color: '#42498a' }}>
                    <span style={{ flex: '0 0 auto', width: '8px', height: '8px', borderRadius: '50%', background: '#FF384B', marginTop: '8px' }} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div id="cfp-info-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '18px' }}>
            <div data-reveal data-reveal-d="120" style={{ background: '#fff', borderRadius: '28px', padding: '30px', border: '1px solid rgba(14,22,103,.08)', boxShadow: '0 18px 42px rgba(14,22,103,.08)' }}>
              <div style={{ fontSize: '13px', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase', color: '#0D5CDB', marginBottom: '16px' }}>
                Review process
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {REVIEW_POINTS.map((item) => (
                  <div key={item} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: '14px', lineHeight: 1.6, color: '#42498a' }}>
                    <span style={{ flex: '0 0 auto', width: '8px', height: '8px', borderRadius: '50%', background: '#0D5CDB', marginTop: '8px' }} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div data-reveal data-reveal-d="140" style={{ background: '#fff', borderRadius: '28px', padding: '30px', border: '1px solid rgba(14,22,103,.08)', boxShadow: '0 18px 42px rgba(14,22,103,.08)' }}>
              <div style={{ fontSize: '13px', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase', color: '#0D5CDB', marginBottom: '16px' }}>
                Audience and speakers
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {AUDIENCE.map((item) => (
                  <div key={item} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: '14px', lineHeight: 1.6, color: '#42498a' }}>
                    <span style={{ flex: '0 0 auto', width: '8px', height: '8px', borderRadius: '50%', background: '#FEC400', marginTop: '8px' }} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '18px' }}>
            <div data-reveal data-reveal-d="160" style={{ background: '#fff', borderRadius: '28px', padding: '30px', border: '1px solid rgba(14,22,103,.08)', boxShadow: '0 18px 42px rgba(14,22,103,.08)' }}>
              <div style={{ fontSize: '13px', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase', color: '#0D5CDB', marginBottom: '16px' }}>
                Speaker guidelines
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {SPEAKER_GUIDELINES.map((item) => (
                  <div key={item} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: '14px', lineHeight: 1.6, color: '#42498a' }}>
                    <span style={{ flex: '0 0 auto', width: '8px', height: '8px', borderRadius: '50%', background: '#FF384B', marginTop: '8px' }} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div data-reveal data-reveal-d="180" style={{ background: 'linear-gradient(150deg,#1a2670,#0E1667)', color: '#fff', borderRadius: '28px', padding: '30px', boxShadow: '0 18px 42px rgba(14,22,103,.2)' }}>
              <div style={{ fontSize: '13px', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase', color: '#FEC400', marginBottom: '16px' }}>
                Speaker support
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', lineHeight: 1.7, color: '#d5dbff' }}>
                {SUPPORT_NOTES.map((item) => (
                  <div key={item} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <span style={{ flex: '0 0 auto', width: '8px', height: '8px', borderRadius: '50%', background: '#FEC400', marginTop: '8px' }} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '18px', paddingTop: '18px', borderTop: '1px solid rgba(255,255,255,.14)', fontSize: '13px', lineHeight: 1.6, color: '#eef1ff' }}>
                Final note: the best talks usually start from a hard problem, an unexpected discovery, or a lesson learned in production. We are looking for those stories.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
