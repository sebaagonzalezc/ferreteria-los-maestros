import { useState } from 'react'
import { Link, useParams } from 'react-router'
import { ImagenProducto } from '../components/ImagenProducto.jsx'
import { GrillaProductos } from '../components/GrillaProductos.jsx'
import { buscarProducto, esStockCritico, listarProductos } from '../data/productos.js'
import { formatearPrecio } from '../utils/formato.js'

/* Detalle de un producto.
   En la entrega 1 el código venía como ?codigo=MC001.
   Ahora es parte de la ruta (/producto/MC001) y lo leemos con useParams(). */
export function DetalleProducto({ onAgregar }) {
  const { codigo } = useParams()
  const [cantidad, setCantidad] = useState(1)
  const producto = buscarProducto(codigo)

  // Código inventado o inexistente: mostramos un aviso.
  if (!producto) {
    return (
      <div className="alert alert-warning">
        Producto no encontrado. <Link to="/productos">Volver a productos</Link>.
      </div>
    )
  }

  const critico = esStockCritico(producto)
  // Relacionados: misma categoría, distinto código (máximo 4).
  const relacionados = listarProductos()
    .filter((p) => p.categoria === producto.categoria && p.codigo !== producto.codigo)
    .slice(0, 4)

  function anadir() {
    const numero = parseInt(cantidad, 10)
    onAgregar(producto.codigo, isNaN(numero) || numero < 1 ? 1 : numero)
  }

  return (
    <>
      <nav aria-label="ruta" className="mb-3">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
          <li className="breadcrumb-item"><Link to="/productos">Productos</Link></li>
          <li className="breadcrumb-item active">{producto.nombre}</li>
        </ol>
      </nav>

      <div className="row g-4">
        {/* Columna izquierda: imagen */}
        <div className="col-md-6">
          <ImagenProducto producto={producto} className="detalle-imagen" />
        </div>

        {/* Columna derecha: datos y botón */}
        <div className="col-md-6">
          <span className="badge bg-secondary mb-2">
            {producto.categoria}{producto.subcategoria ? ` · ${producto.subcategoria}` : ''}
          </span>
          <h1 className="h3 fw-bold">{producto.nombre}</h1>
          <p className="text-muted mb-1">
            {producto.marca && <>Marca: <strong>{producto.marca}</strong> · </>}Código: {producto.codigo}
          </p>
          <p className="precio fs-2 fw-bold" style={{ color: '#e8590c' }}>{formatearPrecio(producto.precio)}</p>
          {/* Si el admin escribió una descripción se usa esa; si no, se arma una con los datos. */}
          <p>
            {producto.descripcion ||
              `Producto de la categoría ${producto.categoria}${producto.marca ? `, marca ${producto.marca}` : ''}. ` +
              `Se vende por ${(producto.unidad || 'unidad').toLowerCase()}. ` +
              'Ideal para tus proyectos de construcción y mantención.'}
          </p>

          {/* Estado de stock (renderizado condicional) */}
          {producto.stock > 0 ? (
            <p className={critico ? 'text-danger' : 'text-success'}>
              <i className="bi bi-box-seam"></i>{' '}
              {critico
                ? `¡Solo quedan ${producto.stock} ${(producto.unidad || 'unidades').toLowerCase()}!`
                : `En stock (${producto.stock} disponibles)`}
            </p>
          ) : (
            <p className="text-danger"><i className="bi bi-x-circle"></i> Sin stock</p>
          )}

          {/* Selector de cantidad + botón añadir */}
          <div className="d-flex align-items-center gap-2 my-3" style={{ maxWidth: '320px' }}>
            <label htmlFor="cantidad" className="form-label mb-0">Cantidad:</label>
            <input
              type="number"
              id="cantidad"
              className="form-control"
              min={1}
              max={producto.stock}
              style={{ width: '90px' }}
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
            />
            <button className="btn btn-marca flex-grow-1" onClick={anadir} disabled={producto.stock === 0}>
              <i className="bi bi-cart-plus"></i> Añadir al carrito
            </button>
          </div>
          <Link to="/productos" className="btn btn-outline-secondary btn-sm">
            <i className="bi bi-arrow-left"></i> Seguir comprando
          </Link>
        </div>
      </div>

      {/* Productos relacionados */}
      {relacionados.length > 0 && (
        <section className="mt-5">
          <h2 className="titulo-seccion">Productos relacionados</h2>
          <GrillaProductos productos={relacionados} onAgregar={onAgregar} />
        </section>
      )}
    </>
  )
}
