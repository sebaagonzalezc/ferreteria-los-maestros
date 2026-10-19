import { Link, NavLink } from 'react-router'

/* Barra de navegación de la tienda.
   NavLink (en vez de <a href>) cambia de página SIN recargar, y le pone
   sola la clase "active" al enlace de la página actual.
   Prop cantidadCarrito: el número que se muestra en el globito del carrito
   (el estado del carrito vive en App y llega aquí por props). */
export function Header({ cantidadCarrito }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-marca fixed-top">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <i className="bi bi-hammer"></i> Ferretería Los Maestros
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#menu"
          aria-controls="menu"
          aria-expanded="false"
          aria-label="Abrir menú"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="menu">
          <ul className="navbar-nav me-auto">
            <li className="nav-item"><NavLink className="nav-link" to="/" end>Home</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/productos">Productos</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/nosotros">Nosotros</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/blogs">Blogs</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/contacto">Contacto</NavLink></li>
          </ul>
          <div className="d-flex align-items-center gap-3">
            {/* Paso del carrito/sesión: aquí se mostrará "Hola, nombre" si hay sesión */}
            <div className="d-flex align-items-center text-white small">
              <Link to="/login" className="btn btn-outline-light btn-sm me-2">Iniciar sesión</Link>
              <Link to="/registro" className="btn btn-light btn-sm fw-semibold">Registrarse</Link>
            </div>
            <Link to="/carrito" className="btn btn-outline-light position-relative" aria-label="Ver carrito">
              <i className="bi bi-cart"></i>
              <span
                className="badge rounded-pill bg-danger"
                style={{ position: 'absolute', top: '-8px', right: '-8px' }}
                data-testid="contador-carrito"
              >
                {cantidadCarrito}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
