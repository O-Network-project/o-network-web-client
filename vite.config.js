// Default exports are forbidden in this project, but Vite requires one to work
// properly
/* eslint-disable import/no-default-export */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
