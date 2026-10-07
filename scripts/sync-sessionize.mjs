// Pulls sessions + speakers from Sessionize and writes src/data/sessionize.json.
//
// The Sessionize endpoint (8gzqf0q3) is an *embed* endpoint: it answers with HTML, not
// JSON, so this parses the embed markup. The three views are fetched with `?under=True`,
// which is what the embed <script> itself requests. The committed JSON is the snapshot
// the site builds from — re-run `npm run sync:sessionize` whenever the programme changes.
//
// The embed carries no day / format / category for a session (tags are empty), so the
// workshop-vs-conference split is NOT in this data; it is layered on in src/data/.
import { writeFile, mkdir } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ID = '8gzqf0q3'
const OUT = resolve(dirname(fileURLToPath(import.meta.url)), '../src/data/sessionize.json')

// Speaker URLs that already exist and are indexed — keep them stable.
const SLUG_OVERRIDES = { 'Siva Prasad Reddy Katamreddy': 'siva-prasad-reddy' }

const get = async (view) => {
  const res = await fetch(`https://sessionize.com/api/v2/${ID}/view/${view}?under=True`)
  if (!res.ok) throw new Error(`${view}: HTTP ${res.status}`)
  return res.text()
}

const decode = (s) =>
  s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;|&#x27;/g, "'").replace(/&nbsp;/g, ' ')
const text = (html) => decode(html.replace(/<br\s*\/?>/gi, '\n').replace(/<[^>]+>/g, '')).replace(/[ \t]+\n/g, '\n').replace(/\n{3,}/g, '\n\n').trim()
const one = (block, re) => { const m = block.match(re); return m ? m[1] : '' }
const slugify = (s, max = 64) => {
  const full = s.toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  if (full.length <= max) return full
  const cut = full.slice(0, max)
  return cut.slice(0, cut.lastIndexOf('-')) || cut
}
const blocks = (html, marker) => html.split(marker).slice(1)

const [sessionsHtml, speakersHtml] = await Promise.all([get('Sessions'), get('Speakers')])

const speakers = blocks(speakersHtml, '<li id="sz-speaker-').map((b) => {
  const name = text(one(b, /<h3 class="sz-speaker__name">([\s\S]*?)<\/h3>/))
  return {
    id: one(b, /data-speakerid="([^"]+)"/),
    name,
    slug: SLUG_OVERRIDES[name] ?? slugify(name),
    tagline: text(one(b, /<h4 class="sz-speaker__tagline">([\s\S]*?)<\/h4>/)),
    bio: text(one(b, /<p class="sz-speaker__bio">([\s\S]*?)<\/p>/)),
    photo: one(b, /<img[^>]*src="([^"]+)"/),
    sessionIds: [...b.matchAll(/data-sessionid="(\d+)"/g)].map((m) => m[1]),
  }
})
const bySpeaker = new Map(speakers.map((s) => [s.id, s]))

const sessions = blocks(sessionsHtml, '<li id="sz-session-').map((b) => {
  const title = text(one(b, /<h3 class="sz-session__title">([\s\S]*?)<\/h3>/))
  return {
    id: one(b, /^(\d+)"/),
    title,
    slug: slugify(title),
    description: text(one(b, /<p class="sz-session__description">([\s\S]*?)<\/p>/)),
    speakerIds: [...b.matchAll(/data-speakerid="([^"]+)"/g)].map((m) => m[1]),
  }
})

for (const s of sessions) for (const id of s.speakerIds) if (!bySpeaker.has(id)) throw new Error(`session ${s.id}: unknown speaker ${id}`)
if (!sessions.length || !speakers.length) throw new Error('Parsed nothing — Sessionize markup may have changed')

await mkdir(dirname(OUT), { recursive: true })
await writeFile(OUT, JSON.stringify({ eventId: ID, fetchedAt: new Date().toISOString(), sessions, speakers }, null, 2) + '\n')
console.log(`Wrote ${sessions.length} sessions, ${speakers.length} speakers -> ${OUT}`)
for (const s of sessions) console.log(`  [${s.id}] ${s.title}  —  ${s.speakerIds.map((i) => bySpeaker.get(i).name).join(', ')}  (${s.description.length} chars)`)
