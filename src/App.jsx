import { Route, Routes } from 'react-router'
import { Header } from './components/Header.jsx'
import { Footer } from './components/Footer.jsx'
import { Inicio } from './pages/Inicio.jsx'
import { Productos } from './pages/Productos.jsx'
import { DetalleProducto } from './pages/DetalleProducto.jsx'
import { Carrito } from './pages/Carrito.jsx'
import { Login } from './pages/Login.jsx'
import { Registro } from './pages/Registro.jsx'
import { Nosotros } from './pages/Nosotros.jsx'
import { Blogs } from './pages/Blogs.jsx'
import { Blog1 } from './pages/Blog1.jsx'
import { Blog2 } from './pages/Blog2.jsx'
import { Contacto } from './pages/Contacto.jsx'
import { NoEncontrado } from './pages/NoEncontrado.jsx'

/* App es el "molde" de toda la tienda:
   - Header y Footer van FUERA de <Routes>, así se ven en todas las páginas.
   - <Routes> elige UNA página según la URL. */
export function App() {
  return (
    <>
      <Header />
      <main className="container my-4">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/producto/:codigo" element={<DetalleProducto />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/1" element={<Blog1 />} />
          <Route path="/blogs/2" element={<Blog2 />} />
          <Route path="/contacto" element={<Contacto />} />
          {/* "*" = cualquier otra URL que no esté arriba */}
          <Route path="*" element={<NoEncontrado />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
