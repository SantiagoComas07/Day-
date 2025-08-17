import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // json-server
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '') // /api/tasks → /tasks
      }
    }
  }
})
