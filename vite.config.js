import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/Place-for-you-spotly-/', // Ensure the correct repo name
  plugins: [react()],
})
