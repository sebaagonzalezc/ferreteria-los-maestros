import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'

// 1) Bootstrap (CSS + JS para el menú colapsable) e íconos, instalados con npm.
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
// 2) Nuestros estilos DESPUÉS de Bootstrap, para poder sobrescribirlo (cascada).
import './index.css'
// 3) La app al final: así el CSS que importan sus componentes (ej. admin.css)
//    también queda después de Bootstrap.
import { App } from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
