import { defineConfig } from 'vite';

export default defineConfig({
  base: '/website/',
  root: '.',
  build: {
    outDir: 'docs'
  }
});
