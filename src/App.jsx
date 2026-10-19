import { useCallback, useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router'
import { Header } from './components/Header.jsx'
import { Footer } from './components/Footer.jsx'
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

/* App es el "molde" de toda la tienda y GUARDA EL ESTADO compartido:
   el carrito y la sesión. ¿Por qué aquí? Porque lo necesitan varios
   componentes a la vez:
     - el Header (contador del carrito y "Hola, nombre")
     - las páginas que agregan productos (Inicio, Productos, Detalle)
     - la página del Carrito y la de Login
   El estado vive en el "padre común" y baja a cada hijo por PROPS. */
export function App() {
  const navegar = useNavigate()
  // Estado del carrito. leerCarrito trae lo guardado en localStorage (solo al inicio).
  const [carrito, setCarrito] = useState(leerCarrito)
  // Usuario logeado ({ correo, nombre, rol }) o null si no hay sesión.
  const [sesion, setSesion] = useState(leerSesion)
  // Texto del aviso flotante ("" = sin aviso).
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
    navegar('/')
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
      <Header cantidadCarrito={contarItems(carrito)} sesion={sesion} onCerrarSesion={cerrarSesion} />
      <main className="container my-4">
        <Routes>
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
        </Routes>
      </main>
      <Footer />
      <Aviso mensaje={aviso} onCerrar={cerrarAviso} />
    </>
  )
}
