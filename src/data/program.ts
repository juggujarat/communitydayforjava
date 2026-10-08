/**
 * The conference programme: Sessionize's snapshot (src/data/sessionize.json, refreshed
 * with `npm run sync:sessionize`) merged with what Sessionize can't tell us — which of
 * the two days a session belongs to, the outcome-first copy, and the curated speaker
 * profiles.
 *
 * Pure data, no React: vite.config.ts imports this to build the route list / sitemap.
 * To add a session once it exists in Sessionize, add its id to SESSION_EXTRAS below.
 */
import snapshot from './sessionize.json'

export type DayId = 'workshop' | 'conference'

export interface Day {
  id: DayId
  label: string
  /** One-word promise shown on chips ("Build" / "Learn"). */
  verb: string
  format: string
  date: string
  iso: string
  weekday: string
  accent: string
  /** Text colour that stays readable on a solid `accent` fill. */
  onAccent: string
  blurb: string
  path: string
}

export const DAYS: Record<DayId, Day> = {
  workshop: {
    id: 'workshop', label: 'Workshop', verb: 'Build', format: 'Hands-on lab',
    date: '17 Oct 2026', iso: '2026-10-17', weekday: 'Saturday',
    accent: '#02CF70', onAccent: '#06241a',
    blurb: 'A separate hands-on day, one week before the conference. Bring your laptop and build it yourself.',
    path: '/agenda/#workshop',
  },
  conference: {
    id: 'conference', label: 'Conference', verb: 'Learn', format: 'Talk',
    date: '24 Oct 2026', iso: '2026-10-24', weekday: 'Saturday',
    accent: '#FEC400', onAccent: '#0E1667',
    blurb: 'The main event day: expert talks on Java, AI and cloud-native engineering, with developers from across the community.',
    path: '/agenda/#conference',
  },
}
export const DAY_ORDER: DayId[] = ['workshop', 'conference']

export interface Speaker {
  id: string
  slug: string
  name: string
  role: string
  /** One-line introduction (the achievement that makes you want to hear them), shown under name + role. Curated, not from Sessionize. */
  tagline: string
  bio: string[]
  image: string
  bg: string
  topics: string[]
  links: { type: 'linkedin' | 'x' | 'github' | 'instagram' | 'website' | 'whatsapp' | 'email' | 'youtube'; label: string; href: string }[]
  sessionIds: string[]
}

export interface Session {
  id: string
  slug: string
  title: string
  day: DayId
  /** "Masterclass", "Talk", "Hands-on lab" — the more specific label for the chip. */
  kind: string
  /** What the attendee walks away able to do — the card headline. */
  outcome: string
  /** 1–2 sentences used as the meta description. */
  summary: string
  takeaways: string[]
  audience: string
  tags: string[]
  /** Practical prerequisites, workshop days only. */
  bring?: string
  /** Sessionize abstract, cleaned of its own "Track/Duration/Key Takeaways" scaffolding. */
  description: string[]
  speakerIds: string[]
}

interface SessionExtra {
  slug: string
  day: DayId
  kind: string
  outcome: string
  summary: string
  takeaways: string[]
  audience: string
  tags: string[]
  bring?: string
}

