import { useState } from 'react'
import { Link, Navigate, NavLink, Outlet } from 'react-router'
import './admin.css'

/* Molde del PANEL DE ADMINISTRACIÓN (sidebar + contenido).
   - PROTECCIÓN: si no hay sesión de administrador o vendedor, redirige
     al login con <Navigate>. Así nadie entra escribiendo /admin en la URL.
   - PERMISOS: el vendedor no ve "Usuarios".
   - <Outlet /> = el hueco donde va la página hija (Dashboard, Productos...). */
export function AdminLayout({ sesion, onCerrarSesion }) {
  // Estado del menú lateral en celular (abierto/cerrado).
  const [menuAbierto, setMenuAbierto] = useState(false)

  if (!sesion || (sesion.rol !== 'administrador' && sesion.rol !== 'vendedor')) {
    return <Navigate to="/login" replace />
  }

  const esAdmin = sesion.rol === 'administrador'
  const cerrarMenu = () => setMenuAbierto(false)

  return (
    <div className={`admin-layout ${menuAbierto ? 'sidebar-abierto' : ''}`}>
      <aside className="sidebar">
        <div className="marca"><i className="bi bi-hammer"></i> Los Maestros</div>
        <nav className="nav flex-column">
          <div className="seccion-titulo">General</div>
          <NavLink className="nav-link" to="/admin" end onClick={cerrarMenu}>
            <i className="bi bi-speedometer2"></i> Dashboard
          </NavLink>
          <div className="seccion-titulo">Gestión</div>
          <NavLink className="nav-link" to="/admin/productos" onClick={cerrarMenu}>
            <i className="bi bi-box-seam"></i> Productos
          </NavLink>
          {esAdmin && (
            <NavLink className="nav-link" to="/admin/usuarios" onClick={cerrarMenu}>
              <i className="bi bi-people"></i> Usuarios
            </NavLink>
          )}
        </nav>
        <div className="pie-sidebar">
          <div><i className="bi bi-person-circle"></i> {sesion.nombre}</div>
          <small className="text-capitalize text-secondary">{sesion.rol}</small>
          <button className="btn btn-sm btn-outline-light w-100 mt-2" onClick={onCerrarSesion}>
            <i className="bi bi-box-arrow-right"></i> Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Fondo oscuro detrás del menú en celular: al tocarlo se cierra */}
      <div className="sidebar-fondo" onClick={cerrarMenu}></div>

      <div className="admin-contenido">
        <div className="d-flex justify-content-between align-items-center mb-3">
          {/* d-md-none: el botón solo se ve en pantallas chicas (bajo 768px) */}
          <button
            className="btn btn-dark d-md-none"
            onClick={() => setMenuAbierto(true)}
            aria-label="Abrir menú"
          >
            <i className="bi bi-list"></i>
          </button>
          <Link to="/" className="btn btn-outline-secondary btn-sm ms-auto">
            <i className="bi bi-shop"></i> Ver tienda
          </Link>
        </div>
        <Outlet />
      </div>
    </div>
  )
}

/* Envuelve páginas que solo puede ver el ADMINISTRADOR (no el vendedor).
   "children" es lo que va entre <SoloAdmin> y </SoloAdmin>. */
export function SoloAdmin({ sesion, children }) {
  if (sesion?.rol !== 'administrador') {
    return <Navigate to="/admin" replace />
  }
  return children
}
