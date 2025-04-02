import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import Inspect from 'vite-plugin-inspect';

export default defineConfig({
  plugins: [
    react(),
    Inspect({
      build: true,
      outputDir: '.vite-inspect',
    }),
  ],
  build: {
    target: 'esnext', // Ou 'es2022' si 'esnext' pose des problèmes
  },
  ssr: {
    noExternal: ["react-helmet-async", "react-toastify", "slick-carousel"],
  },
});
