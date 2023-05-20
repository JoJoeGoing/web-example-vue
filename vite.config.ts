import { fileURLToPath, URL } from 'node:url'

import {defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueSetupExtend from 'vite-plugin-vue-setup-extend-plus';
import viteCompression from 'vite-plugin-compression';

const viteConfig = defineConfig(({ mode }) =>{
  const env = loadEnv(mode, process.cwd(), '') as ImportMetaEnv

  return {
    base: env.VITE_PATH,
    plugins: [vue(), vueSetupExtend(), viteCompression({
      verbose: true,
      disable: false,
      threshold: 1024 * 10,
      algorithm: 'gzip',
      ext: '.gz'
    })],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      host: '0.0.0.0',
      port: env.VITE_PORT,
      open: env.VITE_OPEN,
      hmr: true
    },
    build: {
      outDir: 'dist',
      //minify:'terser',
      chunkSizeWarningLimit: 1500,
      // terserOptions:{
      //   compress:{
      //     drop_console: true,
      //     drop_debugger:true
      //   }
      // },
      rollupOptions: {
        output: {
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return id.toString().match(/\/node_modules\/(?!.pnpm)(?<moduleName>[^\/]*)\//)?.groups!.moduleName ?? 'vender';
            }
          },
        }
      },
    },
    css: { preprocessorOptions: { css: { charset: false } } },
    define:{}

  }
})
export default viteConfig
