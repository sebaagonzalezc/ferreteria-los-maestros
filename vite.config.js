import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    // jsdom simula el navegador (document, window, localStorage) dentro de Node.
    environment: 'jsdom',
    // globals: true hace que Testing Library limpie el DOM después de cada test.
    // Sin esto, lo dibujado en un test queda "pegado" en el siguiente.
    globals: true,
    // Archivo que corre antes de los tests: agrega los matchers de jest-dom
    // (toBeInTheDocument, toHaveValue, toHaveTextContent...).
    setupFiles: './src/setupTests.js',
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{js,jsx}'],
      exclude: ['src/main.jsx', 'src/setupTests.js', 'src/tests/**'],
    },
  },
})
