import { Link } from 'react-router'

/* Inicio de sesión.
   Siguiente paso: inputs controlados con useState + validación + login con los usuarios de prueba. */
export function Login() {
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
            <form noValidate>
              <div className="mb-3">
                <label htmlFor="login-correo" className="form-label">Correo</label>
                <input type="email" id="login-correo" className="form-control" placeholder="tucorreo@duoc.cl" />
                <div className="invalid-feedback"></div>
              </div>

              <div className="mb-3">
                <label htmlFor="login-password" className="form-label">Contraseña</label>
                <input type="password" id="login-password" className="form-control" placeholder="••••••" />
                <div className="invalid-feedback"></div>
              </div>

              <button type="submit" className="btn btn-marca w-100">Iniciar sesión</button>
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
