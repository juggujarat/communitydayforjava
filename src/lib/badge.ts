/**
 * Canvas renderer + export helpers for the attendee badge page (/badge/).
 *
 * The badge is drawn with plain Canvas 2D rather than an HTML-to-image library so the
 * page stays dependency-free (the site has no runtime deps beyond React) and so the
 * exported PNG is pixel-identical everywhere. Everything is laid out in badge
 * coordinates (1080x1296, matching the supplied badge artwork); the
 * <canvas> is displayed scaled down via CSS.
 */
export const BADGE_W = 1080
export const BADGE_H = 1296

/** Circular photo frame, in badge coordinates. The page overlays a drag target on it. */
export const PHOTO = { cx: 540, cy: 538, r: 148 }

/**
 * Masthead: the Community Day for Java wordmark sits in the top-left corner with the
 * edition year stacked under it. Keeping the pair off the centre line leaves the
 * main column to the role title and portrait.
 */
const LOGO = { x: 76, y: 42, w: 310, h: 96 }

/**
 * JUG Gujarat's organizer lockup balances the masthead from the top-right corner.
 */
const JUG_LOGO = { x: 790, y: 28, w: 283, h: 142 }

/**
 * The Java sticker sits to the right of the portrait as in the reference badge.
 */
const STICKER = { size: 220, x: 795, y: 390 }

/**
 * The role introduction uses a handwritten face like the supplied reference.
 */
const CHIP_LEAD_FONT = '400 78px Licorice, cursive'

/**
 * Event details kept in sync with the CFP page.
 */
export const BADGE_EVENT_PLACE = 'Ahmedabad, India'
export const BADGE_EVENT_YEAR = '2026'
export const BADGE_TAGLINE = "Gujarat's Biggest Java Community Conference"

/**
 * Slogan typography: the role/company face a step *up* from it — after the name it is
 * the loudest line on the badge. It is drawn in the brand yellow, matching the year in
 * the divider rule below it rather than the role colour, so the pride line reads the
 * same on every badge. Sizes are tried largest first so a long line shrinks rather
 * than losing its tail to an ellipsis.
 */

export interface BadgeRole {
  id: string
  /** Shown on the role picker in the form. */
  label: string
  /**
   * The badge chip, split so it can be set at two sizes (both rendered uppercase):
   * `chipLead` is the connective run ("I'm on the"), `chipMain` the word that says
   * who the wearer is ("crew"). The split is data rather than a string search
   * because the lead-in is a different length for every role.
   */
  chipLead: string
  chipMain: string
  /** Opening clause of the social share text. */
  share: string
  /** Picker chip colour on the light page. */
  accent: string
  /**
   * Chip/glow colour on the navy badge. The brand blue and purple are barely
   * brighter than the background there, so every role carries a lifted variant
   * that reads as luminous the way the yellow does.
   */
  ink: string
}

/** Accents come from the extended brand PALETTE in lib/decor. */
export const BADGE_ROLES: BadgeRole[] = [
  { id: 'attendee', label: 'Attendee', chipLead: "I'm", chipMain: 'attending', share: "I'm attending", accent: '#FEC400', ink: '#FEC400' },
  { id: 'speaker', label: 'Speaker', chipLead: "I'm a", chipMain: 'speaker', share: "I'm speaking at", accent: '#FF384B', ink: '#FF7183' },
  { id: 'enthusiast', label: 'Java Enthusiast', chipLead: "I'm a", chipMain: 'Java enthusiast', share: "I'm counting down to", accent: '#02CF70', ink: '#2BE58E' },
  { id: 'sponsor', label: 'Sponsor', chipLead: "I'm a", chipMain: 'sponsor', share: "We're sponsoring", accent: '#00B8B0', ink: '#4FE8E0' },
  { id: 'organizer', label: 'Organizer', chipLead: "I'm an", chipMain: 'organizer', share: "I'm helping organise", accent: '#7D00BC', ink: '#C88BFF' },
  { id: 'crew', label: 'Crew', chipLead: "I'm on the", chipMain: 'crew', share: "I'm on the crew at", accent: '#0D5CDB', ink: '#6FB6FF' },
]

/** Roles shown on the public /badge/ picker. */
export const PUBLIC_BADGE_ROLE_IDS = ['attendee', 'enthusiast']

/**
 * Roles shown on the unlisted team badge page — the complement of
 * PUBLIC_BADGE_ROLE_IDS. Attendee/Java Enthusiast stay off it; it's only for
 * Speaker/Sponsor/Organizer/Crew.
 */
