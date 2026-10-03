import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Configuracion de Vite
// base: './' hace que las rutas sean relativas, necesario para que
// el proyecto funcione publicado en GitHub Pages (gh-pages)
export default defineConfig({
  plugins: [react()],
  base: './'
})
