import { Link } from 'react-router'

/* Detalle del blog #1. */
export function Blog1() {
  return (
    <>
      <nav aria-label="ruta" className="mb-3">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/blogs">Blogs</Link></li>
          <li className="breadcrumb-item active">Caso curioso #1</li>
        </ol>
      </nav>

      <article className="row justify-content-center">
        <div className="col-lg-8">
          <h1 className="fw-bold">El cemento que "respira"</h1>
          <p className="text-muted">Publicado el 1 de septiembre de 2026 · Ferretería Los Maestros</p>
          <div className="blog-img mb-4 rounded"><i className="bi bi-lightbulb"></i></div>

          <p className="lead">Muchos creen que el cemento "seca". En realidad, no se seca: <strong>fragua</strong>, que es una reacción química con el agua llamada hidratación.</p>

          <p>Durante esa reacción, el cemento sigue endureciendo y ganando resistencia durante <strong>semanas, meses e incluso años</strong>. Por eso, mantener el hormigón húmedo los primeros días (lo que se llama "curado") es tan importante: si el agua se evapora demasiado rápido, la reacción se detiene y el material queda más débil.</p>

          <h2 className="h4 mt-4">Consejos prácticos</h2>
          <ul>
            <li>Riega o cubre el hormigón fresco durante los primeros 7 días.</li>
            <li>Evita vaciar hormigón en las horas de más calor y viento.</li>
            <li>Usa el cemento adecuado para cada trabajo (gris para estructura, blanco para terminaciones).</li>
          </ul>

          <p>En nuestra tienda encuentras cemento <strong>Polpaico</strong> y <strong>Melón</strong>, además de morteros y aditivos para que tu obra quede firme.</p>

          <Link to="/productos" className="btn btn-marca mt-2"><i className="bi bi-box-seam"></i> Ver cementos y morteros</Link>
        </div>
      </article>
    </>
  )
}
