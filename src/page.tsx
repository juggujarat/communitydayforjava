import React from 'react'
import ReactDOM from 'react-dom/client'
import { resolvePage } from './routes'
import './styles/global.css'

/**
 * Client bootstrap for every generated page (/agenda/..., /speakers/...). The build
 * prerenders each route's HTML (scripts/prerender.mjs) for crawlers and link previews;
 * this mounts the live React page over it. One entry, route chosen from the URL.
 */
const page = resolvePage(location.pathname)

if (page) {
  ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode>{page}</React.StrictMode>)
}
