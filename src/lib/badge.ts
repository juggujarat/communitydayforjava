/**
 * Canvas renderer + export helpers for the attendee badge page (/badge/).
 *
 * The badge is drawn with plain Canvas 2D rather than an HTML-to-image library so the
 * page stays dependency-free (the site has no runtime deps beyond React) and so the
 * exported PNG is pixel-identical everywhere. Everything is laid out in badge
 * coordinates (1080x1350, a 4:5 portrait that posts well on LinkedIn/Instagram/X); the
 * <canvas> is displayed scaled down via CSS.
 */
import { A } from './assets'

export const BADGE_W = 1080
export const BADGE_H = 1350

/** Circular photo frame, in badge coordinates. The page overlays a drag target on it. */
export const PHOTO = { cx: 540, cy: 528, r: 196 }

/**
 * Masthead: the logo sits in the top-left corner with the edition year stacked under
 * it. Keeping the pair off the centre line leaves the middle column to the role chip
 * and the face, which is what the badge is actually about.
 */
const LOGO = { x: 72, y: 58, h: 104 }

/**
 * The Java sticker balances the masthead from the opposite corner. It used to be a 6%
 * watermark behind the portrait; as a foreground mark it reads as a sticker slapped on
 * the badge, which is the point — so it is drawn at full opacity, after the decor
 * layer so nothing floats over it. The source art is square.
 */
const STICKER = { size: 168, x: BADGE_W - 72 - 168, y: 62 }

/**
 * Role chip typography. The two runs share one baseline, offset from the chip's
 * centre by roughly half the larger cap height so the pair sits optically centred.
 */
const CHIP_LEAD_FONT = '700 24px Roboto, sans-serif'
const CHIP_MAIN_FONT = '700 38px Roboto, sans-serif'
const CHIP_GAP = 16
const CHIP_CY = 252
const CHIP_BASELINE = CHIP_CY + 13

/**
 * The venue is the tentative one already published on /cfp/ — keep in sync with the
 * FACTS block in src/components/CFP.tsx when it is locked. The date is deliberately
 * not on the badge while it is still tentative.
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
const SLOGAN_SIZES = [52, 48, 44, 40]
const sloganFont = (size: number) => `500 ${size}px Roboto, sans-serif`
/** Vertical room the slogan takes in the text block. */
const SLOGAN_SLOT = 74
/** Vertical room the role/company line takes in the text block. */
const SUB_SLOT = 58

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
  { id: 'sponsor', label: 'Sponsor', chipLead: "I'm a", chipMain: 'sponsor', share: "We're sponsoring", accent: '#FEC400', ink: '#FEC400' },
  { id: 'organizer', label: 'Organizer', chipLead: "I'm an", chipMain: 'organizer', share: "I'm helping organise", accent: '#7D00BC', ink: '#C88BFF' },
  { id: 'crew', label: 'Crew', chipLead: "I'm on the", chipMain: 'crew', share: "I'm on the crew at", accent: '#0D5CDB', ink: '#6FB6FF' },
]

/**
 * The slogan is a fixed set rather than a free-text field: the badge goes out under
 * the event's name, so every line on it is one we wrote. The list is deliberately the
 * same for every role — the pride line is the wearer's own voice, not a credential,
 * so picking a role never changes (or resets) it.
 */
export const SLOGAN_OPTIONS = [
  'Proud to be part of the Java community',
  'Proud to be a volunteer',
  'Proud to be a Java developer',
  'Proud to be a JUG Gujarat member',
  'Java runs in my veins',
  'See you in Ahmedabad!',
]

/** Stamped when the wearer has not picked a line yet. */
export const DEFAULT_SLOGAN = SLOGAN_OPTIONS[0]

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
  /** One of SLOGAN_OPTIONS. Empty means DEFAULT_SLOGAN is the one stamped. */
  slogan: string
  role: BadgeRole
  photo: HTMLImageElement | null
  /** 1 = photo just covers the circle; up to 3x for a tighter crop. */
  zoom: number
  /** Pan, in badge coordinates, relative to a centred photo. */
  offset: { x: number; y: number }
}

