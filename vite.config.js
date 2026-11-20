import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base: './' makes the site work at any address, e.g. username.github.io/mariwan-group/
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
})
