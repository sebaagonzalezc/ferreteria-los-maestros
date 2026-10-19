/* Sobre la empresa. Página 100% estática. */
export function Nosotros() {
  return (
    <>
      <h1 className="titulo-seccion">Sobre nosotros</h1>

      <div className="row align-items-center g-4 mb-5">
        <div className="col-md-7">
          <p className="fs-5">
            <strong>Ferretería Los Maestros</strong> es un negocio familiar ubicado en{' '}
            <strong>La Serena, Región de Coquimbo</strong>, con <strong>22 años de trayectoria</strong>.
            Es atendido por el dueño, su hijo y dos empleados de planta.
          </p>
          <p>
            Vendemos materiales de construcción, herramientas eléctricas y manuales,
            gasfitería, electricidad y artículos de ferretería general. Nuestro catálogo
            supera las <strong>800 referencias</strong>.
          </p>
          <p>
            Nuestros principales clientes son <strong>particulares</strong> que compran para
            sus hogares y <strong>contratistas y maestros de obra</strong> que compran con
            mayor frecuencia y en volúmenes más grandes.
          </p>
        </div>
        <div className="col-md-5 text-center">
          <i className="bi bi-shop" style={{ fontSize: '8rem', color: '#e8590c' }}></i>
        </div>
      </div>

      {/* Misión / Visión / Valores en tarjetas */}
      <div className="row g-4 mb-5">
        <div className="col-md-4">
          <div className="card h-100 shadow-sm text-center p-3">
            <div className="card-body">
              <i className="bi bi-bullseye fs-1 text-primary mb-2"></i>
              <h3 className="h5">Misión</h3>
              <p className="small">Entregar materiales y herramientas de calidad con atención cercana y honesta a cada cliente.</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card h-100 shadow-sm text-center p-3">
            <div className="card-body">
              <i className="bi bi-eye fs-1 text-primary mb-2"></i>
              <h3 className="h5">Visión</h3>
              <p className="small">Ser la ferretería de referencia de la Región de Coquimbo, modernizando nuestra atención con tecnología.</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card h-100 shadow-sm text-center p-3">
            <div className="card-body">
              <i className="bi bi-heart fs-1 text-primary mb-2"></i>
              <h3 className="h5">Valores</h3>
              <p className="small">Cercanía, confianza, compromiso con el maestro y el vecino, y respeto por el trabajo bien hecho.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Equipo de desarrollo */}
      <h2 className="titulo-seccion">Equipo de desarrollo</h2>
      <p className="text-muted">Estudiantes de DSY1104 – Desarrollo FullStack II, DuocUC.</p>
      <div className="row g-3 justify-content-center">
        <div className="col-sm-8 col-md-5 col-lg-4">
          <div className="card text-center shadow-sm p-4">
            <i className="bi bi-person-circle fs-1 text-secondary"></i>
            <h4 className="h5 mt-2 mb-0">Sebastián González</h4>
            <small className="text-muted">Desarrollo Full-Stack (Frontend, CSS, JavaScript, Git)</small>
          </div>
        </div>
      </div>
    </>
  )
}
