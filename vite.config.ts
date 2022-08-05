import { defineConfig } from 'vite'
import { vitePluginForArco } from '@arco-plugins/vite-react'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
const options = {
  modifyVars: { 'arcoblue-6': '#0f9d58', style: true },
}
export default defineConfig({
  plugins: [react(), vitePluginForArco(options)],
})
