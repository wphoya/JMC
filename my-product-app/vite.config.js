import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // 👈 올바른 패키지명으로 수정됨
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev
export default defineConfig({
  plugins: [react(), tailwindcss()],
})