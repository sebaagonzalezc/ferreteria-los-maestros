import { Link } from 'react-router'

/* Listado de blogs. */
export function Blogs() {
  return (
    <>
      <h1 className="titulo-seccion text-center">Noticias y datos curiosos</h1>

      <div className="row g-4">

        {/* BLOG 1 */}
        <div className="col-md-6">
          <article className="card blog-card h-100 shadow-sm">
            <div className="blog-img"><i className="bi bi-lightbulb"></i></div>
            <div className="card-body">
              <h2 className="h4">Caso curioso #1: El cemento que "respira"</h2>
              <p className="text-muted small">Publicado el 1 de septiembre de 2026</p>
              <p>¿Sabías que el cemento sigue ganando resistencia durante años después de fraguar? Te contamos por qué y cómo aprovecharlo en tu obra.</p>
              <Link to="/blogs/1" className="btn btn-marca">Ver caso</Link>
            </div>
          </article>
        </div>

        {/* BLOG 2 */}
        <div className="col-md-6">
          <article className="card blog-card h-100 shadow-sm">
            <div className="blog-img"><i className="bi bi-tools"></i></div>
            <div className="card-body">
              <h2 className="h4">Caso curioso #2: Herramientas que duran toda la vida</h2>
              <p className="text-muted small">Publicado el 5 de septiembre de 2026</p>
              <p>Cómo elegir y cuidar tus herramientas manuales para que te acompañen por décadas. Consejos de nuestros maestros.</p>
              <Link to="/blogs/2" className="btn btn-marca">Ver caso</Link>
            </div>
          </article>
        </div>

      </div>
    </>
  )
}