export const PRIVATE_BADGE_ROLE_IDS = BADGE_ROLES.map((r) => r.id).filter(
  (id) => !PUBLIC_BADGE_ROLE_IDS.includes(id),
)

/**
 * The slogan is a fixed set rather than a free-text field: the badge goes out under
 * the event's name, so every line on it is one we wrote. The options are keyed by role
 * — same as CAPTION_OPTIONS — so "How are you joining?" also drives which pride lines
 * are on offer, with the first entry stamped by default.
 */
export const SLOGAN_OPTIONS: Record<string, string[]> = {
  attendee: [
    'Proud to be part of the Java community',
    'Excited to be at Community Day for Java',
    'See you in Ahmedabad!',
    'Java runs in my veins',
    'Counting down to Community Day for Java',
  ],
  speaker: [
    'Proud to be a Java speaker',
    'Sharing Java on stage today',
    'See you in Ahmedabad!',
    'Proud to take the stage',
    'Talking Java at CDJ 2026',
  ],
  enthusiast: [
    'Java runs in my veins',
    'Proud to be a Java developer',
    'Proud to be part of the Java community',
    'Coffee, code, and Java',
    'Always learning, always Java',
  ],
  sponsor: [
    'Proud to sponsor the Java community',
    'Backing Java developers in Gujarat',
    'See you in Ahmedabad!',
    'Investing in the Java community',
    'Proud partner of CDJ 2026',
  ],
  organizer: [
    'Proud to help organise this',
    'Building Community Day for Java',
    'See you in Ahmedabad!',
    'Making it happen, behind the scenes',
    'Proud to build this with the team',
  ],
  crew: [
    'Proud to be a volunteer',
    'Proud to be on the crew',
    'Proud to be a JUG Gujarat member',
    'Here to make the day run smooth',
    'See you in Ahmedabad!',
  ],
}

/**
 * Social captions, three per role — unlike the slogan these are never stamped on the
 * badge image, only used as the post text, so they can be longer and role-specific
 * instead of one line that has to read well for every role.
 */
export const CAPTION_OPTIONS: Record<string, string[]> = {
  attendee: [
    "Excited to be attending Community Day for Java 2026 — Gujarat's biggest Java community conference! Who else is coming?",
    "Just got my badge for Community Day for Java 2026. Can't wait to connect with the Java community in Ahmedabad.",
    "Counting down to Community Day for Java 2026 — grab your own badge and let's meet up there!",
  ],
  speaker: [
    "Honoured to be speaking at Community Day for Java 2026 — Gujarat's biggest Java community conference!",
    "I'll be taking the stage at Community Day for Java 2026. Come say hi and catch my session!",
    "Sharing what I know about Java at Community Day for Java 2026 this year — see you there!",
  ],
  enthusiast: [
    "Java runs in my veins — counting down to Community Day for Java 2026!",
    "Proud Java enthusiast, hyped for Community Day for Java 2026. Who else is going?",
    "Been a Java fan for years — Community Day for Java 2026 is the meetup I've been waiting for.",
  ],
  sponsor: [
    "Proud to sponsor Community Day for Java 2026 — Gujarat's biggest Java community conference!",
    "We're backing the Java community — sponsoring Community Day for Java 2026 this year.",
    "Supporting developers where they grow. See us as a sponsor at Community Day for Java 2026.",
  ],
  organizer: [
    "Behind the scenes, making Community Day for Java 2026 happen. Can't wait to see you all there!",
    "Helping organise Community Day for Java 2026 — Gujarat's biggest Java community conference. Let's build something great together.",
    "Putting together Community Day for Java 2026 with an amazing team. See you at the event!",
  ],
  crew: [
    "On the crew for Community Day for Java 2026 — here to make the day run smooth!",
    "Proud to be part of the crew at Community Day for Java 2026. Come find us on the day!",
    "Volunteering with the crew at Community Day for Java 2026 — Gujarat's biggest Java community conference.",
  ],
}

/** The line actually posted: the wearer's own pick, else the role's first caption. */
export function badgeCaption(role: BadgeRole, caption: string) {
  return caption.trim() || CAPTION_OPTIONS[role.id]?.[0] || role.share
}

export interface BadgeState {
  name: string
  /** Free-text role/job title, e.g. "Java Developer". Required, like the company. */
  title: string
  company: string
  /** One of SLOGAN_OPTIONS[role.id]. Empty means that role's first line is stamped. */
  slogan: string
  role: BadgeRole
  photo: HTMLImageElement | null
  /** 1 = photo just covers the circle; up to 3x for a tighter crop. */
  zoom: number
  /** Pan, in badge coordinates, relative to a centred photo. */
  offset: { x: number; y: number }
}

