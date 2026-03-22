import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // 1. جيب Tailwind

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // 2. زيدو هنا في الـ Plugins
  ],
})