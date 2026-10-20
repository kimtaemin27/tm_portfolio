import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// GitHub Pages 프로젝트 페이지 주소: https://kimtaemin27.github.io/tm_portfolio/
export default defineConfig({
  base: '/tm_portfolio/',
  plugins: [react()],
})
