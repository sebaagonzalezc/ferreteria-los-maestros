import { Link } from 'react-router'

/* Página para cualquier URL que no exista (ruta "*"). */
export function NoEncontrado() {
  return (
    <div className="text-center py-5">
      <i className="bi bi-signpost-split" style={{ fontSize: '4rem', color: '#e8590c' }}></i>
      <h1 className="h3 mt-3">Página no encontrada</h1>
      <p className="text-muted">La dirección que buscas no existe.</p>
      <Link to="/" className="btn btn-marca">Volver al inicio</Link>
    </div>
  )
}
