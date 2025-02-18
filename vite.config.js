import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  build: {
    lib: {
      entry: ['src/lib.js'],
      name: 'vxVue',
      fileName: format => `vxvue.${format}.js`,
      cssFileName: 'style',
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
      vueDevTools()
  ],
})
