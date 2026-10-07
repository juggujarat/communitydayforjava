// Stamps out the static HTML for every generated page (/agenda/, /agenda/<session>/,
// /speakers/, /speakers/<speaker>/) and writes sitemap.xml.
//
// Runs after `vite build` (client -> dist/) and `vite build --ssr` (-> dist-ssr/). The
// built dist/page.html is the template: it already carries the hashed JS/CSS tags, so
// each route only needs its own <head> tags and server-rendered body injected. The live
// React page then mounts over that markup. Crawlers and link-preview bots (LinkedIn,
// WhatsApp, X) that don't run JavaScript read the prerendered HTML.
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')

const { renderAll, sitemapXml } = await import(pathToFileURL(join(root, 'dist-ssr', 'prerender.js')).href)
const template = await readFile(join(dist, 'page.html'), 'utf8')
for (const marker of ['<!--app-head-->', '<!--app-html-->']) {
  if (!template.includes(marker)) throw new Error(`dist/page.html lost its ${marker} marker (did the HTML minifier strip it?)`)
}

const pages = renderAll()
for (const { path, head, html } of pages) {
  const out = join(dist, path, 'index.html')
  await mkdir(dirname(out), { recursive: true })
  await writeFile(out, template.replace('<!--app-head-->', head).replace('<!--app-html-->', html))
}

await writeFile(join(dist, 'sitemap.xml'), sitemapXml())
await rm(join(dist, 'page.html'))
await rm(join(root, 'dist-ssr'), { recursive: true, force: true })
console.log(`Prerendered ${pages.length} pages + sitemap.xml:\n${pages.map((p) => '  ' + p.path).join('\n')}`)
