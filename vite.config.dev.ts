import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env.NODE_ENV': '"development"'
  },
  build: {
    lib: {
      entry: 'src/main.ts',
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      // Externalize deps that shouldn't be bundled into the library.
      // external: ['vue', '@vueuse/core'],
    },
    sourcemap: false,
    // Reduce bloat from legacy polyfills.
    target: 'esnext',
    // Leave minification up to applications.
    minify: false,
  },
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
