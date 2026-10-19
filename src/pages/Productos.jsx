import { useState } from 'react'
import { GrillaProductos } from '../components/GrillaProductos.jsx'
import { filtrarProductos, listarProductos, obtenerCategorias } from '../data/productos.js'

/* Catálogo completo con buscador y filtro por categoría.
   El texto buscado y la categoría elegida son ESTADO: cada vez que
   cambian, React vuelve a dibujar la página con la lista filtrada.
   (En la entrega 1 esto requería escuchar eventos y repintar a mano.) */
export function Productos({ onAgregar }) {
  const [texto, setTexto] = useState('')
  const [categoria, setCategoria] = useState('')

  const productos = listarProductos()
  const categorias = obtenerCategorias(productos)
  const filtrados = filtrarProductos(productos, texto, categoria)

  return (
    <>
      <h1 className="titulo-seccion text-center">Nuestros productos</h1>

      {/* Barra de búsqueda + filtro por categoría (inputs controlados) */}
      <div className="row g-2 mb-4 justify-content-center">
        <div className="col-md-6">
          <div className="input-group">
            <span className="input-group-text"><i className="bi bi-search"></i></span>
            <input
              type="text"
              className="form-control"
              placeholder="Buscar por nombre o código..."
              aria-label="Buscar productos"
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-4">
          <select
            className="form-select"
            aria-label="Filtrar por categoría"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="">Todas las categorías</option>
            {categorias.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      <p className="text-muted small">{filtrados.length} producto(s)</p>

      <GrillaProductos productos={filtrados} onAgregar={onAgregar} />
    </>
  )
}
