import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

import fs from 'node:fs';
import path from 'node:path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  ssgOptions: {
    formatting: 'minify',
    onFinished() {
      const distDir = path.resolve(process.cwd(), 'dist');
      const cssFilePath = path.join(distDir, 'assets', 'index.css');
      
      if (!fs.existsSync(cssFilePath)) {
        console.warn('CSS file not found for inlining:', cssFilePath);
        return;
      }

      const cssContent = fs.readFileSync(cssFilePath, 'utf8');
      const htmlFiles = fs.readdirSync(distDir).filter(file => file.endsWith('.html'));

      for (const file of htmlFiles) {
        const filePath = path.join(distDir, file);
        let html = fs.readFileSync(filePath, 'utf8');
        
        // Remove existing link tag for index.css
        html = html.replace(/<link rel="stylesheet"[^>]*?href="\/assets\/index\.css"[^>]*?>/i, '');
        
        // Inject styles into head
        html = html.replace('</head>', `<style id="critical-css">${cssContent}</style>\n</head>`);
        
        fs.writeFileSync(filePath, html, 'utf8');
      }
      
      console.log(`Inlined CSS into ${htmlFiles.length} HTML files.`);
    }
  },
  ssr: {
    noExternal: ['framer-motion', 'lucide-react', 'react-helmet-async']
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
    cssMinify: true,
    reportCompressedSize: false,
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'assets/index.css';
          }
          return 'assets/[name]-[hash].[ext]';
        },
        manualChunks(id) {
          if (!id.includes('node_modules')) {
            return
          }

          // Group core UI/Animation libraries to reduce the number of initial requests
          if (
            id.includes('framer-motion') ||
            id.includes('lucide-react') ||
            id.includes('react-helmet-async')
          ) {
            return 'vendor-ui'
          }

          if (id.includes('react') || id.includes('scheduler') || id.includes('react-router')) {
            return 'vendor-core'
          }
        },
      },
    },
  },
})
