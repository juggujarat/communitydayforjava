import { renderToString } from 'react-dom/server'
import { resolvePage } from './routes'
import { getRoutes, headTags, sitemapXml } from './data/routes'

/**
 * Build-time entry (`vite build --ssr`), consumed by scripts/prerender.mjs: returns the
 * <head> tags and rendered body HTML for every generated route, plus the sitemap.
 */
export function renderAll() {
  return getRoutes().map((route) => {
    const page = resolvePage(route.path)
    if (!page) throw new Error(`No page for route ${route.path}`)
    return { path: route.path, head: headTags(route), html: renderToString(page) }
  })
}

export { sitemapXml }
