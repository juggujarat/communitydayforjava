import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Deployed to a custom domain (communitydayforjava.com) via GitHub Pages,
// so the app is served from the domain root — base stays '/'.
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsInlineLimit: 0,
  },
})
