import { useState } from 'react'
import { Link, useLocation } from 'react-router'
import { eliminarUsuario, listarUsuarios } from '../../data/usuarios.js'

/* Mantenedor de usuarios (solo administrador, RF10).
   Prop sesion: para no permitir que el admin se elimine a sí mismo. */
export function AdminUsuarios({ sesion }) {
  const [usuarios, setUsuarios] = useState(listarUsuarios)
  const mensaje = useLocation().state?.mensaje

  function eliminar(usuario) {
    if (!window.confirm(`¿Eliminar a ${usuario.nombre} (${usuario.correo})?`)) return
    eliminarUsuario(usuario.correo)
    setUsuarios(listarUsuarios())
  }

  return (
    <>
      <div className="admin-topbar">
        <h1>Usuarios <span className="badge bg-secondary fs-6 align-middle">{usuarios.length}</span></h1>
        <Link to="/admin/usuarios/nuevo" className="btn btn-marca">
          <i className="bi bi-person-plus"></i> Nuevo usuario
        </Link>
      </div>

      {mensaje && <div className="alert alert-success" role="status">{mensaje}</div>}

      <div className="card shadow-sm">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Rol</th>
                <th>Comuna</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((u) => {
                const esUnoMismo = u.correo === sesion.correo
                return (
                  <tr key={u.correo}>
                    <td>{u.nombre} {u.apellidos}</td>
                    <td>{u.correo}</td>
                    <td><span className="badge bg-secondary text-capitalize">{u.rol}</span></td>
                    <td>{u.comuna}</td>
                    <td className="text-nowrap">
                      <Link
                        to={`/admin/usuarios/${encodeURIComponent(u.correo)}/editar`}
                        className="btn btn-sm btn-outline-primary me-1"
                        aria-label={`Editar ${u.nombre}`}
                      >
                        <i className="bi bi-pencil"></i>
                      </Link>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => eliminar(u)}
                        disabled={esUnoMismo}
                        title={esUnoMismo ? 'No puedes eliminar tu propia cuenta' : 'Eliminar'}
                        aria-label={`Eliminar ${u.nombre}`}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
