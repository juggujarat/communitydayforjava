import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Deployed to a custom domain (communitydayforjava.com) via GitHub Pages,
// so the app is served from the domain root — base stays '/'.
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    assetsInlineLimit: 0,
    rollupOptions: {
      input: {
        main: 'index.html',
        cfp: 'cfp/index.html',
        badge: 'badge/index.html',
        sivaSpeaker: 'speakers/siva-prasad-reddy/index.html',
        dhavalSpeaker: 'speakers/dhaval-shah/index.html',
        raviSpeaker: 'speakers/ravi-soni/index.html',
        nikhileshSpeaker: 'speakers/nikhilesh-tayal/index.html',
        dhavalDesaiSpeaker: 'speakers/dhaval-desai/index.html',
        vikasSpeaker: 'speakers/vikas-rajput/index.html',
        badgeTeam: '3d31280d-b523-4db7-a5b2-8cfda001b544/index.html',
        tickets: 'tickets.html',
      },
    },
  },
})
