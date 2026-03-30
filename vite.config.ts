import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

import { cloudflare } from "@cloudflare/vite-plugin";

// Plugin to inline CSS and eliminate the render-blocking external request
const inlineCSSPlugin = () => ({
  name: 'inline-css',
  enforce: 'post' as const,
  transformIndexHtml: {
    order: 'post' as const,
    handler(html: string, ctx: any) {
      if (!ctx.bundle) return html;
      const cssFileName = Object.keys(ctx.bundle).find(name => name.endsWith('.css'));
      if (cssFileName) {
        const cssChunk = ctx.bundle[cssFileName];
        const cssContent = cssChunk.type === 'asset' ? cssChunk.source : '';
        // Remove the CSS link tag
        html = html.replace(new RegExp(`<link rel="stylesheet"[^>]*?href="/?${cssFileName}"[^>]*?>`, 'i'), '');
        // Inject styles directly into head
        html = html.replace('</head>', `<style id="critical-css">${cssContent}</style>\n</head>`);
      }
      return html;
    }
  }
});

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    cloudflare(),
    inlineCSSPlugin(),
  ],
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

          if (id.includes('react-router-dom')) {
            return 'router'
          }

          if (id.includes('framer-motion')) {
            return 'motion'
          }

          if (id.includes('lucide-react')) {
            return 'icons'
          }

          if (id.includes('react') || id.includes('scheduler')) {
            return 'react-vendor'
          }

          if (id.includes('react-helmet-async')) {
            return 'seo'
          }
        },
      },
    },
  },
})