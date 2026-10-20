import { useState } from 'react'
import { Link } from 'react-router'
import { useFormulario } from '../hooks/useFormulario.js'
import { REGIONES } from '../data/regiones.js'
import { crearUsuario } from '../data/usuarios.js'
import {
  validarConfirmacion,
  validarCorreo,
  validarPassword,
  validarRun,
  validarSeleccion,
  validarTexto,
} from '../utils/validaciones.js'

const VALORES_INICIALES = {
  run: '',
  nombre: '',
  apellidos: '',
  correo: '',
  password: '',
  password2: '',
  region: '',
  comuna: '',
  direccion: '',
  fechaNacimiento: '',   // opcional: no se valida
}

/* Reglas del formulario: un error por campo ("" = válido). */
function validarRegistro(v) {
  return {
    run: validarRun(v.run),
    nombre: validarTexto(v.nombre, 50, 'El nombre'),
    apellidos: validarTexto(v.apellidos, 100, 'Los apellidos'),
    correo: validarCorreo(v.correo),
    password: validarPassword(v.password),
    password2: validarConfirmacion(v.password2, v.password),
    region: validarSeleccion(v.region, 'una región'),
    comuna: validarSeleccion(v.comuna, 'una comuna'),
    direccion: validarTexto(v.direccion, 300, 'La dirección'),
  }
}

/* Registro de usuario. Al registrarse, el usuario queda guardado y
   puede iniciar sesión con su correo y contraseña. */
export function Registro() {
  const form = useFormulario(VALORES_INICIALES, validarRegistro)
  const [mensaje, setMensaje] = useState(null)   // { ok, texto }

  // Selects dependientes: las comunas salen de la región elegida.
  const regionElegida = REGIONES.find((r) => r.nombre === form.valores.region)
  const comunas = regionElegida ? regionElegida.comunas : []

  function cambiarRegion(evento) {
    form.cambiar(evento)
    form.asignar('comuna', '', false)   // la comuna anterior ya no corresponde
  }

  function enviar(evento) {
    evento.preventDefault()
    form.marcarTodos()
    if (!form.esValido) return

    const v = form.valores
    try {
      crearUsuario({
        run: v.run.trim().toUpperCase(),
        nombre: v.nombre.trim(),
        apellidos: v.apellidos.trim(),
        correo: v.correo.trim(),
        password: v.password,
        region: v.region,
        comuna: v.comuna,
        direccion: v.direccion.trim(),
        fechaNacimiento: v.fechaNacimiento,
        rol: 'cliente',
      })
      setMensaje({ ok: true, texto: '¡Registro exitoso! Ya puedes iniciar sesión.' })
      form.reiniciar()
    } catch (error) {
      setMensaje({ ok: false, texto: error.message })
    }
  }

  return (
    <div className="row justify-content-center">
      <div className="col-lg-8">
        <div className="card shadow-sm">
          <div className="card-body p-4">
            <h1 className="h4 mb-4">Registro de usuario</h1>

            <form noValidate onSubmit={enviar}>
              <div className="row g-3">

                <div className="col-md-6">
                  <label htmlFor="reg-run" className="form-label">RUN <span className="text-danger">*</span></label>
                  <input type="text" id="reg-run" name="run" className={form.claseDe('run')}
                    placeholder="Ej: 123456785 (sin puntos ni guion)"
                    value={form.valores.run} onChange={form.cambiar} />
                  <div className="invalid-feedback">{form.errorDe('run')}</div>
                </div>

                <div className="col-md-6">
                  <label htmlFor="reg-nombre" className="form-label">Nombre <span className="text-danger">*</span></label>
                  <input type="text" id="reg-nombre" name="nombre" className={form.claseDe('nombre')} maxLength={50}
                    value={form.valores.nombre} onChange={form.cambiar} />
                  <div className="invalid-feedback">{form.errorDe('nombre')}</div>
                </div>

                <div className="col-md-6">
                  <label htmlFor="reg-apellidos" className="form-label">Apellidos <span className="text-danger">*</span></label>
                  <input type="text" id="reg-apellidos" name="apellidos" className={form.claseDe('apellidos')} maxLength={100}
                    value={form.valores.apellidos} onChange={form.cambiar} />
                  <div className="invalid-feedback">{form.errorDe('apellidos')}</div>
                </div>

                <div className="col-md-6">
                  <label htmlFor="reg-correo" className="form-label">Correo <span className="text-danger">*</span></label>
                  <input type="email" id="reg-correo" name="correo" className={form.claseDe('correo')}
                    placeholder="tucorreo@gmail.com"
                    value={form.valores.correo} onChange={form.cambiar} />
                  <div className="invalid-feedback">{form.errorDe('correo')}</div>
                </div>

                <div className="col-md-6">
                  <label htmlFor="reg-password" className="form-label">Contraseña <span className="text-danger">*</span></label>
                  <input type="password" id="reg-password" name="password" className={form.claseDe('password')}
                    placeholder="Entre 4 y 10 caracteres"
                    value={form.valores.password} onChange={form.cambiar} />
                  <div className="invalid-feedback">{form.errorDe('password')}</div>
                </div>

                <div className="col-md-6">
                  <label htmlFor="reg-password2" className="form-label">Confirmar contraseña <span className="text-danger">*</span></label>
                  <input type="password" id="reg-password2" name="password2" className={form.claseDe('password2')}
                    value={form.valores.password2} onChange={form.cambiar} />
                  <div className="invalid-feedback">{form.errorDe('password2')}</div>
                </div>

                <div className="col-md-6">
                  <label htmlFor="reg-region" className="form-label">Región <span className="text-danger">*</span></label>
                  <select id="reg-region" name="region" className={form.claseDe('region', 'form-select')}
                    value={form.valores.region} onChange={cambiarRegion}>
                    <option value="">-- Seleccione la región --</option>
                    {REGIONES.map((r) => (
                      <option key={r.nombre} value={r.nombre}>{r.nombre}</option>
                    ))}
                  </select>
                  <div className="invalid-feedback">{form.errorDe('region')}</div>
                </div>

                <div className="col-md-6">
                  <label htmlFor="reg-comuna" className="form-label">Comuna <span className="text-danger">*</span></label>
                  <select id="reg-comuna" name="comuna" className={form.claseDe('comuna', 'form-select')}
                    value={form.valores.comuna} onChange={form.cambiar}>
                    <option value="">-- Seleccione la comuna --</option>
                    {comunas.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  <div className="invalid-feedback">{form.errorDe('comuna')}</div>
                </div>

                <div className="col-12">
                  <label htmlFor="reg-direccion" className="form-label">Dirección <span className="text-danger">*</span></label>
                  <input type="text" id="reg-direccion" name="direccion" className={form.claseDe('direccion')} maxLength={300}
                    value={form.valores.direccion} onChange={form.cambiar} />
                  <div className="invalid-feedback">{form.errorDe('direccion')}</div>
                </div>

                <div className="col-12">
                  <label htmlFor="reg-fecha" className="form-label">Fecha de nacimiento (opcional)</label>
                  <input type="date" id="reg-fecha" name="fechaNacimiento" className="form-control"
                    value={form.valores.fechaNacimiento} onChange={form.cambiar} />
                </div>

              </div>

              <button type="submit" className="btn btn-marca mt-4 w-100">Registrar</button>

              {mensaje && (
                <div className={`alert mt-3 mb-0 ${mensaje.ok ? 'alert-success' : 'alert-danger'}`} role="alert">
                  {mensaje.texto}{' '}
                  {mensaje.ok && <Link to="/login">Ir a iniciar sesión</Link>}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