/** The line actually drawn — never empty, so the badge always carries a slogan. */
export function badgeSlogan(state: Pick<BadgeState, 'slogan'>) {
  return state.slogan.trim() || DEFAULT_SLOGAN
}

export interface BadgeArt {
  logo: HTMLImageElement
  /** The Java sticker in the top-right corner. */
  sticker: HTMLImageElement
  brick: HTMLImageElement
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

/** All three are same-origin, so drawing them never taints the canvas. */
export async function loadBadgeArt(): Promise<BadgeArt> {
  const [logo, sticker, brick] = await Promise.all([
    loadImage(A['cd2b3de0-e87e-45cf-8bd3-459baf76597f']),
    loadImage('/assets/java-sticker.png'),
    loadImage(A['6310b061-eeb8-4ae2-a75c-7a329ad216e1']),
  ])
  return { logo, sticker, brick }
}

/**
 * Canvas text silently falls back to a system font if the webfont has not arrived yet,
 * so wait for the faces the badge actually uses before the first paint.
 */
const FONT_SPECS = [
  "700 82px 'Space Grotesk'",
  "700 44px 'Space Grotesk'",
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

/** `#RRGGBB` + alpha -> `rgba(...)`. */
function hexA(hex: string, a: number) {
  const n = parseInt(hex.slice(1), 16)
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`
}

function roundRectPath(ctx: Ctx, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
}

/**
 * Letter-spaced text, drawn glyph by glyph. `ctx.letterSpacing` would be shorter but is
 * missing on older Safari, and the exported PNG has to look the same everywhere.
 */
function trackedWidth(ctx: Ctx, text: string, tracking: number) {
  const chars = Array.from(text)
  if (!chars.length) return 0
  let w = -tracking
  for (const ch of chars) w += ctx.measureText(ch).width + tracking
  return w
}

function fillTracked(ctx: Ctx, text: string, x: number, baseline: number, tracking: number) {
  const align = ctx.textAlign
  ctx.textAlign = 'left'
  let cx = x
  for (const ch of Array.from(text)) {
    ctx.fillText(ch, cx, baseline)
    cx += ctx.measureText(ch).width + tracking
  }
  ctx.textAlign = align
}

function fillTrackedCentered(ctx: Ctx, text: string, centerX: number, baseline: number, tracking: number) {
  fillTracked(ctx, text, centerX - trackedWidth(ctx, text, tracking) / 2, baseline, tracking)
}

/** Truncate with an ellipsis so a very long single word never bleeds off the badge. */
function clipText(ctx: Ctx, text: string, maxWidth: number) {
  if (ctx.measureText(text).width <= maxWidth) return text
  let out = text
  while (out.length > 1 && ctx.measureText(out + '…').width > maxWidth) out = out.slice(0, -1)
  return out + '…'
}

function greedyWrap(ctx: Ctx, text: string, maxWidth: number) {
  const lines: string[] = []
  let line = ''
  for (const word of text.split(/\s+/).filter(Boolean)) {
    const next = line ? `${line} ${word}` : word
    if (line && ctx.measureText(next).width > maxWidth) {
      lines.push(line)
      line = word
    } else {
      line = next
    }
  }
  if (line) lines.push(line)
  return lines
}

const NAME_SIZES = [82, 74, 66, 58, 50, 44]

/**
 * Largest size at which the name fits in at most two lines — and inside the height the
 * rest of the block (role/company, slogan, event lines) leaves for it.
 */
function fitName(ctx: Ctx, name: string, maxWidth: number, maxHeight: number) {
  for (const size of NAME_SIZES) {
    ctx.font = `700 ${size}px 'Space Grotesk', sans-serif`
    const lines = greedyWrap(ctx, name, maxWidth)
    if (
      lines.length <= 2 &&
      lines.every((l) => ctx.measureText(l).width <= maxWidth) &&
      lines.length * Math.round(size * 1.02) <= maxHeight
    ) {
      return { size, lines }
    }
  }
  const size = NAME_SIZES[NAME_SIZES.length - 1]
  ctx.font = `700 ${size}px 'Space Grotesk', sans-serif`
  const lines = greedyWrap(ctx, name, maxWidth).slice(0, 2).map((l) => clipText(ctx, l, maxWidth))
  return { size, lines: lines.length ? lines : [''] }
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

function drawDecor(ctx: Ctx) {
  // Same floating-shape vocabulary as the rest of the site, flattened into the artwork.
  ctx.save()
  ctx.globalAlpha = 0.42
  ctx.strokeStyle = '#FEC400'
  ctx.lineWidth = 12
  ctx.beginPath()
  ctx.arc(126, 322, 74, 0, Math.PI * 2)
  ctx.stroke()

  ctx.globalAlpha = 0.65
  ctx.fillStyle = '#FF384B'
  ctx.beginPath()
  ctx.moveTo(946, 300)
  ctx.lineTo(978, 332)
  ctx.lineTo(946, 364)
  ctx.lineTo(914, 332)
  ctx.closePath()
  ctx.fill()

  ctx.globalAlpha = 0.55
  ctx.fillStyle = '#02CF70'
  ctx.beginPath()
  ctx.arc(112, 1004, 19, 0, Math.PI * 2)
  ctx.fill()

  ctx.globalAlpha = 0.3
  ctx.fillStyle = '#0D5CDB'
  ctx.beginPath()
  ctx.moveTo(962, 944)
  ctx.lineTo(1000, 1010)
  ctx.lineTo(924, 1010)
  ctx.closePath()
  ctx.fill()

  ctx.globalAlpha = 0.55
  ctx.strokeStyle = '#7D00BC'
  ctx.lineWidth = 9
  ctx.beginPath()
  ctx.arc(986, 620, 44, 0, Math.PI * 2)
  ctx.stroke()
  ctx.restore()
}

/** Lucide `cloud-upload`, on a 24x24 grid. */
const CLOUD_UPLOAD = [
  'M12 13v8',
  'M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242',
  'm8 17 4-4 4 4',
]

/**
 * Empty state: a white drop-zone disc with the cloud mark and the instruction, so
 * the circle reads as "put a photo here" at a glance. The HTML overlay on the
 * preview only adds the cursor, hover ring and click target.
 */
function drawPhotoPlaceholder(ctx: Ctx) {
  ctx.save()
  const size = 140
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
  ctx.fillText('Upload Your Photo Here', PHOTO.cx, PHOTO.cy + 100)
  ctx.restore()
}

export function drawBadge(ctx: Ctx, state: BadgeState, art: BadgeArt | null) {
  const { role } = state
  ctx.save()
  ctx.clearRect(0, 0, BADGE_W, BADGE_H)
  ctx.textBaseline = 'alphabetic'
  ctx.textAlign = 'center'

  // Background — the hero's radial navy.
  const bg = ctx.createRadialGradient(BADGE_W / 2, 54, 0, BADGE_W / 2, 54, 1180)
  bg.addColorStop(0, '#20307a')
  bg.addColorStop(0.5, '#131C56')
  bg.addColorStop(1, '#0E1667')
  ctx.fillStyle = bg
  ctx.fillRect(0, 0, BADGE_W, BADGE_H)

  // Accent glow behind the portrait, tinted by the selected role.
  const glow = ctx.createRadialGradient(PHOTO.cx, PHOTO.cy, 0, PHOTO.cx, PHOTO.cy, 540)
  glow.addColorStop(0, hexA(role.ink, 0.2))
  glow.addColorStop(1, hexA(role.ink, 0))
  ctx.fillStyle = glow
  ctx.fillRect(0, 0, BADGE_W, BADGE_H)

  drawDecor(ctx)

  if (art) {
    const w = (LOGO.h * art.logo.naturalWidth) / art.logo.naturalHeight
    ctx.drawImage(art.logo, LOGO.x, LOGO.y, w, LOGO.h)
    const sh = (STICKER.size * art.sticker.naturalHeight) / art.sticker.naturalWidth
    ctx.drawImage(art.sticker, STICKER.x, STICKER.y, STICKER.size, sh)
  }

  // The edition year, under the logo — the badge's one statement of which year this is.
  ctx.font = "700 44px 'Space Grotesk', sans-serif"
  ctx.shadowColor = 'rgba(254,196,0,.5)'
  ctx.shadowBlur = 22
  ctx.fillStyle = '#FEC400'
  fillTracked(ctx, BADGE_EVENT_YEAR, LOGO.x + 6, LOGO.y + LOGO.h + 46, 8)
  ctx.shadowBlur = 0
  ctx.shadowColor = 'transparent'

  // Role chip, set at two sizes: the lead-in ("I'M ON THE") a step down from the word
  // that actually says who the wearer is ("CREW"), so the chip reads at a glance
  // instead of as one flat run of capitals. Both sit on a shared baseline.
  const lead = role.chipLead.toUpperCase()
  const main = role.chipMain.toUpperCase()
  ctx.font = CHIP_LEAD_FONT
  const leadW = trackedWidth(ctx, lead, 3)
  ctx.font = CHIP_MAIN_FONT
  const mainW = trackedWidth(ctx, main, 4)
  const textW = leadW + CHIP_GAP + mainW
  const chipW = textW + 76
  const chipH = 72
  roundRectPath(ctx, BADGE_W / 2 - chipW / 2, CHIP_CY - chipH / 2, chipW, chipH, chipH / 2)
  ctx.fillStyle = hexA(role.ink, 0.16)
  ctx.fill()
  ctx.lineWidth = 2
  ctx.strokeStyle = hexA(role.ink, 0.55)
  ctx.stroke()
  // Halo behind the letters so the chip glows on the navy instead of sitting flat.
  ctx.shadowColor = hexA(role.ink, 0.6)
  ctx.shadowBlur = 20
  ctx.fillStyle = role.ink
  const chipTextX = BADGE_W / 2 - textW / 2
  ctx.font = CHIP_LEAD_FONT
  fillTracked(ctx, lead, chipTextX, CHIP_BASELINE, 3)
  ctx.font = CHIP_MAIN_FONT
  fillTracked(ctx, main, chipTextX + leadW + CHIP_GAP, CHIP_BASELINE, 4)
  ctx.shadowBlur = 0
  ctx.shadowColor = 'transparent'

  // Portrait
  ctx.beginPath()
  ctx.arc(PHOTO.cx, PHOTO.cy, PHOTO.r + 18, 0, Math.PI * 2)
  ctx.fillStyle = 'rgba(255,255,255,.07)'
  ctx.fill()

  ctx.save()
  ctx.beginPath()
  ctx.arc(PHOTO.cx, PHOTO.cy, PHOTO.r, 0, Math.PI * 2)
  ctx.clip()
  // White while empty so the circle reads as a drop zone; navy once a photo lands.
  ctx.fillStyle = state.photo ? '#111b52' : '#ffffff'
  ctx.fill()
  if (state.photo) {
    const f = photoFrame(state.photo, state.zoom, state.offset)
    ctx.drawImage(state.photo, f.dx, f.dy, f.dw, f.dh)
  } else {
    drawPhotoPlaceholder(ctx)
  }
  ctx.restore()

  ctx.beginPath()
  ctx.arc(PHOTO.cx, PHOTO.cy, PHOTO.r + 8, 0, Math.PI * 2)
  ctx.lineWidth = 10
  ctx.strokeStyle = role.ink
  ctx.stroke()

  // ---- text block, vertically centred between the portrait and the footer ----
  const maxTextW = 820
  const hasName = state.name.trim().length > 0
  // Role and company share the line under the name — the block has no room for two,
  // and they read as one credential anyway. Both are required, so the line always has
  // its slot: while it is still empty it previews itself the way the name does.
  const subText = [state.title.trim(), state.company.trim()].filter(Boolean).join('  ·  ')
  const hasSub = subText.length > 0
  const sub = subText || 'Your role  ·  Your company'

  // The pride line, in quotes so it reads as the wearer speaking rather than as more
  // event copy. Always present, and measured before the name, because the name is
  // what gives up a size for it when the block runs out of room.
  const quoted = `“${badgeSlogan(state)}”`
  let sloganSize = SLOGAN_SIZES[SLOGAN_SIZES.length - 1]
  for (const size of SLOGAN_SIZES) {
    ctx.font = sloganFont(size)
    if (ctx.measureText(quoted).width <= maxTextW) {
      sloganSize = size
      break
    }
  }
  ctx.font = sloganFont(sloganSize)
  const sloganText = clipText(ctx, quoted, maxTextW)

  const BLOCK_TOP = 756
  const BLOCK_BOTTOM = 1218
  // 120 = the fixed run under the name: gap + divider rule + place + tagline.
  const nameBudget = BLOCK_BOTTOM - BLOCK_TOP - SUB_SLOT - SLOGAN_SLOT - 120
  const { size, lines } = fitName(ctx, (state.name.trim() || 'Your Name').toUpperCase(), maxTextW, nameBudget)
  const nameLH = Math.round(size * 1.02)

  const blockH = lines.length * nameLH + SUB_SLOT + SLOGAN_SLOT + 14 + 40 + 44 + 42
  let y = BLOCK_TOP + Math.max(0, (BLOCK_BOTTOM - BLOCK_TOP - blockH) / 2)

  ctx.font = `700 ${size}px 'Space Grotesk', sans-serif`
  ctx.fillStyle = hasName ? '#ffffff' : 'rgba(255,255,255,.32)'
  lines.forEach((line, i) => ctx.fillText(line, BADGE_W / 2, y + size * 0.78 + i * nameLH))
  y += lines.length * nameLH

  ctx.font = '500 36px Roboto, sans-serif'
  ctx.fillStyle = hasSub ? '#c9d0ef' : 'rgba(201,208,239,.35)'
  ctx.fillText(clipText(ctx, sub, maxTextW), BADGE_W / 2, y + 36)
  y += SUB_SLOT

  ctx.font = sloganFont(sloganSize)
  ctx.shadowColor = 'rgba(254,196,0,.5)'
  ctx.shadowBlur = 18
  ctx.fillStyle = '#FEC400'
  ctx.fillText(sloganText, BADGE_W / 2, y + 50)
  ctx.shadowBlur = 0
  ctx.shadowColor = 'transparent'
  y += SLOGAN_SLOT

  // Divider rule: the seam between the person (name, slogan) and the event (place,
  // tagline). The year used to sit inside it; it now lives under the logo instead.
  y += 14
  ctx.fillStyle = 'rgba(255,255,255,.16)'
  ctx.fillRect(BADGE_W / 2 - 260, y + 21, 520, 2)
  y += 40

  // Place, on one centred line
  ctx.font = '700 32px Roboto, sans-serif'
  ctx.fillStyle = '#ffffff'
  fillTrackedCentered(ctx, BADGE_EVENT_PLACE.toUpperCase(), BADGE_W / 2, y + 32, 2)
  y += 44

  ctx.font = '600 22px Roboto, sans-serif'
  ctx.fillStyle = 'rgba(201,208,239,.85)'
  fillTrackedCentered(ctx, BADGE_TAGLINE.toUpperCase(), BADGE_W / 2, y + 22, 5)

  // ---- footer: site URL over the brick strip ----
  const brickH = 64
  if (art) {
    const bw = (brickH * art.brick.naturalWidth) / art.brick.naturalHeight
    for (let bx = 0; bx < BADGE_W; bx += bw) {
      ctx.drawImage(art.brick, bx, BADGE_H - brickH, bw, brickH)
    }
  }
  ctx.font = '700 26px Roboto, sans-serif'
  ctx.fillStyle = '#FEC400'
  fillTrackedCentered(ctx, 'COMMUNITYDAYFORJAVA.COM', BADGE_W / 2, BADGE_H - brickH - 34, 4)

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
