import { Link } from 'react-router'

/* Pie de página: igual en todas las páginas, por eso es un componente. */
export function Footer() {
  return (
    <footer className="pie pt-5 pb-4 mt-5">
      <div className="container">
        <div className="row g-4">
          <div className="col-md-4">
            <h5><i className="bi bi-hammer"></i> Ferretería Los Maestros</h5>
            <p className="small">Materiales, herramientas y ferretería general.<br />La Serena, Región de Coquimbo.</p>
            <p className="small mb-0"><i className="bi bi-credit-card"></i> Visa · Mastercard · Amex · Débito</p>
          </div>
          <div className="col-md-4">
            <h6>Enlaces</h6>
            <ul className="list-unstyled small">
              <li><Link to="/productos">Productos</Link></li>
              <li><Link to="/nosotros">Nosotros</Link></li>
              <li><Link to="/blogs">Blogs</Link></li>
              <li><Link to="/contacto">Contacto</Link></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h6>Suscríbete a nuestro boletín</h6>
            <div className="input-group">
              <input type="email" className="form-control" placeholder="Tu correo" aria-label="Tu correo" />
              <button className="btn btn-marca">Suscribir</button>
            </div>
          </div>
        </div>
        <hr className="border-secondary" />
        <p className="text-center small mb-0">© 2026 Ferretería Los Maestros — Proyecto académico DSY1104</p>
      </div>
    </footer>
  )
}
