import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/lib.js'),
      name: 'vxVue',
      fileName: format => `vxvue.${format}.js`,
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  resolve: {
  },
  plugins: [
      vue(),
      tailwindcss(),
      vueDevTools()
  ],
})
