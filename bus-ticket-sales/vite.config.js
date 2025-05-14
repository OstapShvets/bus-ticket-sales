// vite.config.js (у корені)
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(async () => {
  // динамічно імпортуємо ESM-версію плагіна
  const { viteStaticCopy } = await import('vite-plugin-static-copy')

  return {
    plugins: [
      react(),
      viteStaticCopy({
        targets: [
          {
            src: 'src/assets/fonts/*.ttf', // ваші ttf-шрифти
            dest: 'fonts'                  // потраплять у dist/fonts/
          }
        ]
      })
    ],
    resolve: {
      alias: { '@': '/src' }
    },
    server: {
      port: 5173
    }
  }
})
