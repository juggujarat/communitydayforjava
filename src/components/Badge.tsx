import { useCallback, useEffect, useRef, useState } from 'react'
import { h } from '../lib/handlers'
import { Icon } from '../lib/icons'
import { BADGE_PAGE } from '../lib/links'
import {
  BADGE_H,
  BADGE_ROLES,
  BADGE_W,
  CAPTION_OPTIONS,
  PHOTO,
  badgeBlob,
  badgeCaption,
  badgeSlogan,
  badgeFileName,
  clampOffset,
  downloadBlob,
  drawBadge,
  loadBadgeArt,
  loadBadgeFonts,
  loadImage,
  SLOGAN_OPTIONS,
  type BadgeArt,
  type BadgeRole,
} from '../lib/badge'

/** Hard cap on the upload — anything larger is a camera original nobody needs here. */
const MAX_UPLOAD = 10 * 1024 * 1024

const SHARE_HASHTAGS = '#java #cd4j2026 #communitydayforjava'

/** The post opens with the wearer's chosen caption, plain text plus the shared tags. */
function shareText(caption: string) {
  return `${caption} ${SHARE_HASHTAGS}`
}

/**
 * None of these networks lets a page attach an image to a post, so every social button
 * copies/downloads the PNG first and then opens the composer. Instagram additionally
 * blocks any web caption prefill, so its composer opens blank — `hasCaption: false`
 * flags that for the status message.
 */
const SHARE_TARGETS = [
  {
    id: 'linkedin' as const,
    label: 'LinkedIn',
    icon: 'linkedin' as const,
    color: '#0A66C2',
    hasCaption: true,
    url: (_caption: string) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(BADGE_PAGE)}`,
  },
  {
    id: 'instagram' as const,
    label: 'Instagram',
    icon: 'instagram' as const,
    color: '#C13584',
    hasCaption: false,
    url: (_caption: string) => 'https://www.instagram.com/',
  },
  {
    id: 'whatsapp' as const,
    label: 'WhatsApp',
    icon: 'whatsapp' as const,
    color: '#25D366',
    hasCaption: true,
    url: (caption: string) =>
      `https://wa.me/?text=${encodeURIComponent(`${shareText(caption)} ${BADGE_PAGE}`)}`,
  },
]

/** "a", "a and b", "a, b and c" — the missing-fields nudge reads as a sentence. */
function listPhrase(items: string[]) {
  if (items.length < 2) return items.join('')
  return `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`
}

const STEPS = [
  { n: '1', text: 'Tap the circle on the badge to add your photo, then drag and zoom until your face fills it.' },
  { n: '2', text: 'Add your name, role and company, pick how you are joining, and choose your line.' },
  { n: '3', text: 'Download or copy the badge, then post it and tag us — we reshare every one.' },
]

const labelStyle: React.CSSProperties = {
  display: 'block',
  marginBottom: '8px',
  fontSize: '12px',
  fontWeight: 800,
  letterSpacing: '1px',
  textTransform: 'uppercase',
  color: '#0D5CDB',
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '14px 16px',
  borderRadius: '14px',
  border: '1px solid rgba(14,22,103,.14)',
  background: '#fff',
  color: '#0E1667',
  fontSize: '15px',
  fontWeight: 600,
  fontFamily: "'Roboto',sans-serif",
  outline: 'none',
}

const cardStyle: React.CSSProperties = {
  background: '#fff',
  borderRadius: '28px',
  padding: '28px',
  border: '1px solid rgba(14,22,103,.08)',
  boxShadow: '0 18px 42px rgba(14,22,103,.08)',
}

const secondaryBtn: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '9px',
  padding: '15px 20px',
  borderRadius: '46px',
  border: '1.5px solid rgba(14,22,103,.16)',
  background: '#fff',
  color: '#0E1667',
  fontSize: '14px',
  fontWeight: 800,
  fontFamily: "'Roboto',sans-serif",
  cursor: 'pointer',
}

type Status = { kind: 'ok' | 'err'; text: string } | null

