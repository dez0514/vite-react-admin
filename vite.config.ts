import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react-swc'
import reactRefresh from '@vitejs/plugin-react-refresh'
import path from 'path';
import svgr from '@svgr/rollup';
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/react-admin/',
  plugins: [
    reactRefresh(),
    // react(),
    svgr()
  ],
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
  resolve: {
    alias:{
      "@":path.resolve(__dirname,'./src')//配置@别名
    }
  }
})
