import type { Social } from '../lib/icons'

/**
 * Sponsor profiles for /sponsors/. Pure data (no React) so data/routes.ts can reuse it for
 * the page metadata and JSON-LD. Copy is summarised from each sponsor's own website. Contact is limited to
 * the website, public email / contact pages and social profiles: no phone numbers or addresses. Keep the tiers in step with the logo wall
 * in components/SponsorsWall.tsx.
 */

export interface Sponsor {
  slug: string
  name: string
  /** Tier label, matching the logo wall. */
  tier: string
  /** Tier accent, matching the logo wall. */
  accent: string
  logo: string
  /** A person's photo rather than a company logo: shown cropped to fill its tile. */
  person?: boolean
  /** Optical size tweak for logos with a lot of padding baked in (same idea as SponsorsWall). */
  logoScale?: number
  website: string
  /** One-line description for cards and meta tags. */
  tagline: string
  about: string[]
  /** Heading over the offerings grid; defaults to "Products & services". */
  offeringsTitle?: string
  /** Products / services: name + one-line description. */
  offerings: { name: string; text: string }[]
  /** Ways to connect: website and public email / contact pages only (no phone or address, by request). */
  contact: { label: string; value: string; href: string }[]
  /** Public social profiles. */
  socials: Social[]
}

export const SPONSORS: Sponsor[] = [
  {
    slug: 'jetbrains',
    name: 'JetBrains',
    tier: 'Platinum Sponsor', accent: '#8E97B8',
    logo: '/assets/jetbrains-logo.svg',
    website: 'https://www.jetbrains.com/',
    tagline: 'The company behind IntelliJ IDEA and the tools millions of developers build with.',
    about: [
      'JetBrains builds professional tools for software developers and teams. Its flagship IntelliJ IDEA is the IDE many Java and Kotlin developers work in every day, with first-class Spring support, a powerful debugger and a rich set of built-in tools.',
      'Beyond IDEs, JetBrains develops the Kotlin language, AI assistance inside its tools, and platforms that help teams plan, build and ship software.',
    ],
    offerings: [
      { name: 'IntelliJ IDEA', text: 'The Java and Kotlin IDE with deep Spring support, debugging and built-in developer tools.' },
      { name: 'JetBrains AI and Junie', text: 'AI assistance and an AI coding agent that work inside JetBrains IDEs.' },
      { name: 'Kotlin', text: 'The modern, concise JVM language, designed and maintained by JetBrains.' },
      { name: 'Toolbox App and Plugin Marketplace', text: 'Manage your JetBrains tools in one place and extend them with community plugins.' },
      { name: 'IDEs for every stack', text: 'Tools for .NET, remote development, DevOps and data work, alongside the Java toolchain.' },
      { name: 'JetBrains Academy', text: 'Learning programmes and licences for students, teachers and teams.' },
    ],
    contact: [
      { label: 'Talk to sales', value: 'jetbrains.com/support/sales', href: 'https://www.jetbrains.com/support/sales/' },
      { label: 'Technical support', value: 'jetbrains.com/support', href: 'https://www.jetbrains.com/support/' },
    ],
    socials: [
      { type: 'website', label: 'Blog', href: 'https://blog.jetbrains.com/' },
      { type: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/company/jetbrains' },
      { type: 'x', label: 'X · @jetbrains', href: 'https://twitter.com/jetbrains' },
      { type: 'youtube', label: 'YouTube', href: 'https://www.youtube.com/user/JetBrainsTV' },
      { type: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/jetbrains/' },
    ],
  },
  {
    slug: 'xynnity',
    name: 'Xynnity',
    tier: 'Gold Sponsor', accent: '#FEC400',
    logo: '/assets/xynnity.png',
    website: 'https://www.xynnity.com/',
    tagline: 'Ahmedabad software company building custom products and dedicated remote engineering teams.',
    about: [
      'Xynnity is an offshore software development company headquartered in Ahmedabad. It builds custom software and provides dedicated engineering teams for startups and growing companies in markets such as the US and UK, acting as an extension of the client\'s own team and taking care of recruiting, infrastructure and HR.',
      'Its engineers work across Java, React, cloud and AI, from the first prototype through to production and long-term maintenance.',
    ],
    offerings: [
      { name: 'Web development', text: 'Scalable web applications built with React, Java and Spring Boot.' },
      { name: 'Dedicated teams and staff augmentation', text: 'Full-time engineers focused on your product, or specialists added to your existing team.' },
      { name: 'Cloud and full-stack development', text: 'End-to-end delivery across front end, back end and cloud infrastructure.' },
      { name: 'AI integrations', text: 'Adding AI capabilities to existing and new software.' },
      { name: 'Mobile development', text: 'Native and cross-platform iOS and Android apps.' },
      { name: 'QA, UI/UX and IT consultancy', text: 'Manual and automated testing, user-centred design, and advice on modernising legacy systems.' },
    ],
    contact: [
      { label: 'Email', value: 'connect@xynnity.com', href: 'mailto:connect@xynnity.com' },
      { label: 'Contact form', value: 'xynnity.com/contacts', href: 'https://www.xynnity.com/contacts/' },
    ],
    socials: [
      { type: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/company/xynnity/' },
      { type: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/xynnitytechnologies' },
    ],
  },
  {
    slug: 'gujarat-university-cpc',
    offeringsTitle: 'Offerings',
    name: 'Gujarat University Centre for Professional Courses',
    tier: 'Venue Sponsor', accent: '#0D5CDB',
    logo: '/assets/cpc%20gu%20logo.png',
    website: 'https://gucpc.in/',
    tagline: 'Our conference host: a modern professional-courses campus inside Gujarat University.',
    about: [
      'The Centre for Professional Courses (CPC) was established in 2023 within Gujarat University, the state\'s largest university, founded in 1949. It offers contemporary academic programmes designed around the needs of today\'s industries, on a campus that encourages creativity and learning.',
      'CPC hosts the Community Day for Java conference on 24 October 2026 at its campus in Navrangpura, Ahmedabad.',
    ],
    offerings: [
      { name: 'School of Design and Department of Animation', text: 'Entrance-exam based programmes in design and animation.' },
      { name: 'Department of IT and IMS', text: 'Merit-based programmes in information technology and information management systems.' },
      { name: 'Department of Mobile Application and Technologies', text: 'Programmes for building mobile apps and related technology.' },
      { name: 'Department of Aviation, Hospitality and Travel Management', text: 'Merit-based programmes for the global travel and hospitality industry.' },
      { name: 'Department of Management', text: 'Programmes in management, international trade and finance.' },
      { name: 'Internships and placement', text: 'Placement support and student activities alongside the academic programmes.' },
    ],
    contact: [
      { label: 'Email', value: 'info.cpc@gujaratuniversity.ac.in', href: 'mailto:info.cpc@gujaratuniversity.ac.in' },
    ],
    socials: [
      { type: 'website', label: 'Gujarat University', href: 'https://www.gujaratuniversity.ac.in' },
    ],
  },
  {
    slug: 'jobrunr',
    name: 'JobRunr',
    tier: 'Community Patron', accent: '#FF384B',
    logo: '/assets/jobrunner%20community%20contributor.jfif', logoScale: 1.4,
    website: 'https://www.jobrunr.io/en/',
    tagline: 'Durable background jobs for Java, open source and free for commercial use.',
    about: [
      'JobRunr is a Java library for reliable background jobs. It stores jobs in the database you already use, so work survives restarts and deployments, and it includes a dashboard to watch everything run.',
      'The core is open source and free for commercial use, with paid editions for teams that need more scale and support, and growing support for background AI workloads on the JVM.',
    ],
    offerings: [
      { name: 'JobRunr OSS', text: 'The free edition: enqueue and schedule jobs, recurring CRON jobs, automatic retries and a built-in dashboard.' },
      { name: 'JobRunr Pro', text: 'Adds priority queues, batches, workflows, an enhanced dashboard and a transaction plugin.' },
      { name: 'JobRunr Business and Enterprise', text: 'Plans for production clusters with priority support, multi-cluster dashboards and custom procurement.' },
      { name: 'JobRunr for AI', text: 'Run Java AI workloads such as embedding generation and RAG syncing as reliable background jobs.' },
      { name: 'Community support', text: 'Help from the community through GitHub Discussions and Stack Overflow.' },
    ],
    contact: [
      { label: 'Contact', value: 'jobrunr.io/en/contact', href: 'https://www.jobrunr.io/en/contact/' },
      { label: 'Community support', value: 'GitHub Discussions', href: 'https://github.com/jobrunr/jobrunr/discussions' },
    ],
    socials: [
      { type: 'github', label: 'GitHub', href: 'https://github.com/jobrunr/jobrunr' },
      { type: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/company/jobrunr/' },
      { type: 'youtube', label: 'YouTube', href: 'https://www.youtube.com/@JobRunr' },
    ],
  },
  {
    slug: 'techxplore',
    name: 'Techxplore IT Solutions',
    tier: 'Community Patron', accent: '#FF384B',
    logo: '/assets/techxplore%20logo.png', logoScale: 0.78,
    website: 'https://www.techxplore.io/',
    tagline: 'Ahmedabad enterprise software and AI development company.',
    about: [
      'Techxplore IT Solutions is an Ahmedabad-based company specialising in enterprise software, artificial intelligence, cloud solutions and digital innovation. It helps startups and enterprises build scalable software and AI-driven products through informed strategy, design and execution.',
      'Techxplore was founded by a co-organizer of Java User Group Gujarat and is a Community Patron of Community Day for Java.',
    ],
    offerings: [
      { name: 'Enterprise applications', text: 'Scalable, enterprise-grade software built on Java, Spring Boot and modern front-end frameworks.' },
      { name: 'AI and machine learning', text: 'AI-powered systems and enterprise AI solutions for real business workflows.' },
      { name: 'Cloud and DevOps', text: 'Cloud-native architecture, deployment and automation.' },
      { name: 'Android and iOS development', text: 'Mobile apps for both platforms.' },
      { name: 'UI/UX, QA and testing', text: 'Product design and quality assurance across the delivery lifecycle.' },
      { name: 'Custom software development', text: 'Tailor-made products, from first idea to production.' },
    ],
    contact: [
      { label: 'Email', value: 'connect@techxplore.io', href: 'mailto:connect@techxplore.io' },
    ],
    socials: [
      { type: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/company/techxploreio' },
    ],
  },
  {
    slug: 'dhaval-desai',
    name: 'Dhaval Desai',
    tier: 'Community Supporter', accent: '#02CF70',
    logo: '/assets/dhaval%20desai.jpg', person: true,
    website: 'https://gluu.org/',
    tagline: 'Product Manager and maintainer at Gluu, backing the Java community with his time and effort.',
    about: [
      'Dhaval Desai supports the Java community with his time and effort. Unlike a company sponsorship, this is a personal contribution to making the event happen.',
      'He works at Gluu, an enterprise identity and access management company built on open source, where he is a product manager and maintainer. Gluu helps organizations govern access with declarative policies, auditable decision logs and open standards such as OAuth, OpenID, FIDO and SCIM.',
    ],
    offerings: [
      { name: 'Gluu Flex', text: 'Enterprise identity infrastructure that issues OAuth-based identities for people and workloads and streams decision logs to security tooling.' },
      { name: 'Cedarling', text: 'An open source, embeddable policy decision point written in Rust that makes authorization decisions from declarative policies and logs each one.' },
      { name: 'Agama Lab', text: 'A developer portal for writing policies and building low-code authentication workflows.' },
      { name: 'Casa', text: 'A self-service portal where people manage their own multi-factor credentials, such as passkeys and one-time passwords.' },
      { name: 'Janssen Project', text: 'The upstream open source project, hosted at the Linux Foundation, behind the core Gluu infrastructure.' },
    ],
    contact: [
      { label: 'Gluu', value: 'gluu.org', href: 'https://gluu.org/' },
    ],
    socials: [
      { type: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/dhavaltdesai/' },
    ],
  },
]

export const sponsorPath = (s: Sponsor) => `/sponsors/${s.slug}/`
export const sponsorBySlug = (slug: string) => SPONSORS.find((s) => s.slug === slug)
