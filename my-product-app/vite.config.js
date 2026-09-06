import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // 👈 올바른 패키지명으로 수정됨
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev
export default defineConfig({
  base: "/JMC/my-product-app/", 
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist', // 결과물이 dist 폴더로 명확히 가도록 고정
  }
})