import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  ssr: {
    noExternal: ['framer-motion', 'lucide-react', 'react-helmet-async']
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
    reportCompressedSize: false,
  },
})
