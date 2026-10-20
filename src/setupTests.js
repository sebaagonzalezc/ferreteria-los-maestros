/* Se ejecuta antes de cada archivo de test (ver setupFiles en vite.config.js).
   Agrega a expect los matchers de jest-dom para el DOM:
   toBeInTheDocument, toHaveValue, toHaveTextContent, toHaveClass, etc. */
import '@testing-library/jest-dom/vitest'
import { afterEach } from 'vitest'

/* Cada test parte con localStorage vacío (carrito, sesión, productos y
   usuarios), para que un test no afecte a otro. */
afterEach(() => {
  localStorage.clear()
})
