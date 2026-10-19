import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Relative asset paths: the build works from any GitHub Pages path
// (routes live in the hash, so the page itself is always the root document)
export default defineConfig({
  base: './',
  plugins: [react()],
});
