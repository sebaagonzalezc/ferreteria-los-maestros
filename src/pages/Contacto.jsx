import { useState } from 'react'
import { useFormulario } from '../hooks/useFormulario.js'
import { validarCorreo, validarTexto } from '../utils/validaciones.js'

/* Reglas del formulario: un error por campo ("" = válido). */
function validarContacto(v) {
  return {
    nombre: validarTexto(v.nombre, 100, 'El nombre'),
    correo: validarCorreo(v.correo),
    comentario: validarTexto(v.comentario, 500, 'El comentario'),
  }
}

/* Formulario de contacto (sin backend: solo muestra el mensaje de éxito). */
export function Contacto() {
  const form = useFormulario({ nombre: '', correo: '', comentario: '' }, validarContacto)
  const [enviado, setEnviado] = useState(false)

  function enviar(evento) {
    evento.preventDefault()
    form.marcarTodos()
    if (!form.esValido) return
    setEnviado(true)
    form.reiniciar()
  }

  return (
    <div className="row justify-content-center">
      <div className="col-lg-7">
        <div className="text-center mb-4">
          <i className="bi bi-hammer" style={{ fontSize: '2.5rem', color: '#e8590c' }}></i>
          <h1 className="h4 mt-2">Ferretería Los Maestros</h1>
          <p className="text-muted">¿Tienes una duda o cotización? Escríbenos.</p>
        </div>

        <div className="card shadow-sm">
          <div className="card-body p-4">
            <h2 className="h5 mb-3">Formulario de contacto</h2>

            <form noValidate onSubmit={enviar}>
              <div className="mb-3">
                <label htmlFor="con-nombre" className="form-label">Nombre completo <span className="text-danger">*</span></label>
                <input type="text" id="con-nombre" name="nombre" className={form.claseDe('nombre')} maxLength={100}
                  value={form.valores.nombre} onChange={form.cambiar} />
                <div className="invalid-feedback">{form.errores.nombre}</div>
              </div>

              <div className="mb-3">
                <label htmlFor="con-correo" className="form-label">Correo <span className="text-danger">*</span></label>
                <input type="email" id="con-correo" name="correo" className={form.claseDe('correo')}
                  placeholder="tucorreo@gmail.com"
                  value={form.valores.correo} onChange={form.cambiar} />
                <div className="invalid-feedback">{form.errores.correo}</div>
              </div>

              <div className="mb-3">
                <label htmlFor="con-comentario" className="form-label">Comentario <span className="text-danger">*</span></label>
                <textarea
                  id="con-comentario"
                  name="comentario"
                  className={form.claseDe('comentario')}
                  rows={4}
                  maxLength={500}
                  placeholder="Cuéntanos en qué te ayudamos..."
                  value={form.valores.comentario}
                  onChange={form.cambiar}
                ></textarea>
                <div className="invalid-feedback">{form.errores.comentario}</div>
              </div>

              <button type="submit" className="btn btn-marca w-100">
                <i className="bi bi-send"></i> Enviar mensaje
              </button>

              {enviado && (
                <div className="alert alert-success mt-3 mb-0" role="status">
                  <i className="bi bi-check-circle-fill"></i> ¡Mensaje enviado! Te responderemos pronto.
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Datos de contacto */}
        <div className="row text-center mt-4 g-3">
          <div className="col-md-4"><i className="bi bi-geo-alt-fill text-primary"></i><br /><small>La Serena, Coquimbo</small></div>
          <div className="col-md-4"><i className="bi bi-telephone-fill text-primary"></i><br /><small>+56 9 1234 5678</small></div>
          <div className="col-md-4"><i className="bi bi-envelope-fill text-primary"></i><br /><small>contacto@losmaestros.cl</small></div>
        </div>
      </div>
    </div>
  )
}
