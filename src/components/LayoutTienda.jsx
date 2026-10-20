import { Outlet } from 'react-router'
import { Header } from './Header.jsx'
import { Footer } from './Footer.jsx'

/* Molde de la TIENDA: Header + página actual + Footer.
   <Outlet /> es el "hueco" donde React Router pone la página de la ruta
   hija que coincide con la URL (Inicio, Productos, Carrito...).
   El panel admin usa otro molde (AdminLayout), sin este header ni footer. */
export function LayoutTienda({ cantidadCarrito, sesion, onCerrarSesion }) {
  return (
    <div className="tienda">
      <Header cantidadCarrito={cantidadCarrito} sesion={sesion} onCerrarSesion={onCerrarSesion} />
      <main className="container my-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