/** The line actually drawn — never empty, so the badge always carries a slogan. */
export function badgeSlogan(state: Pick<BadgeState, 'slogan' | 'role'>) {
  return state.slogan.trim() || SLOGAN_OPTIONS[state.role.id]?.[0] || SLOGAN_OPTIONS.attendee[0]
}

export interface BadgeArt {
  background: HTMLImageElement
  logo: HTMLImageElement
  organizer: HTMLImageElement
  roleSticker: HTMLImageElement
  sticker: HTMLImageElement
  qr: HTMLImageElement
  date: HTMLImageElement
  venuePartner: HTMLImageElement
  platinumSponsor: HTMLImageElement
  bottomBar: HTMLImageElement
}

export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.decoding = 'async'
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error(`Could not load ${src}`))
    img.src = src
  })
}

/** Load supplied same-origin badge artwork for the preview and exported PNG. */
export async function loadBadgeArt(): Promise<BadgeArt> {
  const root = '/assets/badge/'
  const [background, logo, organizer, roleSticker, sticker, qr, date, venuePartner, platinumSponsor, bottomBar] = await Promise.all([
    loadImage(`${root}bg-img.png`),
    loadImage(`${root}cd4j-img.png`),
    loadImage(`${root}logo.png`),
    loadImage(`${root}crew sticker.png`),
    loadImage(`${root}java sticker.png`),
    loadImage(`${root}qr.png`),
    loadImage(`${root}date.png`),
    loadImage(`${root}vp.png`),
    loadImage(`${root}ps.png`),
    loadImage(`${root}bottom bar.png`),
  ])
  return { background, logo, organizer, roleSticker, sticker, qr, date, venuePartner, platinumSponsor, bottomBar }
}

/**
 * Canvas text silently falls back to a system font if the webfont has not arrived yet,
 * so wait for the faces the badge actually uses before the first paint.
 */
const FONT_SPECS = [
  '700 126px Oswald',
  '700 92px Oswald',
  '400 78px Licorice',
  '700 48px Oswald',
  '700 30px Inter',
  '700 42px Inter',
  '700 38px Roboto',
  '700 32px Roboto',
  '600 22px Roboto',
  '500 36px Roboto',
  '500 52px Roboto',
  '500 48px Roboto',
  '500 44px Roboto',
  '500 40px Roboto',
  '700 24px Roboto',
]

export async function loadBadgeFonts(): Promise<void> {
  if (!document.fonts) return
  try {
    await Promise.all(FONT_SPECS.map((spec) => document.fonts.load(spec)))
    await document.fonts.ready
  } catch {
    /* fall back to whatever the browser resolves — the badge still renders */
  }
}

// ---- drawing helpers ----

type Ctx = CanvasRenderingContext2D

/** Truncate with an ellipsis so a very long single word never bleeds off the badge. */
function clipText(ctx: Ctx, text: string, maxWidth: number) {
  if (ctx.measureText(text).width <= maxWidth) return text
  let out = text
  while (out.length > 1 && ctx.measureText(out + '…').width > maxWidth) out = out.slice(0, -1)
  return out + '…'
}

// ---- photo geometry ----

export interface PhotoFrame {
  dx: number
  dy: number
  dw: number
  dh: number
  maxX: number
  maxY: number
}

/**
 * Where the uploaded photo lands inside the circle. The pan is clamped so the photo
 * always covers the frame — no navy gaps at the edges, whatever the zoom.
 */
export function photoFrame(photo: HTMLImageElement, zoom: number, offset: { x: number; y: number }): PhotoFrame {
  const d = PHOTO.r * 2
  const cover = Math.max(d / photo.naturalWidth, d / photo.naturalHeight)
  const dw = photo.naturalWidth * cover * zoom
  const dh = photo.naturalHeight * cover * zoom
  const maxX = Math.max(0, (dw - d) / 2)
  const maxY = Math.max(0, (dh - d) / 2)
  const x = Math.min(maxX, Math.max(-maxX, offset.x))
  const y = Math.min(maxY, Math.max(-maxY, offset.y))
  return { dx: PHOTO.cx - dw / 2 + x, dy: PHOTO.cy - dh / 2 + y, dw, dh, maxX, maxY }
}

export function clampOffset(photo: HTMLImageElement, zoom: number, offset: { x: number; y: number }) {
  const { maxX, maxY } = photoFrame(photo, zoom, offset)
  return {
    x: Math.min(maxX, Math.max(-maxX, offset.x)),
    y: Math.min(maxY, Math.max(-maxY, offset.y)),
  }
}

// ---- the badge itself ----

