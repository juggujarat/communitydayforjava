import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { readFileSync } from 'node:fs'
import { getRoutes, headTags } from './src/data/routes'

/**
 * Dev-server counterpart of the build-time prerender (scripts/prerender.mjs): serves the
 * generated programme pages (/agenda/..., /speakers/...) from the page.html shell with the
 * route's real <head>. In production those pages are static files written to dist/.
 */
function programmePages(): Plugin {
  return {
    name: 'cdj-programme-pages',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const path = (req.url ?? '').split(/[?#]/)[0]
        const route = getRoutes().find((r) => r.path === path || r.path === `${path}/`)
        if (!route) return next()
        const shell = readFileSync('page.html', 'utf8').replace('<!--app-head-->', headTags(route)).replace('<!--app-html-->', '')
        res.setHeader('Content-Type', 'text/html')
        res.end(await server.transformIndexHtml(req.url ?? path, shell))
      })
    },
  }
}

// Deployed to a custom domain (communitydayforjava.com) via GitHub Pages,
// so the app is served from the domain root — base stays '/'.
export default defineConfig({
  plugins: [react(), programmePages()],
  base: '/',
  build: {
    outDir: 'dist',
    assetsInlineLimit: 0,
    rollupOptions: {
      input: {
        main: 'index.html',
        cfp: 'cfp/index.html',
        badge: 'badge/index.html',
        // Shell for the generated /agenda/ and /speakers/ pages; scripts/prerender.mjs
        // stamps it out per route and removes dist/page.html afterwards.
        page: 'page.html',
        badgeTeam: '3d31280d-b523-4db7-a5b2-8cfda001b544/index.html',
        tickets: 'tickets.html',
      },
    },
  },
})
