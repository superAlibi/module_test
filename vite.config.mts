/// <reference types="vitest" />
import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
export default defineConfig({
  plugins: [
    dts({
      outDir: 'dist/types',
      include: ['src/**/*.ts'],
      exclude: ['src/**/*.test.ts']
    })
  ],
  server: {
    host: true
  },
  build: {
    watch: {
      include: ['src/**/*.ts'],
      exclude: ['src/**/*.test.ts']
    },
    lib: {
      entry: resolve(__dirname, './src/mod.ts'),
      name: 'module_test',
      fileName: 'module_test',
      formats: ['es', 'cjs', 'iife']
    }
  },
  test: {
    watch: true
  }
})