/** Lucide `cloud-upload`, on a 24x24 grid. */
const CLOUD_UPLOAD = [
  'M12 13v8',
  'M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242',
  'm8 17 4-4 4 4',
]

/**
 * One icon per "How are you joining?" pick, Lucide-style on a 24x24 grid — drawn huge
 * and faint behind the portrait so the badge carries a graphic that names the role,
 * not just a colour. Ticket / mic / coffee cup / medal / calendar / wrench.
 */
const ROLE_GRAPHIC: Record<string, string[]> = {
  attendee: [
    'M7 4h10a2 2 0 0 1 2 2v2a3 3 0 0 0 0 6v2a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-2a3 3 0 0 0 0-6V6a2 2 0 0 1 2-2Z',
    'M13 8v.01',
    'M13 12v.01',
    'M13 16v.01',
  ],
  speaker: [
    'M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z',
    'M19 10v2a7 7 0 0 1-14 0v-2',
    'M12 19v3',
  ],
  enthusiast: [
    'M17 8h1a4 4 0 1 1 0 8h-1',
    'M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z',
    'M6 2v2',
    'M10 2v2',
    'M14 2v2',
  ],
  sponsor: [
    'M8.21 13.89 7 23l5-3 5 3-1.21-9.12',
    'M12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z',
  ],
  organizer: [
    'M8 2v4',
    'M16 2v4',
    'M3 10h18',
    'M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z',
  ],
  crew: [
    'M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94Z',
  ],
}

/**
 * The selected "How are you joining?" mark sits beside the portrait as a bold outline,
 * like the ticket motif in the design reference. Drawing it before the portrait keeps
 * the overlap clean while making the selected role recognizable at badge size.
 */
function drawRoleGraphic(ctx: Ctx, role: BadgeRole) {
  const paths = ROLE_GRAPHIC[role.id]
  if (!paths) return
  ctx.save()
  const size = 240
  const cx = 205
  const cy = 535
  ctx.translate(cx - size / 2, cy - size / 2)
  ctx.scale(size / 24, size / 24)
  ctx.globalAlpha = 0.18
  ctx.strokeStyle = role.ink
  ctx.lineWidth = 0.8
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  paths.forEach((d) => ctx.stroke(new Path2D(d)))
  ctx.restore()
}

/**
 * Empty state: a white drop-zone disc with the cloud mark and the instruction, so
 * the circle reads as "put a photo here" at a glance. The HTML overlay on the
 * preview only adds the cursor, hover ring and click target.
 */
function drawPhotoPlaceholder(ctx: Ctx) {
  ctx.save()
  const size = 110
  ctx.translate(PHOTO.cx - size / 2, PHOTO.cy - size / 2 - 38)
  ctx.scale(size / 24, size / 24)
  ctx.strokeStyle = '#0D5CDB'
  ctx.lineWidth = 1.7
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  CLOUD_UPLOAD.forEach((d) => ctx.stroke(new Path2D(d)))
  ctx.restore()

  ctx.save()
  ctx.font = '700 24px Roboto, sans-serif'
  ctx.fillStyle = '#131C56'
  ctx.fillText('Upload Your Photo Here', PHOTO.cx, PHOTO.cy + 82)
  ctx.restore()
}