export default function Badge() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  /** Object URL backing the current photo; revoked only once it is replaced. */
  const photoUrl = useRef<string | null>(null)
  const drag = useRef<{ x: number; y: number } | null>(null)

  const [name, setName] = useState('')
  const [title, setTitle] = useState('')
  const [company, setCompany] = useState('')
  /** One of SLOGAN_OPTIONS; empty means the default line is the one stamped. */
  const [slogan, setSlogan] = useState('')
  const [role, setRole] = useState<BadgeRole>(BADGE_ROLES[0])
  /** One of CAPTION_OPTIONS[role.id]; empty means that role's first caption is used. */
  const [caption, setCaption] = useState('')
  const [photo, setPhoto] = useState<HTMLImageElement | null>(null)
  const [zoom, setZoom] = useState(1)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [art, setArt] = useState<BadgeArt | null>(null)
  const [fontsReady, setFontsReady] = useState(false)
  const [dropActive, setDropActive] = useState(false)
  const [hotPhoto, setHotPhoto] = useState(false)
  const [busy, setBusy] = useState<string | null>(null)
  const [status, setStatus] = useState<Status>(null)

  // Artwork and webfonts both feed the canvas; each triggers a redraw as it lands.
  useEffect(() => {
    let live = true
    loadBadgeArt().then(
      (a) => { if (live) setArt(a) },
      () => { /* the badge still renders without the logo/brick artwork */ },
    )
    loadBadgeFonts().then(() => { if (live) setFontsReady(true) })
    return () => { live = false }
  }, [])

  useEffect(() => () => { if (photoUrl.current) URL.revokeObjectURL(photoUrl.current) }, [])

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d')
    if (!ctx) return
    drawBadge(ctx, { name, title, company, slogan, role, photo, zoom, offset }, art)
  }, [name, title, company, slogan, role, photo, zoom, offset, art, fontsReady])

  const acceptFile = useCallback(async (file: File | null | undefined) => {
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setStatus({ kind: 'err', text: 'That is not an image — please choose a PNG, JPG or WebP file.' })
      return
    }
    if (file.size > MAX_UPLOAD) {
      setStatus({ kind: 'err', text: 'That image is over 10 MB. Please pick a smaller one.' })
      return
    }
    const url = URL.createObjectURL(file)
    try {
      const img = await loadImage(url)
      if (photoUrl.current) URL.revokeObjectURL(photoUrl.current)
      photoUrl.current = url
      setPhoto(img)
      setZoom(1)
      setOffset({ x: 0, y: 0 })
      setStatus(null)
    } catch {
      URL.revokeObjectURL(url)
      setStatus({ kind: 'err', text: 'That image could not be read. Try re-saving it as a PNG or JPG.' })
    }
  }, [])

  /** What the badge is stamped with: the chosen line, else the role's own. */
  const badgeLine = badgeSlogan({ slogan, role })
  /** The slogans on offer for the current role. */
  const sloganOptions = SLOGAN_OPTIONS[role.id] ?? []
  /** The captions on offer for the current role, and the one actually posted. */
  const captionOptions = CAPTION_OPTIONS[role.id] ?? []
  const activeCaption = badgeCaption(role, caption)

  /** Slogans and captions are role-specific, so switching role drops any pick from the old one. */
  const changeRole = (r: BadgeRole) => {
    setRole(r)
    setSlogan('')
    setCaption('')
  }

  const openPicker = () => fileRef.current?.click()

  const changeZoom = (z: number) => {
    setZoom(z)
    if (photo) setOffset((o) => clampOffset(photo, z, o))
  }

  // ---- drag-to-reposition, on an overlay pinned to the photo circle ----
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!photo) return
    e.currentTarget.setPointerCapture(e.pointerId)
    drag.current = { x: e.clientX, y: e.clientY }
  }

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const canvas = canvasRef.current
    if (!drag.current || !photo || !canvas) return
    const scale = BADGE_W / canvas.getBoundingClientRect().width
    const dx = (e.clientX - drag.current.x) * scale
    const dy = (e.clientY - drag.current.y) * scale
    drag.current = { x: e.clientX, y: e.clientY }
    setOffset((o) => clampOffset(photo, zoom, { x: o.x + dx, y: o.y + dy }))
  }

  const endDrag = () => { drag.current = null }

  // ---- export / share ----
  const withBadge = async (job: string, fn: (blob: Blob) => Promise<void>) => {
    const canvas = canvasRef.current
    if (!canvas || busy) return
    setBusy(job)
    try {
      await fn(await badgeBlob(canvas))
    } catch (err) {
      setStatus({ kind: 'err', text: err instanceof Error ? err.message : 'Something went wrong — please try again.' })
    } finally {
      setBusy(null)
    }
  }

  const download = () =>
    withBadge('download', async (blob) => {
      downloadBlob(blob, badgeFileName(name))
      setStatus({ kind: 'ok', text: 'Badge downloaded. Post it and tag @cd4java — we reshare every badge!' })
    })

  const copyImage = () =>
    withBadge('copy', async (blob) => {
      if (!navigator.clipboard?.write || typeof ClipboardItem === 'undefined') {
        throw new Error('This browser cannot copy images to the clipboard — use Download instead.')
      }
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
      setStatus({ kind: 'ok', text: 'Badge copied. Paste it straight into a post, story or chat.' })
    })

  /** Clicking a caption both picks it and copies it — no separate copy step. */
  const pickCaption = async (c: string) => {
    setCaption(c)
    try {
      if (!navigator.clipboard?.writeText) {
        throw new Error('This browser cannot copy text — please select and copy the caption manually.')
      }
      await navigator.clipboard.writeText(shareText(c))
      setStatus({ kind: 'ok', text: 'Caption copied — paste it wherever you post the badge.' })
    } catch (err) {
      setStatus({ kind: 'err', text: err instanceof Error ? err.message : 'Could not copy the caption — please try again.' })
    }
  }

  const shareNative = () =>
    withBadge('share', async (blob) => {
      const file = new File([blob], badgeFileName(name), { type: 'image/png' })
      if (!navigator.canShare?.({ files: [file] })) {
        throw new Error('This browser cannot share files — use Download instead.')
      }
      try {
        await navigator.share({ files: [file], text: `${shareText(activeCaption)} ${BADGE_PAGE}` })
      } catch (err) {
        // The user closing the share sheet is not a failure.
        if ((err as DOMException)?.name !== 'AbortError') throw err
      }
    })

  const shareTo = (target: (typeof SHARE_TARGETS)[number]) =>
    withBadge(target.id, async (blob) => {
      // Clipboard write can silently fail (e.g. permissions) — the download is the
      // fallback that always gets the badge onto the user's machine either way.
      let copied = false
      if (navigator.clipboard?.write && typeof ClipboardItem !== 'undefined') {
        try {
          await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
          copied = true
        } catch {
          copied = false
        }
      }
      downloadBlob(blob, badgeFileName(name))
      window.open(target.url(activeCaption), '_blank', 'noopener,noreferrer')
      const lead = copied ? 'Badge copied and downloaded' : 'Badge downloaded'
      const attach = copied ? 'press Ctrl/Cmd+V to paste it in' : 'attach it from your downloads'
      setStatus({
        kind: 'ok',
        text: target.hasCaption
          ? `${lead} — ${attach} the ${target.label} post that just opened.`
          : `${lead} — ${attach} on ${target.label}, then add your own caption (it doesn't accept one from the web).`,
      })
    })

  /** Files-capable Web Share exists mainly on phones — the only flow that attaches the
   *  badge image and caption together in a single tap, so it leads when available. */
  const canShareFiles = typeof navigator !== 'undefined'
    && typeof navigator.share === 'function'
    && typeof navigator.canShare === 'function'

  /** Empty-circle affordance lights up on hover and while a file is dragged over. */
  const hot = hotPhoto || dropActive

  /**
   * Nothing is exportable until the badge is actually filled in — a download of the
   * empty template helps nobody. The slogan needs no check: one is always selected.
   */
  const missing = [
    !photo && 'your photo',
    !name.trim() && 'your name',
    !title.trim() && 'your role',
    !company.trim() && 'your company',
  ].filter(Boolean) as string[]
  const blocked = missing.length > 0 || busy !== null
  const exportCursor = busy ? 'wait' : missing.length ? 'not-allowed' : 'pointer'
  const dimmed: React.CSSProperties = missing.length
    ? { opacity: 0.5, filter: 'grayscale(1)', transition: 'filter .25s ease, opacity .25s ease' }
    : { transition: 'filter .25s ease, opacity .25s ease' }

  // Only used by the commented-out "Share it" JSX below — keeps noUnusedLocals quiet
  // while that section is disabled, without deleting the section or its helpers.
  void Icon; void shareNative; void shareTo; void canShareFiles

  return (
    <section id="badge" style={{ position: 'relative', padding: '84px 40px', background: 'linear-gradient(180deg,#F4F1E8 0%,#fff8ee 100%)', color: '#0E1667', overflow: 'hidden' }}>
      <div style={{ position: 'relative', zIndex: 3, maxWidth: '1180px', margin: '0 auto' }}>
        <div data-reveal style={{ marginBottom: '34px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(13,92,219,.08)', color: '#0D5CDB', padding: '9px 14px', borderRadius: '999px', fontSize: '12px', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '18px' }}>
            Badge Builder
          </div>
          <h2 id="badge-headline" style={{ margin: 0, fontWeight: 500, fontSize: 'clamp(30px,4.4vw,58px)', lineHeight: 1, letterSpacing: '-1.7px', whiteSpace: 'nowrap' }}>
            Tell the world you're <span style={{ fontFamily: "'Roboto',sans-serif", fontWeight: 700, color: '#0D5CDB' }}>part of it</span>.
          </h2>
          <p style={{ margin: '18px 0 0', maxWidth: '860px', fontSize: '17px', lineHeight: 1.65, fontWeight: 500, color: '#42498a' }}>
            Add your photo, pick how you're joining, and download a ready-to-post Community Day for Java 2026
            badge. 
          </p>
        </div>

        <div id="badge-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.02fr', gap: '28px', alignItems: 'start' }}>
          {/* ---- form ---- */}
          <div data-reveal data-reveal-d="60" style={{ display: 'grid', gap: '18px' }}>
            <div style={cardStyle}>
              <label style={labelStyle} htmlFor="badge-name">Your name</label>
              <input
                id="badge-name"
                type="text"
                value={name}
                maxLength={40}
                placeholder="e.g. Vinay Rajput"
                onChange={(e) => setName(e.target.value)}
                style={{ ...inputStyle, marginBottom: '20px' }}
              />

              <label style={labelStyle} htmlFor="badge-title">Role</label>
              <input
                id="badge-title"
                type="text"
                value={title}
                maxLength={38}
                placeholder="e.g. Java Developer"
                onChange={(e) => setTitle(e.target.value)}
                style={{ ...inputStyle, marginBottom: '20px' }}
              />

              <label style={labelStyle} htmlFor="badge-company">Company / community</label>
              <input
                id="badge-company"
                type="text"
                value={company}
                maxLength={48}
                placeholder="e.g. Java User Group Gujarat"
                onChange={(e) => setCompany(e.target.value)}
                style={{ ...inputStyle, marginBottom: '20px' }}
              />

              <span style={labelStyle}>How are you joining?</span>
              <div id="badge-roles" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '10px' }}>
                {BADGE_ROLES.map((r) => {
                  const on = r.id === role.id
                  return (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => changeRole(r)}
                      aria-pressed={on}
                      style={{
                        padding: '13px 10px', borderRadius: '14px', cursor: 'pointer',
                        fontSize: '13.5px', fontWeight: 800, fontFamily: "'Roboto',sans-serif",
                        border: `1.5px solid ${on ? r.accent : 'rgba(14,22,103,.14)'}`,
                        background: on ? `${r.accent}1f` : '#fff',
                        color: on ? '#0E1667' : '#5a6299',
                        boxShadow: on ? `0 8px 20px ${r.accent}33` : 'none',
                        transition: 'all .22s ease',
                      }}
                    >
                      {r.label}
                    </button>
                  )
                })}
              </div>

              {/* Fixed set, one always selected — the badge never goes out without a
                  line, and every line on it is one we wrote. */}
              <span style={{ ...labelStyle, marginTop: '20px' }}>Your slogan</span>
              <div id="badge-slogans" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {sloganOptions.map((s) => {
                  const on = s === badgeLine
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSlogan(s)}
                      aria-pressed={on}
                      style={{
                        padding: '10px 14px', borderRadius: '999px', cursor: 'pointer',
                        fontSize: '12.5px', fontWeight: 700, fontFamily: "'Roboto',sans-serif",
                        border: `1.5px solid ${on ? role.accent : 'rgba(14,22,103,.14)'}`,
                        background: on ? `${role.accent}1f` : '#fff',
                        color: on ? '#0E1667' : '#5a6299',
                        boxShadow: on ? `0 8px 20px ${role.accent}33` : 'none',
                        transition: 'all .22s ease',
                      }}
                    >
                      {s}
                    </button>
                  )
                })}
              </div>

              {/* Three ready-made captions per role — never stamped on the badge itself.
                  Tapping one both picks it and copies it, ready to paste anywhere. */}
              <span style={{ ...labelStyle, marginTop: '20px' }}>Your caption (tap to copy)</span>
              <div id="badge-captions" style={{ display: 'grid', gap: '8px' }}>
                {captionOptions.map((c) => {
                  const on = c === activeCaption
                  return (
                    <button
                      key={c}
                      type="button"
                      onClick={() => void pickCaption(c)}
                      aria-pressed={on}
                      style={{
                        textAlign: 'left', padding: '12px 14px', borderRadius: '14px', cursor: 'pointer',
                        fontSize: '13px', fontWeight: 600, lineHeight: 1.5, fontFamily: "'Roboto',sans-serif",
                        border: `1.5px solid ${on ? role.accent : 'rgba(14,22,103,.14)'}`,
                        background: on ? `${role.accent}1f` : '#fff',
                        color: on ? '#0E1667' : '#5a6299',
                        boxShadow: on ? `0 8px 20px ${role.accent}33` : 'none',
                        transition: 'all .22s ease',
                      }}
                    >
                      {c}
                    </button>
                  )
                })}
              </div>
            </div>

          </div>

          {/* ---- preview + actions ---- */}
          <div id="badge-preview" data-reveal data-reveal-d="100" style={{ position: 'sticky', top: '104px' }}>
            {/* The badge itself is the drop zone; the photo circle is the file picker. */}
            <div
              onDragOver={(e) => { e.preventDefault(); setDropActive(true) }}
              onDragLeave={() => setDropActive(false)}
              onDrop={(e) => { e.preventDefault(); setDropActive(false); void acceptFile(e.dataTransfer.files?.[0]) }}
              style={{ position: 'relative', width: '68%', margin: '0 auto', borderRadius: '30px', overflow: 'hidden', boxShadow: '0 34px 74px rgba(14,22,103,.24)', border: `1px solid ${dropActive ? '#FEC400' : 'rgba(14,22,103,.1)'}`, background: '#131C56' }}
            >
              <canvas
                ref={canvasRef}
                width={BADGE_W}
                height={BADGE_H}
                role="img"
                aria-label={`Community Day for Java 2026 badge preview for ${name.trim() || 'your name'}`}
                style={{ display: 'block', width: '100%', height: 'auto' }}
              />
              {/* One overlay on the circle: while empty it is a real upload button, and
                  once a photo is in it becomes the drag-to-reframe handle. */}
              <div
                onClick={photo ? undefined : openPicker}
                onKeyDown={photo ? undefined : (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openPicker() } }}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={endDrag}
                onPointerCancel={endDrag}
                onMouseEnter={() => setHotPhoto(true)}
                onMouseLeave={() => setHotPhoto(false)}
                role={photo ? undefined : 'button'}
                tabIndex={photo ? undefined : 0}
                aria-label={photo ? undefined : 'Upload your photo'}
                title={photo ? 'Drag to reposition your photo' : 'Upload your photo'}
                style={{
                  position: 'absolute',
                  boxSizing: 'border-box',
                  left: `${((PHOTO.cx - PHOTO.r) / BADGE_W) * 100}%`,
                  top: `${((PHOTO.cy - PHOTO.r) / BADGE_H) * 100}%`,
                  width: `${((PHOTO.r * 2) / BADGE_W) * 100}%`,
                  height: `${((PHOTO.r * 2) / BADGE_H) * 100}%`,
                  borderRadius: '50%',
                  cursor: photo ? 'grab' : 'pointer',
                  touchAction: 'none',
                  outline: 'none',
                  border: !photo && hot ? '3px dashed #0D5CDB' : '3px dashed transparent',
                  background: !photo && hot ? 'rgba(13,92,219,.12)' : 'transparent',
                  transition: 'background .2s ease, border-color .2s ease',
                }}
              >
              </div>
            </div>
            <input
              ref={fileRef}
              id="badge-photo"
              type="file"
              accept="image/*"
              onChange={(e) => void acceptFile(e.target.files?.[0])}
              style={{ display: 'none' }}
            />

            {photo ? (
              <div style={{ marginTop: '16px', background: '#fff', borderRadius: '20px', padding: '16px 18px', border: '1px solid rgba(14,22,103,.08)', boxShadow: '0 12px 28px rgba(14,22,103,.06)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginBottom: '4px' }}>
                  <label style={{ ...labelStyle, marginBottom: 0 }} htmlFor="badge-zoom">Zoom &amp; position</label>
                  <button
                    type="button"
                    onClick={openPicker}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', padding: '8px 14px', borderRadius: '46px', border: '1.5px solid rgba(14,22,103,.16)', background: '#fff', color: '#0E1667', fontSize: '12.5px', fontWeight: 800, fontFamily: "'Roboto',sans-serif", cursor: 'pointer' }}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0D5CDB" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <path d="M17 8l-5-5-5 5" />
                      <path d="M12 3v12" />
                    </svg>
                    Change photo
                  </button>
                </div>
                <input
                  id="badge-zoom"
                  type="range"
                  min={1}
                  max={3}
                  step={0.01}
                  value={zoom}
                  onChange={(e) => changeZoom(parseFloat(e.target.value))}
                  style={{ width: '100%', accentColor: '#FF384B', cursor: 'pointer' }}
                />
                <div style={{ marginTop: '4px', fontSize: '13px', fontWeight: 500, color: '#5a6299' }}>
                  Drag the photo inside the circle to reframe it.
                </div>
              </div>
            ) : (
              <p style={{ margin: '14px 0 0', textAlign: 'center', fontSize: '13.5px', fontWeight: 600, lineHeight: 1.6, color: '#5a6299' }}>
                Tap the circle on the badge to add your photo — or drop one anywhere on it.
                PNG, JPG or WebP, up to 10 MB.
              </p>
            )}

            {missing.length > 0 && (
              <p style={{ margin: '18px 0 0', display: 'flex', gap: '9px', alignItems: 'center', justifyContent: 'center', padding: '12px 16px', borderRadius: '16px', background: 'rgba(13,92,219,.07)', color: '#42498a', fontSize: '13.5px', fontWeight: 700, lineHeight: 1.5, textAlign: 'center' }}>
                <span style={{ flex: '0 0 auto', width: '8px', height: '8px', borderRadius: '50%', background: '#FEC400' }} />
                Add {listPhrase(missing)} to unlock the download.
              </p>
            )}

            <div id="badge-actions" style={{ marginTop: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <button
                type="button"
                onClick={download}
                disabled={blocked}
                data-cta="1"
                style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '9px', padding: '16px 22px', borderRadius: '46px', border: 'none', color: '#fff', fontSize: '14px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', fontFamily: "'Roboto',sans-serif", cursor: exportCursor, filter: missing.length ? 'grayscale(1)' : 'none', opacity: missing.length ? 0.5 : 1, transition: 'filter .25s ease, opacity .25s ease' }}
                onMouseEnter={h.btnOn}
                onMouseLeave={h.btnOff}
              >
                {busy === 'download' ? 'Preparing…' : 'Download badge'}
              </button>
              <button type="button" onClick={copyImage} disabled={blocked} style={{ ...secondaryBtn, ...dimmed, cursor: exportCursor }}>
                {busy === 'copy' ? 'Copying…' : 'Copy image'}
              </button>
            </div>

            {/* "Share it" section disabled for now — the download/copy flow above is
                enough on its own. Left in place (not deleted) in case we bring it back. */}
            {/*
            <div style={{ marginTop: '18px' }}>
              <div style={{ ...labelStyle, marginBottom: '10px' }}>Share it</div>

              // On phones this is the one true one-tap share: badge image + caption
              // land in the share sheet together, no copy/paste or download needed.
              {canShareFiles && (
                <button
                  type="button"
                  onClick={shareNative}
                  disabled={blocked}
                  data-cta="1"
                  style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '9px', width: '100%', padding: '16px 22px', borderRadius: '46px', border: 'none', color: '#fff', fontSize: '14px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', fontFamily: "'Roboto',sans-serif", cursor: exportCursor, filter: missing.length ? 'grayscale(1)' : 'none', opacity: missing.length ? 0.5 : 1, transition: 'filter .25s ease, opacity .25s ease' }}
                  onMouseEnter={h.btnOn}
                  onMouseLeave={h.btnOff}
                >
                  {busy === 'share' ? 'Opening…' : 'Share badge + caption'}
                </button>
              )}

              <div id="badge-share" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '10px', marginTop: canShareFiles ? '10px' : 0 }}>
                {SHARE_TARGETS.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => shareTo(t)}
                    disabled={blocked}
                    style={{ ...secondaryBtn, gap: '8px', padding: '14px 12px', color: t.color, borderColor: `${t.color}33`, ...dimmed, cursor: exportCursor }}
                  >
                    <Icon type={t.icon} />
                    {t.label}
                  </button>
                ))}
              </div>
              {!canShareFiles && (
                <p style={{ margin: '10px 0 0', fontSize: '12.5px', fontWeight: 600, lineHeight: 1.5, color: '#5a6299' }}>
                  Each button copies the badge to your clipboard (and downloads it as a backup), then opens the post box — just paste with Ctrl/Cmd+V.
                </p>
              )}
            </div>
            */}

            <div aria-live="polite" style={{ minHeight: '22px', marginTop: '14px' }}>
              {status && (
                <div style={{ display: 'flex', gap: '9px', alignItems: 'flex-start', padding: '13px 16px', borderRadius: '16px', fontSize: '13.5px', fontWeight: 600, lineHeight: 1.55, background: status.kind === 'ok' ? 'rgba(2,207,112,.1)' : 'rgba(255,56,75,.09)', color: status.kind === 'ok' ? '#0b7a48' : '#c11f30' }}>
                  <span style={{ flex: '0 0 auto', width: '8px', height: '8px', borderRadius: '50%', marginTop: '6px', background: status.kind === 'ok' ? '#02CF70' : '#FF384B' }} />
                  <span>{status.text}</span>
                </div>
              )}
            </div>
          </div>

          {/* Last thing in the section, across both columns: by the time it is read the
              form and the badge have already been seen. */}
          <div data-reveal data-reveal-d="140" style={{ ...cardStyle, gridColumn: '1 / -1' }}>
            <span style={labelStyle}>How it works</span>
            <div id="badge-steps" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '18px' }}>
              {STEPS.map((s) => (
                <div key={s.n} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', fontSize: '14px', lineHeight: 1.65, color: '#42498a' }}>
                  <span style={{ flex: '0 0 auto', display: 'grid', placeItems: 'center', width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(13,92,219,.1)', color: '#0D5CDB', fontSize: '12px', fontWeight: 800 }}>{s.n}</span>
                  <span>{s.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
