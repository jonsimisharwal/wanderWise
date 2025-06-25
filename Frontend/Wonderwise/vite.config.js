import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5173', // Your actual backend server
        changeOrigin: true,
        secure: false
      }
    }
  },
  plugins: [react()],
})