export function drawBadge(ctx: Ctx, state: BadgeState, art: BadgeArt | null) {
  const { role } = state
  ctx.save()
  ctx.clearRect(0, 0, BADGE_W, BADGE_H)
  ctx.textBaseline = 'alphabetic'
  ctx.textAlign = 'center'
  ctx.fillStyle = '#11194f'
  ctx.fillRect(0, 0, BADGE_W, BADGE_H)
  if (art) ctx.drawImage(art.background, 0, 0, BADGE_W, BADGE_H)

  if (art) ctx.drawImage(art.bottomBar, 0, BADGE_H - art.bottomBar.naturalHeight, BADGE_W, art.bottomBar.naturalHeight)

  if (art) {
    ctx.drawImage(art.logo, LOGO.x, LOGO.y, LOGO.w, LOGO.h)
    ctx.drawImage(art.organizer, JUG_LOGO.x, JUG_LOGO.y, JUG_LOGO.w, JUG_LOGO.h)
    ctx.drawImage(art.sticker, STICKER.x, STICKER.y, STICKER.size, STICKER.size * art.sticker.naturalHeight / art.sticker.naturalWidth)
    ctx.drawImage(art.qr, 64, 1018, 254, 272)
    ctx.drawImage(art.date, 510, 1034, 527, 74)
    ctx.drawImage(art.venuePartner, 510, 1120, 255, 161)
    ctx.drawImage(art.platinumSponsor, 780, 1120, 255, 161)
  }

  // Keep the reference's role-specific handwritten lead-in and tall condensed title.
  const lead = role.id === 'crew' ? "I'm on" : role.chipLead.replace(/\s+the$/i, '')
  const main = role.id === 'crew' ? 'THE CREW' : role.chipMain.toUpperCase()
  ctx.fillStyle = '#fff'
  ctx.font = CHIP_LEAD_FONT
  ctx.fillText(lead, BADGE_W / 2, 226)
  let titleSize = 126
  ctx.font = `700 ${titleSize}px Oswald, sans-serif`
  while (ctx.measureText(main.toUpperCase()).width > 850 && titleSize > 82) {
    titleSize -= 4
    ctx.font = `700 ${titleSize}px Oswald, sans-serif`
  }
  ctx.fillText(main.toUpperCase(), BADGE_W / 2, 360)

  // A muted role emblem on the left and the Java sticker on the right frame the portrait.
  if (art && role.id === 'crew') {
    ctx.save()
    ctx.globalAlpha = 0.2
    ctx.drawImage(art.roleSticker, 110, 420, 190, 190)
    ctx.restore()
  } else {
    drawRoleGraphic(ctx, role)
  }

  ctx.save()
  ctx.beginPath()
  ctx.arc(PHOTO.cx, PHOTO.cy, PHOTO.r, 0, Math.PI * 2)
  ctx.fillStyle = state.photo ? '#ffc400' : '#f8faff'
  ctx.fill()
  if (state.photo) {
    ctx.clip()
    const f = photoFrame(state.photo, state.zoom, state.offset)
    ctx.drawImage(state.photo, f.dx, f.dy, f.dw, f.dh)
  } else {
    drawPhotoPlaceholder(ctx)
    ctx.beginPath()
    ctx.arc(PHOTO.cx, PHOTO.cy, PHOTO.r - 7, 0, Math.PI * 2)
    ctx.setLineDash([8, 8])
    ctx.lineWidth = 3
    ctx.strokeStyle = '#c7d6f4'
    ctx.stroke()
    ctx.setLineDash([])
  }
  ctx.restore()

  ctx.beginPath()
  ctx.arc(PHOTO.cx, PHOTO.cy, PHOTO.r + 1, 0, Math.PI * 2)
  ctx.lineWidth = 10
  ctx.strokeStyle = '#ffc400'
  ctx.stroke()

  const name = (state.name.trim() || 'Your Name').toUpperCase()
  let nameSize = 96
  ctx.font = `700 ${nameSize}px Oswald, sans-serif`
  while (ctx.measureText(name).width > 960 && nameSize > 48) {
    nameSize -= 4
    ctx.font = `700 ${nameSize}px Oswald, sans-serif`
  }
  ctx.fillStyle = state.name.trim() ? '#fff' : 'rgba(255,255,255,.55)'
  ctx.fillText(clipText(ctx, name, 960), BADGE_W / 2, 812)

  const credential = [state.title.trim() || 'Your role', state.company.trim() || 'Your company'].join(', ')
  ctx.font = '700 30px Inter, sans-serif'
  const credentialText = clipText(ctx, credential.toUpperCase(), 620)
  const credentialWidth = Math.min(660, ctx.measureText(credentialText).width + 46)
  ctx.strokeStyle = 'rgba(255,255,255,.9)'
  ctx.lineWidth = 2
  ctx.strokeRect(BADGE_W / 2 - credentialWidth / 2, 840, credentialWidth, 58)
  ctx.fillStyle = state.title.trim() || state.company.trim() ? '#fff' : 'rgba(255,255,255,.55)'
  ctx.font = '700 28px Inter, sans-serif'
  ctx.fillText(clipText(ctx, credential.toUpperCase(), credentialWidth - 28), BADGE_W / 2, 879)

  const slogan = badgeSlogan(state).toUpperCase()
  let sloganSize = 42
  ctx.font = `700 ${sloganSize}px Inter, sans-serif`
  while (ctx.measureText(slogan).width > 965 && sloganSize > 30) {
    sloganSize -= 2
    ctx.font = `700 ${sloganSize}px Inter, sans-serif`
  }
  ctx.fillStyle = '#fec400'
  ctx.fillText(clipText(ctx, slogan, 965), BADGE_W / 2, 965)
  ctx.restore()
}

// ---- export / share ----

export function badgeBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error('Could not export the badge image.'))),
      'image/png',
    )
  })
}

export function badgeFileName(name: string) {
  const slug = name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
  return `cdj-2026-badge${slug ? `-${slug}` : ''}.png`
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 4000)
}