const SESSION_EXTRAS: Record<string, SessionExtra> = {
  '1351496': {
    slug: 'spring-modulith-architecture-in-the-ai-era',
    day: 'workshop', kind: 'Masterclass',
    outcome: 'Design Spring Boot modules that enforce their own boundaries, even when AI writes the code',
    summary: 'A hands-on masterclass on Spring Modulith: define module boundaries, enforce dependency rules and keep your architecture intact when AI-assisted tools generate code.',
    takeaways: [
      'Design explicit business modules and decide exactly what each one exposes',
      'Enforce permitted dependencies with automated tests instead of documentation',
      'Connect modules with events and transactions that hold up in production',
      'See what happens when AI-generated code breaks your boundaries, and how to catch it',
    ],
    audience: 'Java and Spring developers and architects whose codebase is growing, or who are adopting AI coding assistants.',
    tags: ['Spring Modulith', 'Architecture', 'AI-assisted development', 'Spring Boot'],
    bring: 'Hands-on session: bring your laptop.',
  },
  '1345089': {
    slug: 'zero-trust-authorization-for-ai-agents',
    day: 'workshop', kind: 'Hands-on lab',
    outcome: 'Build zero-trust authorization for AI agents, end to end',
    summary: 'Build a zero-trust security setup for AI agents: agent enrolment, identity chains, policy-as-code authorization and protected MCP tools on a Spring Boot service.',
    takeaways: [
      'Enrol agents with dynamic client registration and chain identity from human to agent with on-behalf-of tokens',
      'Express authorization as policy-as-code and run an embeddable policy decision point',
      'Attach authorization in an agent gateway and protect MCP tools',
      'Protect a Spring Boot backend with a separate PDP service over the AuthZEN APIs',
    ],
    audience: 'Backend and security-minded Java developers building or integrating AI agents.',
    tags: ['Zero Trust', 'AI agents', 'MCP security', 'Spring Boot'],
    bring: 'Bring a laptop that can run Docker. A step-by-step README is provided.',
  },
  '1305730': {
    slug: 'production-scale-rag-for-enterprise-java',
    day: 'conference', kind: 'Talk',
    outcome: 'Take your RAG prototype to production, and know when you actually need an agent',
    summary: 'Practical engineering techniques for production-scale RAG in enterprise Java applications: query expansion, re-ranking, metadata filtering and prompt compression.',
    takeaways: [
      'Keep retrieval quality, latency and cost under control across millions of documents',
      'Apply query expansion, cross-encoder re-ranking, metadata filtering and prompt compression',
      'Design RAG systems that survive failures in production',
      'Judge how far a well-engineered RAG system can go before you need an AI agent',
    ],
    audience: 'Java developers and architects who have a RAG demo working and need it to run reliably at scale.',
    tags: ['RAG', 'Enterprise Java', 'LLM engineering', 'Production'],
  },
  '1333086': {
    slug: 'from-rest-apis-to-ai-agents-in-java',
    day: 'conference', kind: 'Talk',
    outcome: 'Understand AI agents well enough to architect them into enterprise Java systems',
    summary: 'What an AI agent really is, how it differs from a REST endpoint, and a reference architecture for building AI-native enterprise systems on the JVM.',
    takeaways: [
      'What an AI agent exactly is and how it differs from a REST endpoint',
      'A reference architecture for building AI-native systems on the JVM',
      'The non-negotiable architectural considerations for running agents in real enterprise systems',
    ],
    audience: 'Enterprise Java developers and architects moving from request/response services to agentic workflows.',
    tags: ['AI agents', 'Enterprise Java', 'Architecture', 'JVM'],
  },
  '1333056': {
    slug: 'jvm-ai-assistant-with-jfr-and-mcp',
    day: 'conference', kind: 'Talk',
    outcome: 'Stop guessing why your Java app is slow, and let AI investigate with real JVM evidence',
    summary: 'Combine JDK Flight Recorder, JDK Mission Control, AI and MCP to diagnose a production-style performance incident from symptom to validated fix.',
    takeaways: [
      'Capture and read JFR recordings in JDK Mission Control to find CPU, allocation, GC and locking problems',
      'Expose JVM diagnostics as MCP tools an AI assistant can query',
      'Walk from symptom to root cause to a fix, then prove it with a second recording',
      'Keep engineers in charge: AI correlates the evidence, you validate the diagnosis',
    ],
    audience: 'Java developers and SREs who debug performance problems in production.',
    tags: ['JVM performance', 'JFR', 'MCP', 'AI'],
  },
  '1333755': {
    slug: 'sustainable-software-engineering-in-the-age-of-ai',
    day: 'conference', kind: 'Talk',
    outcome: 'Keep shipping with AI without drowning in code review or burning out',
    summary: 'A pragmatic approach to AI-assisted development: what to review, how quality gates and verifiable changes keep agents under control, and how to avoid burnout.',
    takeaways: [
      'Decide what must always be reviewed and how much to trust AI-generated code',
      'Use tests, static analysis and architecture rules as automated quality gates',
      'Keep AI agents on a leash with specification-driven development and small, verifiable changes',
      'Avoid review fatigue and cognitive overload as code volume grows',
    ],
    audience: 'Developers and tech leads using AI coding agents day to day.',
    tags: ['AI-assisted development', 'Code quality', 'Developer productivity'],
  },
}

type SpeakerExtra = Pick<Speaker, 'role' | 'tagline' | 'bio' | 'image' | 'bg' | 'topics' | 'links'>

/** Display order on /speakers/: conference speakers in running order, then the workshop's. */
const SPEAKER_ORDER = ['mala-gupta', 'siva-prasad-reddy', 'dhaval-shah', 'nikhilesh-tayal', 'harshvardhan-parmar', 'ravi-soni', 'dhaval-desai', 'vikas-rajput']

