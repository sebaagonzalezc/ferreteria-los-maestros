import { Link } from 'react-router'

/* Home de la tienda: banner principal + productos destacados. */
export function Inicio() {
  return (
    <>
      {/* HERO / banner principal */}
      <section className="hero mb-5">
        <div className="row align-items-center">
          <div className="col-lg-7">
            <h1 className="mb-3">Todo para tu obra, en un solo lugar</h1>
            <p className="lead mb-4">
              Materiales de construcción, herramientas eléctricas y manuales, gasfitería,
              electricidad y más. 22 años sirviendo a maestros y particulares en La Serena.
            </p>
            <Link to="/productos" className="btn btn-marca btn-lg">
              <i className="bi bi-box-seam"></i> Ver productos
            </Link>
          </div>
          <div className="col-lg-5 text-center d-none d-lg-block">
            <i className="bi bi-tools" style={{ fontSize: '9rem', color: '#f7b500' }}></i>
          </div>
        </div>
      </section>

      {/* PRODUCTOS DESTACADOS */}
      <section>
        <h2 className="titulo-seccion">Productos destacados</h2>
        {/* Siguiente paso: aquí se dibujan las tarjetas con .map() */}
        <div className="row g-3"></div>
        <div className="text-center mt-4">
          <Link to="/productos" className="btn btn-outline-dark">
            Ver todo el catálogo <i className="bi bi-arrow-right"></i>
          </Link>
        </div>
      </section>
    </>
  )
}
