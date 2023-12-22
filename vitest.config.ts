/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    setupFiles: ["./vitest.setup.ts"],
    globals: true,
    environment: 'jsdom',
    deps: {
      inline: ["vitest-canvas-mock"],
    },
    environmentOptions: {
      jsdom: {
        resources: 'usable',
      },
    },
    coverage: {
      include: ["src/**"],
      exclude: ["src/app/libs/wasm_exec.js"],
    }
  },
  resolve: {
    alias: {
      '@': __dirname + '/src',
    },
  },
})
