import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import dns from 'dns';
import svgr from 'vite-plugin-svgr';
// https://vitejs.dev/config/server-options.html#server-options
dns.setDefaultResultOrder('verbatim')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
})
