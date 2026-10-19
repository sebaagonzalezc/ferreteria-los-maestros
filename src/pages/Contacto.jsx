/* Formulario de contacto.
   Siguiente paso: estado del formulario + validación. */
export function Contacto() {
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

            <form noValidate>
              <div className="mb-3">
                <label htmlFor="con-nombre" className="form-label">Nombre completo <span className="text-danger">*</span></label>
                <input type="text" id="con-nombre" className="form-control" maxLength={100} />
                <div className="invalid-feedback"></div>
              </div>

              <div className="mb-3">
                <label htmlFor="con-correo" className="form-label">Correo <span className="text-danger">*</span></label>
                <input type="email" id="con-correo" className="form-control" placeholder="tucorreo@gmail.com" />
                <div className="invalid-feedback"></div>
              </div>

              <div className="mb-3">
                <label htmlFor="con-comentario" className="form-label">Comentario <span className="text-danger">*</span></label>
                <textarea
                  id="con-comentario"
                  className="form-control"
                  rows={4}
                  maxLength={500}
                  placeholder="Cuéntanos en qué te ayudamos..."
                ></textarea>
                <div className="invalid-feedback"></div>
              </div>

              <button type="submit" className="btn btn-marca w-100">
                <i className="bi bi-send"></i> Enviar mensaje
              </button>
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