const SPEAKER_EXTRAS: Record<string, SpeakerExtra> = {
  'nikhilesh-tayal': {
    role: 'IIT Kharagpur alumnus · Google Developer Expert in AI',
    tagline: 'Founder of AI ML etc. who has spoken at 70+ tech events worldwide and was felicitated by the Chief Minister of Rajasthan for his work in education.',
    image: '/assets/speaker-nikhilesh-cutout.png', bg: '#FF384B',
    topics: ['Production RAG', 'Enterprise Java', 'Generative AI'],
    bio: [
      'Nikhilesh is an entrepreneur, teacher, and tech nerd. He is an IIT Kharagpur alumnus and a Google Developer Expert in AI, with over 18,000 followers on LinkedIn.',
      'He currently runs AI ML etc., an AI-enabled educational platform for senior IT professionals to learn AI. He has spoken at more than 70 technology events across the globe.',
      'Recently, he was felicitated by the Chief Minister of Rajasthan for his contribution to education.',
    ],
    links: [
      { type: 'email', label: 'Email', href: 'mailto:nt@aimletc.com' },
      { type: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/nikhileshtayal/' },
      { type: 'website', label: 'AI ML etc.', href: 'https://aimletc.com' },
      { type: 'website', label: 'AI ML etc. Blog', href: 'https://aimletc.com/blogs' },
    ],
  },
  'ravi-soni': {
    role: 'AWS Certified Java & Cloud-Native Architect',
    tagline: 'AWS Community Builder, known as The CodeFather, with 15+ years building Java, Spring Boot, Kafka and Kubernetes microservices.',
    image: '/assets/ravi_soni-removebg-preview.png', bg: '#050505',
    topics: ['JVM performance', 'JFR & JDK Mission Control', 'AI & MCP', 'Production diagnostics'],
    bio: [
      'Ravi Soni, known as The CodeFather, is an AWS Certified AWS Community Builder and a Java and cloud-native architect with 15+ years of professional experience in the design, development, maintenance, and migration of Java, JavaEE, Spring Boot, Kafka, and Kubernetes-based distributed and microservice applications.',
    ],
    links: [
      { type: 'email', label: 'Email', href: 'mailto:my.ravisoni@gmail.com' },
      { type: 'x', label: 'X · @rvsoni', href: 'https://x.com/rvsoni' },
      { type: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/rvsoni/' },
      { type: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/rvsoni23/' },
      { type: 'website', label: 'Blog', href: 'https://rvsoni.com' },
    ],
  },
  'siva-prasad-reddy': {
    role: 'Developer Advocate at JetBrains',
    tagline: 'Author of Beginning Spring Boot who has spoken at Spring I/O, GIDS and JavaFest, with 19 years building scalable enterprise systems.',
    image: '/assets/speaker-siva-cutout.png', bg: '#0D5CDB',
    topics: ['Modern Java', 'Cloud-native architecture', 'Developer productivity'],
    bio: [
      'Siva is a Developer Advocate at JetBrains with over 19 years of experience building scalable, distributed enterprise systems. His career spans hands-on software development, architecture, and cloud-native system design across domains such as banking and e-commerce.',
      'He has deep expertise in the Java ecosystem and modern backend development using monolithic, microservices, and event-driven architectures, with a strong emphasis on code quality and scalability.',
      'In his role as a Developer Advocate, Siva focuses on empowering developers by simplifying complex concepts, creating educational content, and bridging the gap between engineering and developer communities.',
      'Siva is the author of Beginning Spring Boot (Apress), PrimeFaces Beginners Guide (Packt), and Java Persistence with MyBatis 3. He has spoken at international conferences such as Spring I/O, GIDS and JavaFest, sharing insights on cloud-native architectures, modern Java development, and developer productivity.',
    ],
    links: [
      { type: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/ksivaprasadreddy/' },
      { type: 'website', label: 'Blog', href: 'https://sivalabs.in' },
      { type: 'website', label: 'JetBrains', href: 'https://www.jetbrains.com' },
      { type: 'youtube', label: 'YouTube', href: 'https://youtube.com/sivalabs' },
      { type: 'website', label: 'Bluesky', href: 'https://bsky.app/profile/sivalabs.in' },
      { type: 'x', label: 'X · @sivalabs', href: 'https://x.com/sivalabs' },
    ],
  },
  'dhaval-shah': {
    role: 'Principal Cloud Native Architect',
    tagline: '21+ years designing high-throughput, low-latency fintech platforms on Java 21, Spring Boot, Kafka and Kubernetes.',
    image: '/assets/speaker-dhaval-cutout.png', bg: '#02CF70',
    topics: ['Cloud-native architecture', 'Java 21 & Spring Boot', 'Reactive systems', 'Kafka & event-driven systems', 'Azure & Kubernetes'],
    bio: [
      'Dhaval designs and scales high-throughput, low-latency fintech platforms in highly regulated environments. With 21+ years of experience, he has built cloud-native systems on Azure and Kubernetes using Java 21, Spring Boot, reactive programming, Kafka, and Redis, with a strong focus on event-driven architecture. He combines hands-on engineering with technical leadership to help teams build platforms that are fast, resilient, and compliant.',
    ],
    links: [
      { type: 'email', label: 'Email', href: 'mailto:shah_d_p@yahoo.com' },
      { type: 'x', label: 'X · @dhaval201279', href: 'https://x.com/dhaval201279' },
      { type: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/dhavalshah201279/' },
      { type: 'website', label: 'Blog & company', href: 'https://dhaval-shah.com' },
    ],
  },
  'dhaval-desai': {
    role: 'Community Manager at Gluu Inc.',
    tagline: '22 years across telecom R&D, global banking and IAM, now building open-source identity and governance for AI agents.',
    image: '/assets/speaker-dhaval-desai-cutout.png', bg: '#FEC400',
    topics: ['Zero Trust', 'AI agent authorization', 'MCP security', 'Identity & access'],
    bio: [
      'Dhaval is Community Manager at Gluu Inc., where he is currently building open-source identity, access, and governance software for agentic systems.',
      'He brings 22 years of industry experience across telecom R&D, global banking, and identity and access management (IAM).',
    ],
    links: [{ type: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/dhavaltdesai/' }],
  },
  'vikas-rajput': {
    role: 'Founder at Techxplore · Co-organizer at Gujarat JUG',
    tagline: 'Java architect with 11+ years building enterprise systems who leads Java User Group Gujarat, the community behind this conference.',
    image: '/assets/vikas%20rajput.png', bg: '#0D5CDB',
    topics: ['Spring Modulith', 'Modular architecture', 'AI-assisted engineering', 'Production systems'],
    bio: [
      'Vikas Rajput is a Java Architect, technology consultant, speaker, and Founder of Techxplore IT Solutions, with over 11 years of experience designing and building enterprise-grade software systems.',
      'His expertise spans Java, Spring Boot, enterprise architecture, cloud-native development, and the design of scalable, secure, and maintainable applications. Throughout his career, he has worked on complex systems across multiple domains, helping teams modernize legacy applications, define strong architectural boundaries, and make pragmatic technology decisions for real-world production environments.',
      'In the age of AI-assisted software development, Vikas is particularly interested in the evolving role of software architecture and engineering judgment. While AI is transforming how quickly software can be written, he believes that decisions around architecture, modularity, scalability, security, performance, and long-term maintainability are becoming even more important.',
      'Beyond his professional work, Vikas leads the Java User Group Gujarat (Gujarat JUG), where he actively contributes to the developer ecosystem through technical meetups, conferences, and knowledge-sharing initiatives.',
    ],
    links: [
      { type: 'email', label: 'Email', href: 'mailto:vikas@techxplore.io' },
      { type: 'x', label: 'X · @vikasrajputin', href: 'https://x.com/vikasrajputin' },
      { type: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/vikasrajputin' },
      { type: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/vikasrajputin/' },
      { type: 'website', label: 'Blog', href: 'https://vikasrajput.in/blog' },
      { type: 'website', label: 'Techxplore', href: 'https://techxplore.io' },
    ],
  },
}

/**
 * Speakers who are not in the Sessionize embed (invited keynotes, or accepted sessions not yet
 * published there). They are merged into SPEAKERS / SESSIONS below, so `npm run
 * sync:sessionize` never touches them. When one appears in the snapshot, delete it here and
 * add SESSION_EXTRAS / SPEAKER_EXTRAS instead, or it will show up twice.
 */
const LOCAL_SPEAKERS: Speaker[] = [
  {
    id: 'local-mala-gupta', slug: 'mala-gupta', name: 'Mala Gupta',
    role: 'Java Champion · Author · Speaker',
    tagline: "Asia's first woman Oracle Java Champion, best-selling Manning author, and speaker at JavaOne, Oracle Code One, DevNexus and GIDS.",
    image: '/assets/speaker-mala-gupta-cutout.png', bg: '#7D00BC',
    topics: ['Java in the AI era', 'Modern Java', 'Java community', 'Java certification'],
    bio: [
      'Mala Gupta is the first woman in Asia to be recognised as an Oracle Java Champion, an internationally recognised Java author, speaker and technology leader, and the author of four best-selling Java books published by Manning Publications.',
      'For over two decades she has been shaping the global Java ecosystem as an author, speaker, technology leader and community builder. She has spoken at leading conferences including JavaOne, Oracle Code One, DevNexus, JBCN, JDConf, GIDS and Eclipse Day, and at Java User Groups and universities around the world.',
      'She conceived and led flagship developer programmes including JetBrains Technology Day for Java, IntelliJ IDEA Conf and the IntelliJ IDEA Livestreams, and has served on the programme committees of JavaOne and JakartaOne.',
      'Mala co-leads the Delhi Java User Group, one of the most active Java communities in India, and co-founded KaagZevar.com, a platform for nurturing creativity as an essential life skill.',
    ],
    links: [
      { type: 'website', label: 'Website', href: 'https://malagupta.github.io/' },
      { type: 'x', label: 'X · @eMalaGupta', href: 'https://twitter.com/eMalaGupta' },
    ],
    sessionIds: ['local-keynote-java-ai-era'],
  },
  {
    // Accepted, but not yet published in the Sessionize embed the sync reads. Talk + bio as
    // supplied by the organisers; links from sessionize.com/harshvardhan-parmar.
    id: 'local-harshvardhan-parmar', slug: 'harshvardhan-parmar', name: 'Harshvardhan Parmar',
    role: 'Maintainer @Microcks',
    tagline: 'Maintainer of Microcks, a CNCF Sandbox project, Google Summer of Code 2024 alumnus and LFX mentee who leads Microcks-CLI.',
    image: '/assets/speaker-harshvardhan-cutout.png', bg: '#F26B1D',
    topics: ['Spec-driven development', 'API contracts', 'Spring Boot', 'AI coding agents', 'Open source'],
    bio: [
      'Harshvardhan is an enthusiastic open-source contributor, a passionate advocate for cloud-native technologies and a maintainer of Microcks, an open-source CNCF Sandbox project.',
      'He was a Google Summer of Code (GSoC) 2024 student and an LFX mentee in 2025 under Microcks, and he leads Microcks-CLI, a CLI tool for managing Microcks.',
    ],
    links: [
      { type: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/harshvardhan-parmar/' },
      { type: 'x', label: 'X · @Harsh_4902', href: 'https://x.com/Harsh_4902' },
      { type: 'github', label: 'GitHub', href: 'https://github.com/Harsh4902' },
      { type: 'website', label: 'Sessionize', href: 'https://sessionize.com/harshvardhan-parmar' },
    ],
    sessionIds: ['local-ai-spring-boot-api-contract'],
  },
]

const LOCAL_SESSIONS: Session[] = [
  {
    id: 'local-keynote-java-ai-era', slug: 'java-in-the-ai-era',
    title: 'Java in the AI Era',
    day: 'conference', kind: 'Keynote',
    outcome: 'See how Java is growing with AI, and where your skills fit in the years ahead',
    summary: 'An opening keynote on how Java is evolving to power AI-enabled applications, the platform advances behind it, and the opportunities this opens up for Java developers.',
    takeaways: [
      'How the role of Java is expanding as AI becomes part of everyday applications',
      'The platform advances that power AI, cloud-native and high-performance workloads: Vector API, structured concurrency, Project Leyden and a continually evolving JVM',
      'A fresh way to see yourself: not just a user of AI tools, but a builder of AI-enabled products and services',
      'Where Java sits among the wider AI ecosystem, and the skills worth investing in next',
    ],
    audience: 'Every Java developer, architect and tech lead. A broad, forward-looking session to set the tone for the day.',
    tags: ['Java', 'AI', 'JVM', 'Future of Java'],
    description: [
      'Java has powered enterprise software for decades, and the AI era is opening its next chapter. This keynote explores how the language and the JVM are growing alongside AI, and why the community is so well placed to lead.',
      'Rather than diving into a single framework, we take a wide view: the expanding role of Java in AI-enabled systems, the strengths that make it a trusted base for large-scale, reliable applications, and the platform advances shaping what comes next, from the Vector API and structured concurrency to Project Leyden and ahead-of-time improvements.',
      'It is also an invitation to think bigger. Java developers can go beyond using AI coding tools to building the AI-powered applications and services themselves. We close with how Java works alongside newer AI technologies and frameworks, and the skills worth developing over the next few years.',
    ],
    speakerIds: ['local-mala-gupta'],
  },
  {
    id: 'local-ai-spring-boot-api-contract', slug: 'ai-writes-the-spring-boot-api-the-contract-keeps-it-honest',
    title: 'AI Writes the Spring Boot API, the Contract Keeps It Honest',
    day: 'conference', kind: 'Talk',
    outcome: 'Let AI build your Spring Boot APIs while the contract catches every drift from the design',
    summary: 'A spec-driven workflow that uses the API contract to guide AI-built Spring Boot services and repairs implementation drift through continuous validation.',
    takeaways: [
      'Keep a reviewed API specification as the single source of truth while an AI agent writes the code',
      'Spot drift that compiles and passes generated tests: wrong fields, enum values, status codes, validation rules and response behaviour',
      'Continuously validate the running Spring Boot service against its contract',
      'Feed contract failures back to the coding agent in an iterative repair loop until the API behaves as designed',
    ],
    audience: 'Spring Boot developers and API designers using AI coding agents who want generated services they can trust.',
    tags: ['Spec-driven development', 'API contracts', 'Spring Boot', 'AI agents'],
    description: [
      'AI coding agents can now generate Spring Boot APIs incredibly quickly. But speed creates a new problem: how do we know the generated implementation actually matches the API we designed?',
      'A service can compile, start successfully, and even pass generated tests while still drifting from its contract through incorrect fields, enum values, status codes, validation rules, or response behaviour.',
      'In this session, we’ll explore a spec-driven development workflow where the API contract remains the source of truth. We’ll start with a reviewed API specification, use it to guide an AI agent while building the Spring Boot implementation, and continuously validate the running service against the expected contract.',
      'We’ll also look at how contract failures can be fed back into the coding agent to create an iterative repair loop until the implementation behaves as expected.',
    ],
    speakerIds: ['local-harshvardhan-parmar'],
  },
]

/** Drops Sessionize's own "Track / Duration / Abstract / Key Takeaways" scaffolding. */
function cleanDescription(raw: string): string[] {
  const text = raw
    .replace(/^Track\s*-.*$/im, '')
    .replace(/^\s*Abstract\s*-\s*/im, '')
    .replace(/Key Takeaways\s*-[\s\S]*$/i, '')
    .trim()
  return text.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean)
}

const speakerById = new Map<string, Speaker>()

export const SPEAKERS: Speaker[] = SPEAKER_ORDER.map((slug) => {
  const local = LOCAL_SPEAKERS.find((s) => s.slug === slug)
  if (local) {
    speakerById.set(local.id, local)
    return local
  }
  const sz = snapshot.speakers.find((s) => s.slug === slug)
  const extra = SPEAKER_EXTRAS[slug]
  if (!sz || !extra) throw new Error(`Speaker "${slug}" is missing from the Sessionize snapshot or SPEAKER_EXTRAS`)
  const speaker: Speaker = { id: sz.id, slug, name: sz.name, sessionIds: sz.sessionIds, ...extra }
  speakerById.set(sz.id, speaker)
  return speaker
})

export const SESSIONS: Session[] = [...snapshot.sessions.map((s) => {
  const extra = SESSION_EXTRAS[s.id]
  if (!extra) throw new Error(`Session ${s.id} "${s.title}" has no entry in SESSION_EXTRAS (src/data/program.ts)`)
  return { id: s.id, title: s.title, speakerIds: s.speakerIds, description: cleanDescription(s.description), ...extra }
}), ...LOCAL_SESSIONS]

export const sessionBySlug = (slug: string) => SESSIONS.find((s) => s.slug === slug)
export const speakerBySlug = (slug: string) => SPEAKERS.find((s) => s.slug === slug)
export const speakersOf = (session: Session) => session.speakerIds.map((id) => speakerById.get(id)!).filter(Boolean)
export const sessionsOf = (speaker: Speaker) => SESSIONS.filter((s) => s.speakerIds.includes(speaker.id))
export const sessionsOnDay = (day: DayId) => SESSIONS.filter((s) => s.day === day)

export const sessionPath = (s: Session) => `/agenda/${s.slug}/`
export const speakerPath = (s: Speaker) => `/speakers/${s.slug}/`

/** Last Sessionize sync, as a YYYY-MM-DD — used for sitemap <lastmod>. */
export const PROGRAM_UPDATED = snapshot.fetchedAt.slice(0, 10)

/* ---------------------------------------------------------------------------------- */
/* Venue + timetable                                                                   */
/* ---------------------------------------------------------------------------------- */

/**
 * Where each day happens. The workshop and the conference are at DIFFERENT venues, each
 * hosted by a venue partner (logo + site shown on the agenda page). Map links are built
 * from a text query, so no coordinates are needed; `coords` is optional and only feeds the
 * embedded map / JSON-LD geo when we have verified ones (the conference campus does, and
 * matches the home-page Venue section and /tickets).
 */
export interface Venue {
  /** Host organisation / building as shown on the page. */
  name: string
  address: string
  city: string
  postalCode: string
  /** One-line form for meta descriptions: "Gujarat University, Ahmedabad". */
  short: string
  plusCode?: string
  coords?: { lat: number; lng: number }
  partner: { name: string; url: string; logo: string }
  mapUrl: string
  directionsUrl: string
  embedUrl: string
}

function makeVenue(v: Omit<Venue, 'mapUrl' | 'directionsUrl' | 'embedUrl'> & { query: string }): Venue {
  const { query, ...rest } = v
  const q = encodeURIComponent(query)
  return {
    ...rest,
    mapUrl: `https://www.google.com/maps/search/?api=1&query=${q}`,
    directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${q}`,
    embedUrl: v.coords ? `https://www.google.com/maps?q=${v.coords.lat},${v.coords.lng}&output=embed` : `https://www.google.com/maps?q=${q}&output=embed`,
  }
}

export const VENUE: Record<DayId, Venue> = {
  workshop: makeVenue({
    name: 'smartSense Consulting Solutions, GIFT One',
    address: 'Unit No. 2 & 3, 4th Floor, GIFT One, GIFT City, Gandhinagar 382355, Gujarat, India',
    city: 'Gandhinagar',
    postalCode: '382355',
    short: 'smartSense, GIFT City, Gandhinagar',
    partner: { name: 'smartSense', url: 'https://www.smartsensesolutions.com/', logo: '/assets/smartsense-logo.svg' },
    query: 'smartSense Consulting Solutions Pvt. Ltd, GIFT One, GIFT City, Gandhinagar',
  }),
  conference: makeVenue({
    name: 'Centre for Professional Courses Department, Gujarat University',
    address: 'University Area, Ahmedabad, Gujarat 380009, India',
    city: 'Ahmedabad',
    postalCode: '380009',
    short: 'Gujarat University, Ahmedabad',
    plusCode: '2GQW+F5V',
    coords: { lat: 23.038873494473062, lng: 72.54532835582141 },
    partner: { name: 'Gujarat University Centre for Professional Courses', url: 'https://gucpc.in/', logo: '/assets/cpc%20gu%20logo.png' },
    query: '2GQW+F5V, University Area, Ahmedabad, Gujarat 380009, India',
  }),
}

export type SlotKind = 'checkin' | 'break' | 'ceremony' | 'session' | 'social'

/** Organisers who host a non-session slot (welcome / closing note). Photos match the Organizers section. */
export interface Host { name: string; role: string; image: string; linkedin: string }
export const HOSTS: Record<string, Host> = {
  'dhaval-gajjar': { name: 'Dhaval Gajjar', role: 'Organizer, JUG Gujarat', image: '/assets/6966fdb6-41ad-44ae-a9ac-c106a39f43c8.webp', linkedin: 'https://www.linkedin.com/in/dhavalgajjarin/' },
  'vikas-rajput': { name: 'Vikas Rajput', role: 'Organizer, JUG Gujarat', image: '/assets/c7e0ec15-621a-484b-994f-e4f1f100b8a5.webp', linkedin: 'https://linkedin.com/in/vikasrajputin' },
  'bharat-ranpariya': { name: 'Bharat Ranpariya', role: 'Organizer, JUG Gujarat', image: '/assets/13a9f265-6945-4618-bbdc-b6a3b040e3c8.webp', linkedin: 'https://www.linkedin.com/in/bharat-ranpariya/' },
}

export interface ScheduleItem {
  /** 24h "HH:MM", Asia/Kolkata. */
  start: string
  end: string
  title: string
  kind: SlotKind
  /** Links the slot to a Sessionize session. */
  sessionId?: string
  /** Slot exists but the speaker/topic isn't confirmed yet. */
  tbc?: boolean
  note?: string
  /** Keys into HOSTS for slots led by organisers (welcome / closing note). */
  hosts?: string[]
}

/**
 * The running order, as set by the organisers. Conference: 8:00 AM to 6:00 PM, back-to-back
 * 30-minute talks with no changeover gap; one 60-minute slot (2:00 PM) is still to be revealed.
 */
export const SCHEDULE: Record<DayId, ScheduleItem[]> = {
  workshop: [
    { start: '10:00', end: '10:15', title: 'Check-in', kind: 'checkin' },
    { start: '10:15', end: '10:25', title: 'Opening note', kind: 'ceremony' },
    { start: '10:25', end: '11:55', title: 'Workshop #1', kind: 'session', sessionId: '1345089' },
    { start: '11:55', end: '12:55', title: 'Lunch & networking', kind: 'break' },
    { start: '12:55', end: '13:20', title: 'Engagement activity', kind: 'social' },
    { start: '13:20', end: '14:50', title: 'Workshop #2', kind: 'session', sessionId: '1351496' },
    { start: '14:50', end: '15:00', title: 'Closing note', kind: 'ceremony' },
  ],
  conference: [
    { start: '08:00', end: '09:30', title: 'Registration, Networking & Breakfast', kind: 'checkin' },
    { start: '09:30', end: '09:45', title: 'Pre-engagement Activities', kind: 'social' },
    { start: '09:45', end: '10:00', title: 'Welcome Note', kind: 'ceremony', hosts: ['dhaval-gajjar', 'vikas-rajput'] },
    { start: '10:00', end: '10:30', title: 'Keynote session', kind: 'session', sessionId: 'local-keynote-java-ai-era' },
    { start: '10:30', end: '11:00', title: 'Talk', kind: 'session', sessionId: '1333755' },
    { start: '11:00', end: '11:30', title: 'Talk', kind: 'session', sessionId: '1333086' },
    { start: '11:30', end: '12:00', title: 'Sponsors Session', kind: 'social' },
    { start: '12:00', end: '13:30', title: 'Lunch Break & Networking', kind: 'break' },
    { start: '13:30', end: '14:00', title: 'Live Jamming Session', kind: 'social' },
    { start: '14:00', end: '15:00', title: 'Session to be revealed soon', kind: 'session', tbc: true, note: 'Speaker and topic will be revealed soon.' },
    { start: '15:00', end: '15:30', title: 'Talk', kind: 'session', sessionId: '1305730' },
    { start: '15:30', end: '16:00', title: 'Talk', kind: 'session', sessionId: 'local-ai-spring-boot-api-contract' },
    { start: '16:00', end: '16:30', title: 'Talk', kind: 'session', sessionId: '1333056' },
    { start: '16:30', end: '16:45', title: 'Engagement Activities', kind: 'social' },
    { start: '16:45', end: '17:00', title: 'Closing Note', kind: 'ceremony', hosts: ['bharat-ranpariya'] },
    { start: '17:00', end: '18:00', title: 'Networking, Goodies & High Tea', kind: 'social' },
  ],
}

/** "14:20" -> "2:20 PM". */
export function fmtTime(hhmm: string): string {
  const [h, m] = hhmm.split(':').map(Number)
  return `${h % 12 || 12}:${String(m).padStart(2, '0')} ${h < 12 ? 'AM' : 'PM'}`
}
export const fmtRange = (i: Pick<ScheduleItem, 'start' | 'end'>) => `${fmtTime(i.start)} – ${fmtTime(i.end)}`
/** Minutes between two "HH:MM" strings. */
export const minutesBetween = (a: string, b: string) => {
  const m = (t: string) => { const [h, mm] = t.split(':').map(Number); return h * 60 + mm }
  return m(b) - m(a)
}
/** "2026-10-24" + "14:20" -> "2026-10-24T14:20:00+05:30" (event time zone). */
export const isoAt = (day: DayId, hhmm: string) => `${DAYS[day].iso}T${hhmm}:00+05:30`

/** When each day officially opens: the conference doors open at 8:00 AM (registration and breakfast) and the day ends at 6:00 PM. */
const PROGRAMME_START: Record<DayId, string> = { workshop: '10:00', conference: '08:00' }
export const programmeStart = (day: DayId) => PROGRAMME_START[day]
export const dayEnd = (day: DayId) => SCHEDULE[day][SCHEDULE[day].length - 1].end

export const slotOf = (session: Session) => SCHEDULE[session.day].find((i) => i.sessionId === session.id)

/* ---------------------------------------------------------------------------------- */
/* Speaker line-up (home "Meet the speakers" + /speakers/)                              */
/* ---------------------------------------------------------------------------------- */

export type LineupEntry =
  | { kind: 'speaker'; key: string; day: DayId; speaker: Speaker; session: Session }
  | { kind: 'tba'; key: string; day: DayId; slot: string }

/**
 * Who is on the line-up, in programme order: conference speakers first, then the workshop's,
 * and every slot whose speaker isn't confirmed yet LAST as a "revealed soon" placeholder.
 * Built from SCHEDULE, so confirming a slot (adding its session) moves it up into the
 * confirmed group automatically.
 */
export const LINEUP: LineupEntry[] = (() => {
  const confirmed: LineupEntry[] = []
  const pending: LineupEntry[] = []
  for (const day of ['conference', 'workshop'] as DayId[]) {
    for (const slot of SCHEDULE[day].filter((i) => i.kind === 'session')) {
      const session = slot.sessionId ? SESSIONS.find((s) => s.id === slot.sessionId) : undefined
      if (session) {
        for (const speaker of speakersOf(session)) confirmed.push({ kind: 'speaker', key: `${day}-${speaker.id}`, day, speaker, session })
      } else {
        pending.push({ kind: 'tba', key: `${day}-${slot.start}`, day, slot: slot.title === 'Keynote session' ? 'Keynote speaker' : slot.title })
      }
    }
  }
  return [...confirmed, ...pending]
})()
