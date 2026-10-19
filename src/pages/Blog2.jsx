import { Link } from 'react-router'

/* Detalle del blog #2. */
export function Blog2() {
  return (
    <>
      <nav aria-label="ruta" className="mb-3">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/blogs">Blogs</Link></li>
          <li className="breadcrumb-item active">Caso curioso #2</li>
        </ol>
      </nav>

      <article className="row justify-content-center">
        <div className="col-lg-8">
          <h1 className="fw-bold">Herramientas que duran toda la vida</h1>
          <p className="text-muted">Publicado el 5 de septiembre de 2026 · Ferretería Los Maestros</p>
          <div className="blog-img mb-4 rounded"><i className="bi bi-tools"></i></div>

          <p className="lead">Una buena herramienta manual puede acompañarte 30 años o más. El secreto no es solo la marca: es el <strong>cuidado</strong>.</p>

          <h2 className="h4 mt-4">Cómo elegir</h2>
          <p>Busca mangos firmes, acero de buena calidad y un peso que se sienta cómodo en tu mano. Marcas como <strong>Stanley</strong> y <strong>Bahco</strong> son un clásico entre los maestros por su durabilidad.</p>

          <h2 className="h4 mt-4">Cómo cuidarlas</h2>
          <ul>
            <li>Límpialas y sécalas después de usarlas para evitar el óxido.</li>
            <li>Guárdalas en un lugar seco, idealmente colgadas.</li>
            <li>Aplica una gota de aceite a las partes metálicas de vez en cuando.</li>
            <li>Usa cada herramienta para lo que fue diseñada (no uses el alicate de martillo 😉).</li>
          </ul>

          <p>Revisa nuestra sección de herramientas manuales y eléctricas: tenemos desde martillos hasta taladros percutores.</p>

          <Link to="/productos" className="btn btn-marca mt-2"><i className="bi bi-tools"></i> Ver herramientas</Link>
        </div>
      </article>
    </>
  )
}
