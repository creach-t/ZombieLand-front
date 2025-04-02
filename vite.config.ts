import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
  ],
  build: {
    target: 'esnext', // Ou 'es2022' si 'esnext' pose des problèmes
  },
  ssr: {
    noExternal: ["react-helmet-async", "react-toastify", "slick-carousel"],
  },
});
