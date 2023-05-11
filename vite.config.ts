/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import checker from 'vite-plugin-checker';
import istanbul from 'vite-plugin-istanbul';

export default defineConfig({
  base: './',
  plugins: [
    react(),
    checker({
      typescript: true,
    }),
    istanbul({
      cypress: true,
      requireEnv: false,
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
  },
  build: {
    sourcemap: true,
  },
});
