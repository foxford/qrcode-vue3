import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dts({ rollupTypes: true }),
  ],
  build: {
    lib: {
      name: 'QRCodeVue3',
      entry: resolve(__dirname, './src/index.ts'),
      fileName: format => `qr-code-vue3.${format}.js`,
    },
    emptyOutDir: true,
    rollupOptions: {
      external: [
        'vue',
      ],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
})
