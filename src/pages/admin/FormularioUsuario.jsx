import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { useFormulario } from '../../hooks/useFormulario.js'
import { REGIONES } from '../../data/regiones.js'
import { actualizarUsuario, buscarUsuarioPorCorreo, crearUsuario } from '../../data/usuarios.js'
import {
  validarCorreo,
  validarPassword,
  validarRun,
  validarSeleccion,
  validarTexto,
} from '../../utils/validaciones.js'

const ROLES = ['administrador', 'vendedor', 'cliente']

function valoresDesde(usuario) {
  return {
    run: usuario?.run ?? '',
    nombre: usuario?.nombre ?? '',
    apellidos: usuario?.apellidos ?? '',
    correo: usuario?.correo ?? '',
    rol: usuario?.rol ?? '',
    region: usuario?.region ?? '',
    comuna: usuario?.comuna ?? '',
    direccion: usuario?.direccion ?? '',
    password: '',
  }
}

/* Un solo formulario para CREAR y EDITAR usuarios.
   En edición el correo no se cambia (identifica al usuario) y la
   contraseña es opcional: vacía = se mantiene la actual. */
export function FormularioUsuario() {
  const { correo } = useParams()
  const navegar = useNavigate()
  const esEdicion = Boolean(correo)
  const usuarioOriginal = esEdicion ? buscarUsuarioPorCorreo(correo) : undefined

  // Las reglas dependen del modo (la contraseña solo es obligatoria al crear).
  function validarUsuario(v) {
    return {
      run: validarRun(v.run),
      nombre: validarTexto(v.nombre, 50, 'El nombre'),
      apellidos: validarTexto(v.apellidos, 100, 'Los apellidos'),
      correo: validarCorreo(v.correo),
      rol: validarSeleccion(v.rol, 'un tipo de usuario'),
      region: validarSeleccion(v.region, 'una región'),
      comuna: validarSeleccion(v.comuna, 'una comuna'),
      direccion: validarTexto(v.direccion, 300, 'La dirección'),
      password: esEdicion && v.password === '' ? '' : validarPassword(v.password),
    }
  }

  const form = useFormulario(valoresDesde(usuarioOriginal), validarUsuario)
  const [error, setError] = useState('')

  if (esEdicion && !usuarioOriginal) {
    return (
      <div className="alert alert-warning">
        Usuario no encontrado. <Link to="/admin/usuarios">Volver al listado</Link>.
      </div>
    )
  }

  const regionElegida = REGIONES.find((r) => r.nombre === form.valores.region)
  const comunas = regionElegida ? regionElegida.comunas : []

  function cambiarRegion(evento) {
    form.cambiar(evento)
    form.asignar('comuna', '', false)
  }

  function enviar(evento) {
    evento.preventDefault()
    form.marcarTodos()
    if (!form.esValido) return

    const v = form.valores
    const datos = {
      run: v.run.trim().toUpperCase(),
      nombre: v.nombre.trim(),
      apellidos: v.apellidos.trim(),
      correo: v.correo.trim(),
      rol: v.rol,
      region: v.region,
      comuna: v.comuna,
      direccion: v.direccion.trim(),
    }
    if (v.password !== '') datos.password = v.password

    try {
      if (esEdicion) {
        actualizarUsuario(usuarioOriginal.correo, datos)
      } else {
        crearUsuario(datos)
      }
      navegar('/admin/usuarios', { state: { mensaje: `Usuario ${datos.nombre} guardado correctamente.` } })
    } catch (e) {
      setError(e.message)
    }
  }

  return (
    <>
      <div className="admin-topbar">
        <h1>{esEdicion ? 'Editar usuario' : 'Nuevo usuario'}</h1>
        <Link to="/admin/usuarios" className="btn btn-outline-secondary btn-sm">
          <i className="bi bi-arrow-left"></i> Volver
        </Link>
      </div>

      <div className="card shadow-sm">
        <div className="card-body p-4">
          <form noValidate onSubmit={enviar}>
            <div className="row g-3">
              <div className="col-md-4">
                <label htmlFor="usr-run" className="form-label">RUN <span className="text-danger">*</span></label>
                <input type="text" id="usr-run" name="run" className={form.claseDe('run')}
                  placeholder="Ej: 123456785" value={form.valores.run} onChange={form.cambiar} />
                <div className="invalid-feedback">{form.errorDe('run')}</div>
              </div>

              <div className="col-md-4">
                <label htmlFor="usr-nombre" className="form-label">Nombre <span className="text-danger">*</span></label>
                <input type="text" id="usr-nombre" name="nombre" className={form.claseDe('nombre')} maxLength={50}
                  value={form.valores.nombre} onChange={form.cambiar} />
                <div className="invalid-feedback">{form.errorDe('nombre')}</div>
              </div>

              <div className="col-md-4">
                <label htmlFor="usr-apellidos" className="form-label">Apellidos <span className="text-danger">*</span></label>
                <input type="text" id="usr-apellidos" name="apellidos" className={form.claseDe('apellidos')} maxLength={100}
                  value={form.valores.apellidos} onChange={form.cambiar} />
                <div className="invalid-feedback">{form.errorDe('apellidos')}</div>
              </div>

              <div className="col-md-6">
                <label htmlFor="usr-correo" className="form-label">Correo <span className="text-danger">*</span></label>
                <input type="email" id="usr-correo" name="correo" className={form.claseDe('correo')} disabled={esEdicion}
                  value={form.valores.correo} onChange={form.cambiar} />
                <div className="invalid-feedback">{form.errorDe('correo')}</div>
              </div>

              <div className="col-md-6">
                <label htmlFor="usr-rol" className="form-label">Tipo de usuario <span className="text-danger">*</span></label>
                <select id="usr-rol" name="rol" className={form.claseDe('rol', 'form-select')}
                  value={form.valores.rol} onChange={form.cambiar}>
                  <option value="">-- Seleccione --</option>
                  {ROLES.map((r) => <option key={r} value={r}>{r.charAt(0).toUpperCase() + r.slice(1)}</option>)}
                </select>
                <div className="invalid-feedback">{form.errorDe('rol')}</div>
              </div>

              <div className="col-md-6">
                <label htmlFor="usr-region" className="form-label">Región <span className="text-danger">*</span></label>
                <select id="usr-region" name="region" className={form.claseDe('region', 'form-select')}
                  value={form.valores.region} onChange={cambiarRegion}>
                  <option value="">-- Seleccione la región --</option>
                  {REGIONES.map((r) => <option key={r.nombre} value={r.nombre}>{r.nombre}</option>)}
                </select>
                <div className="invalid-feedback">{form.errorDe('region')}</div>
              </div>

              <div className="col-md-6">
                <label htmlFor="usr-comuna" className="form-label">Comuna <span className="text-danger">*</span></label>
                <select id="usr-comuna" name="comuna" className={form.claseDe('comuna', 'form-select')}
                  value={form.valores.comuna} onChange={form.cambiar}>
                  <option value="">-- Seleccione la comuna --</option>
                  {comunas.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
                <div className="invalid-feedback">{form.errorDe('comuna')}</div>
              </div>

              <div className="col-md-8">
                <label htmlFor="usr-direccion" className="form-label">Dirección <span className="text-danger">*</span></label>
                <input type="text" id="usr-direccion" name="direccion" className={form.claseDe('direccion')} maxLength={300}
                  value={form.valores.direccion} onChange={form.cambiar} />
                <div className="invalid-feedback">{form.errorDe('direccion')}</div>
              </div>

              <div className="col-md-4">
                <label htmlFor="usr-password" className="form-label">
                  Contraseña {esEdicion ? '(vacía = no cambiar)' : <span className="text-danger">*</span>}
                </label>
                <input type="password" id="usr-password" name="password" className={form.claseDe('password')}
                  placeholder="Entre 4 y 10 caracteres" value={form.valores.password} onChange={form.cambiar} />
                <div className="invalid-feedback">{form.errorDe('password')}</div>
              </div>
            </div>

            <button type="submit" className="btn btn-marca mt-4">
              <i className="bi bi-save"></i> Guardar usuario
            </button>

            {error && <div className="alert alert-danger mt-3 mb-0" role="alert">{error}</div>}
          </form>
        </div>
      </div>
    </>
  )
}
