import { Link, useParams } from 'react-router'

/* Detalle de un producto.
   En la entrega 1 el código venía en la URL como ?codigo=MC001.
   Ahora es parte de la ruta: /producto/MC001, y lo leemos con useParams().
   Siguiente paso: buscar el producto en los datos y mostrarlo. */
export function DetalleProducto() {
  const { codigo } = useParams()

  return (
    <>
      <nav aria-label="ruta" className="mb-3">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
          <li className="breadcrumb-item"><Link to="/productos">Productos</Link></li>
          <li className="breadcrumb-item active">{codigo}</li>
        </ol>
      </nav>
      <p className="text-muted">Detalle del producto {codigo} (en construcción).</p>

      <section className="mt-5">
        <h2 className="titulo-seccion">Productos relacionados</h2>
        <div className="row g-3"></div>
      </section>
    </>
  )
}
