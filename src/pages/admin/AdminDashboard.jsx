import { Link } from 'react-router'
import { esStockCritico, listarProductos } from '../../data/productos.js'
import { listarUsuarios } from '../../data/usuarios.js'

/* Tarjeta de indicador reutilizable (props: titulo, valor, icono, color). */
function Indicador({ titulo, valor, icono, color }) {
  return (
    <div className="card shadow-sm h-100">
      <div className="card-body d-flex justify-content-between align-items-center">
        <div>
          <h2 className="h6 text-muted mb-1">{titulo}</h2>
          <p className="fs-3 fw-bold mb-0">{valor}</p>
        </div>
        <i className={`bi ${icono} fs-1 ${color}`}></i>
      </div>
    </div>
  )
}

/* Dashboard: indicadores generales y alerta de stock crítico (RF11). */
export function AdminDashboard({ sesion }) {
  const productos = listarProductos()
  const criticos = productos.filter(esStockCritico)
  const esAdmin = sesion.rol === 'administrador'

  return (
    <>
      <div className="admin-topbar">
        <h1>¡Hola, {sesion.nombre}!</h1>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <Indicador titulo="Productos" valor={productos.length} icono="bi-box-seam" color="text-primary" />
        </div>
        {esAdmin && (
          <div className="col-md-4">
            <Indicador titulo="Usuarios" valor={listarUsuarios().length} icono="bi-people" color="text-success" />
          </div>
        )}
        <div className="col-md-4">
          <Indicador titulo="Stock crítico" valor={criticos.length} icono="bi-exclamation-triangle" color="text-danger" />
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="h5">Productos con stock crítico</h2>
          {criticos.length === 0 ? (
            <p className="text-muted mb-0">No hay productos en stock crítico. 👍</p>
          ) : (
            <ul className="list-group list-group-flush">
              {criticos.map((p) => (
                <li key={p.codigo} className="list-group-item d-flex justify-content-between align-items-center">
                  <span>
                    {p.nombre} <small className="text-muted">({p.codigo})</small>
                  </span>
                  <span>
                    <span className="badge bg-danger me-2">{p.stock} / mín. {p.stockMinimo}</span>
                    <Link to={`/admin/productos/${p.codigo}/editar`} className="btn btn-sm btn-outline-primary">Reponer</Link>
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  )
}
