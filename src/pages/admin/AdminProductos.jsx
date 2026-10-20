import { useState } from 'react'
import { Link, useLocation } from 'react-router'
import { eliminarProducto, esStockCritico, listarProductos } from '../../data/productos.js'
import { formatearPrecio } from '../../utils/formato.js'

/* Mantenedor de productos: listado con editar y eliminar.
   La lista es ESTADO: al eliminar, se vuelve a leer y la tabla se redibuja. */
export function AdminProductos() {
  const [productos, setProductos] = useState(listarProductos)
  // Mensaje que manda el formulario al volver ("Producto guardado").
  const mensaje = useLocation().state?.mensaje

  function eliminar(producto) {
    if (!window.confirm(`¿Eliminar "${producto.nombre}"?`)) return
    eliminarProducto(producto.codigo)
    setProductos(listarProductos())
  }

  return (
    <>
      <div className="admin-topbar">
        <h1>Productos <span className="badge bg-secondary fs-6 align-middle">{productos.length}</span></h1>
        <Link to="/admin/productos/nuevo" className="btn btn-marca">
          <i className="bi bi-plus-lg"></i> Nuevo producto
        </Link>
      </div>

      {mensaje && <div className="alert alert-success" role="status">{mensaje}</div>}

      <div className="card shadow-sm">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>Código</th>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((p) => (
                <tr key={p.codigo}>
                  <td>{p.codigo}</td>
                  <td>{p.nombre}</td>
                  <td>{p.categoria}</td>
                  <td>{formatearPrecio(p.precio)}</td>
                  <td>
                    {p.stock}{' '}
                    {esStockCritico(p) && <span className="badge bg-danger">Stock crítico</span>}
                  </td>
                  <td className="text-nowrap">
                    <Link
                      to={`/admin/productos/${p.codigo}/editar`}
                      className="btn btn-sm btn-outline-primary me-1"
                      aria-label={`Editar ${p.nombre}`}
                    >
                      <i className="bi bi-pencil"></i>
                    </Link>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => eliminar(p)}
                      aria-label={`Eliminar ${p.nombre}`}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
