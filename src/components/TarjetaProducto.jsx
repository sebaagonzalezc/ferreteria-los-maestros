import { Link } from 'react-router'
import { ImagenProducto } from './ImagenProducto.jsx'
import { formatearPrecio } from '../utils/formato.js'
import { esStockCritico } from '../data/productos.js'

/* Tarjeta de UN producto. Recibe por props:
   - producto:  el objeto con los datos a mostrar
   - onAgregar: la función que se ejecuta al apretar "Añadir"
   El componente no sabe CÓMO funciona el carrito; solo avisa "agrégame". */
export function TarjetaProducto({ producto, onAgregar }) {
  const rutaDetalle = `/producto/${producto.codigo}`

  return (
    <div className="col-6 col-md-4 col-lg-3">
      <div className="card card-producto shadow-sm">
        <Link to={rutaDetalle} className="text-decoration-none">
          <ImagenProducto producto={producto} className="imagen-producto card-img-top" />
        </Link>
        <div className="card-body d-flex flex-column">
          <small className="text-muted">{producto.categoria}</small>
          <h6 className="card-title">
            <Link to={rutaDetalle} className="text-dark text-decoration-none">
              {producto.nombre}
            </Link>
          </h6>
          {/* Renderizado condicional: la etiqueta solo aparece si el stock es crítico */}
          {esStockCritico(producto) && (
            <span className="badge badge-stock-critico mb-2 align-self-start">¡Últimas unidades!</span>
          )}
          <div className="mt-auto">
            <p className="precio mb-2">{formatearPrecio(producto.precio)}</p>
            <button className="btn btn-marca w-100" onClick={() => onAgregar(producto.codigo)}>
              <i className="bi bi-cart-plus"></i> Añadir
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
