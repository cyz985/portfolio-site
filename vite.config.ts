import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  // GitHub Pages 项目站点位于 /portfolio-site/ 子路径，构建时需要设置 base
  base: command === 'build' ? '/portfolio-site/' : '/',
  plugins: [react(), tailwindcss()],
}))
