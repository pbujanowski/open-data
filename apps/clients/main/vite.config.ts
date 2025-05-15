/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext',
    minify: false,
    sourcemap: true,
    outDir: 'dist',
  },
  server: {
    port: 3000,
  },
});
