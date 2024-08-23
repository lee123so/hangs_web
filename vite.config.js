import { fileURLToPath, URL } from 'node:url'
import pluginRewriteAll from 'vite-plugin-rewrite-all';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),pluginRewriteAll()],
  build: {
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  resolve: {
    alias: {
      '@':fileURLToPath(new URL('./src', import.meta.url))
      // '@': fileURLToPath(new URL('./src', import.meta.url)),
    }
  }
})
