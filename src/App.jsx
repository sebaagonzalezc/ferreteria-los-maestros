import { useCallback, useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router'
import { LayoutTienda } from './components/LayoutTienda.jsx'
import { Aviso } from './components/Aviso.jsx'
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
import { AdminLayout, SoloAdmin } from './pages/admin/AdminLayout.jsx'
import { AdminDashboard } from './pages/admin/AdminDashboard.jsx'
import { AdminProductos } from './pages/admin/AdminProductos.jsx'
import { FormularioProducto } from './pages/admin/FormularioProducto.jsx'
import { AdminUsuarios } from './pages/admin/AdminUsuarios.jsx'
import { FormularioUsuario } from './pages/admin/FormularioUsuario.jsx'
import { buscarProducto } from './data/productos.js'
import {
  agregarItem,
  cambiarCantidadItem,
  contarItems,
  guardarCarrito,
  leerCarrito,
  quitarItem,
} from './utils/carrito.js'
import { borrarSesion, guardarSesion, leerSesion } from './utils/sesion.js'

/* App GUARDA EL ESTADO compartido (carrito y sesión) y define las rutas.
   ¿Por qué el estado aquí? Porque lo necesitan varios componentes a la vez:
     - el Header (contador del carrito y "Hola, nombre")
     - las páginas que agregan productos (Inicio, Productos, Detalle)
     - el Carrito, el Login y el panel admin (para proteger por rol)
   El estado vive en el "padre común" y baja a cada hijo por PROPS.

   Rutas ANIDADAS: hay dos "moldes" (layouts):
     - LayoutTienda: header + página + footer   -> rutas de la tienda
     - AdminLayout:  sidebar + página            -> rutas /admin/...
   Cada layout dibuja a su ruta hija dentro de <Outlet />. */
export function App() {
  const navegar = useNavigate()
  const [carrito, setCarrito] = useState(leerCarrito)
  const [sesion, setSesion] = useState(leerSesion)
  const [aviso, setAviso] = useState('')

  // Cada vez que el carrito cambia, lo guardamos en localStorage.
  useEffect(() => {
    guardarCarrito(carrito)
  }, [carrito])

  function agregarAlCarrito(codigo, cantidad = 1) {
    setCarrito((actual) => agregarItem(actual, codigo, cantidad))
    const producto = buscarProducto(codigo)
    setAviso(`${cantidad} x ${producto ? producto.nombre : 'Producto'} añadido al carrito`)
  }

  function cambiarCantidad(codigo, cantidad) {
    setCarrito((actual) => cambiarCantidadItem(actual, codigo, cantidad))
  }

  function eliminarDelCarrito(codigo) {
    setCarrito((actual) => quitarItem(actual, codigo))
  }

  function vaciarCarrito() {
    setCarrito([])
  }

  function iniciarSesion(usuario) {
    guardarSesion(usuario)
    setSesion(usuario)
    setAviso(`¡Bienvenido/a, ${usuario.nombre}!`)
    // Según el rol: el personal va al panel; el cliente, a la tienda.
    navegar(usuario.rol === 'cliente' ? '/' : '/admin')
  }

  function cerrarSesion() {
    borrarSesion()
    setSesion(null)
    navegar('/')
  }

  // useCallback mantiene la MISMA función entre renders, para que el
  // temporizador del Aviso no se reinicie cada vez que App se redibuja.
  const cerrarAviso = useCallback(() => setAviso(''), [])

  return (
    <>
      <Routes>
        {/* ---------- TIENDA ---------- */}
        <Route
          element={
            <LayoutTienda cantidadCarrito={contarItems(carrito)} sesion={sesion} onCerrarSesion={cerrarSesion} />
          }
        >
          <Route path="/" element={<Inicio onAgregar={agregarAlCarrito} />} />
          <Route path="/productos" element={<Productos onAgregar={agregarAlCarrito} />} />
          <Route path="/producto/:codigo" element={<DetalleProducto onAgregar={agregarAlCarrito} />} />
          <Route
            path="/carrito"
            element={
              <Carrito
                carrito={carrito}
                onCambiarCantidad={cambiarCantidad}
                onEliminar={eliminarDelCarrito}
                onVaciar={vaciarCarrito}
              />
            }
          />
          <Route path="/login" element={<Login onIniciarSesion={iniciarSesion} />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/1" element={<Blog1 />} />
          <Route path="/blogs/2" element={<Blog2 />} />
          <Route path="/contacto" element={<Contacto />} />
          {/* "*" = cualquier otra URL que no esté arriba */}
          <Route path="*" element={<NoEncontrado />} />
        </Route>

        {/* ---------- PANEL ADMIN (protegido por rol en AdminLayout) ---------- */}
        <Route path="/admin" element={<AdminLayout sesion={sesion} onCerrarSesion={cerrarSesion} />}>
          <Route index element={<AdminDashboard sesion={sesion} />} />
          <Route path="productos" element={<AdminProductos />} />
          <Route path="productos/nuevo" element={<FormularioProducto key="nuevo" />} />
          <Route path="productos/:codigo/editar" element={<FormularioProducto key="editar" />} />
          <Route path="usuarios" element={<SoloAdmin sesion={sesion}><AdminUsuarios sesion={sesion} /></SoloAdmin>} />
          <Route path="usuarios/nuevo" element={<SoloAdmin sesion={sesion}><FormularioUsuario key="nuevo" /></SoloAdmin>} />
          <Route path="usuarios/:correo/editar" element={<SoloAdmin sesion={sesion}><FormularioUsuario key="editar" /></SoloAdmin>} />
        </Route>
      </Routes>
      <Aviso mensaje={aviso} onCerrar={cerrarAviso} />
    </>
  )
}
