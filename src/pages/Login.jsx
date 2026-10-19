import { useState } from 'react'
import { Link } from 'react-router'
import { useFormulario } from '../hooks/useFormulario.js'
import { validarCorreo, validarPassword } from '../utils/validaciones.js'
import { autenticar } from '../data/usuarios.js'

/* Reglas del formulario: devuelve un error por campo ("" = válido). */
function validarLogin(valores) {
  return {
    correo: validarCorreo(valores.correo),
    password: validarPassword(valores.password),
  }
}

/* Inicio de sesión.
   Prop onIniciarSesion: función de App que guarda la sesión. */
export function Login({ onIniciarSesion }) {
  const form = useFormulario({ correo: '', password: '' }, validarLogin)
  const [errorLogin, setErrorLogin] = useState('')

  function enviar(evento) {
    evento.preventDefault()   // evita que la página se recargue
    setErrorLogin('')
    form.marcarTodos()
    if (!form.esValido) return

    const usuario = autenticar(form.valores.correo, form.valores.password)
    if (!usuario) {
      setErrorLogin('Correo o contraseña incorrectos.')
      return
    }
    onIniciarSesion(usuario)
  }

  return (
    <div className="row justify-content-center my-4">
      <div className="col-md-6 col-lg-5">

        <div className="text-center mb-4">
          <i className="bi bi-hammer" style={{ fontSize: '3rem', color: '#e8590c' }}></i>
          <h1 className="h4 mt-2">Ferretería Los Maestros</h1>
        </div>

        <div className="card shadow-sm">
          <div className="card-body p-4">
            <h2 className="h5 mb-3">Iniciar sesión</h2>

            {/* noValidate desactiva la validación del navegador para usar solo la nuestra */}
            <form noValidate onSubmit={enviar}>
              <div className="mb-3">
                <label htmlFor="login-correo" className="form-label">Correo</label>
                <input
                  type="email"
                  id="login-correo"
                  name="correo"
                  className={form.claseDe('correo')}
                  placeholder="tucorreo@duoc.cl"
                  value={form.valores.correo}
                  onChange={form.cambiar}
                />
                <div className="invalid-feedback">{form.errores.correo}</div>
              </div>

              <div className="mb-3">
                <label htmlFor="login-password" className="form-label">Contraseña</label>
                <input
                  type="password"
                  id="login-password"
                  name="password"
                  className={form.claseDe('password')}
                  placeholder="••••••"
                  value={form.valores.password}
                  onChange={form.cambiar}
                />
                <div className="invalid-feedback">{form.errores.password}</div>
              </div>

              <button type="submit" className="btn btn-marca w-100">Iniciar sesión</button>

              {errorLogin && (
                <div className="alert alert-danger mt-3 mb-0" role="alert">
                  <i className="bi bi-exclamation-triangle-fill"></i> {errorLogin}
                </div>
              )}
            </form>

            <p className="text-center mt-3 mb-0 small">
              ¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link>
            </p>
          </div>
        </div>

        {/* Ayuda para la demo: usuarios de prueba */}
        <div className="alert alert-info mt-3 small">
          <strong>Usuarios de prueba:</strong><br />
          Admin: <code>admin@duoc.cl</code> / <code>admin123</code><br />
          Vendedor: <code>vendedor@duoc.cl</code> / <code>venta123</code><br />
          Cliente: <code>cliente@gmail.com</code> / <code>cliente123</code>
        </div>

      </div>
    </div>
  )
}
