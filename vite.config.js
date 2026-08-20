import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  server: {
    port: process.env.PORT ? parseInt(process.env.PORT) : 3200,
    strictPort: false,
    open: false,
    fs: {
      // allow project dir so flag-icons SVGs in node_modules are served
      allow: [__dirname],
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
