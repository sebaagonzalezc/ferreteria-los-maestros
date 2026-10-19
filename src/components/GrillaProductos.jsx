import { TarjetaProducto } from './TarjetaProducto.jsx'

/* Dibuja una lista de productos como grilla de tarjetas.
   Se reutiliza en Inicio, Productos y en "relacionados" del detalle. */
export function GrillaProductos({ productos, onAgregar }) {
  // Renderizado condicional: si la lista viene vacía, mostramos un aviso.
  if (productos.length === 0) {
    return (
      <div className="row g-3">
        <div className="col-12 text-center text-muted py-5">
          <i className="bi bi-search fs-1"></i>
          <p className="mt-2">No se encontraron productos.</p>
        </div>
      </div>
    )
  }

  // map: por cada producto, una TarjetaProducto. key = código (único).
  return (
    <div className="row g-3">
      {productos.map((producto) => (
        <TarjetaProducto key={producto.codigo} producto={producto} onAgregar={onAgregar} />
      ))}
    </div>
  )
}
