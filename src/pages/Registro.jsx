/* Registro de usuario.
   Siguiente paso: estado del formulario, validaciones (incluido el RUN) y
   selects dependientes de región/comuna. */
export function Registro() {
  return (
    <div className="row justify-content-center">
      <div className="col-lg-8">
        <div className="card shadow-sm">
          <div className="card-body p-4">
            <h1 className="h4 mb-4">Registro de usuario</h1>

            <form noValidate>
              <div className="row g-3">

                <div className="col-md-6">
                  <label htmlFor="reg-run" className="form-label">RUN <span className="text-danger">*</span></label>
                  <input type="text" id="reg-run" className="form-control" placeholder="Ej: 123456785 (sin puntos ni guion)" />
                  <div className="invalid-feedback"></div>
                </div>

                <div className="col-md-6">
                  <label htmlFor="reg-nombre" className="form-label">Nombre <span className="text-danger">*</span></label>
                  <input type="text" id="reg-nombre" className="form-control" maxLength={50} />
                  <div className="invalid-feedback"></div>
                </div>

                <div className="col-md-6">
                  <label htmlFor="reg-apellidos" className="form-label">Apellidos <span className="text-danger">*</span></label>
                  <input type="text" id="reg-apellidos" className="form-control" maxLength={100} />
                  <div className="invalid-feedback"></div>
                </div>

                <div className="col-md-6">
                  <label htmlFor="reg-correo" className="form-label">Correo <span className="text-danger">*</span></label>
                  <input type="email" id="reg-correo" className="form-control" placeholder="tucorreo@gmail.com" />
                  <div className="invalid-feedback"></div>
                </div>

                <div className="col-md-6">
                  <label htmlFor="reg-password" className="form-label">Contraseña <span className="text-danger">*</span></label>
                  <input type="password" id="reg-password" className="form-control" placeholder="Entre 4 y 10 caracteres" />
                  <div className="invalid-feedback"></div>
                </div>

                <div className="col-md-6">
                  <label htmlFor="reg-password2" className="form-label">Confirmar contraseña <span className="text-danger">*</span></label>
                  <input type="password" id="reg-password2" className="form-control" />
                  <div className="invalid-feedback"></div>
                </div>

                <div className="col-md-6">
                  <label htmlFor="reg-region" className="form-label">Región <span className="text-danger">*</span></label>
                  <select id="reg-region" className="form-select">
                    <option value="">-- Seleccione la región --</option>
                  </select>
                  <div className="invalid-feedback"></div>
                </div>

                <div className="col-md-6">
                  <label htmlFor="reg-comuna" className="form-label">Comuna <span className="text-danger">*</span></label>
                  <select id="reg-comuna" className="form-select">
                    <option value="">-- Seleccione la comuna --</option>
                  </select>
                  <div className="invalid-feedback"></div>
                </div>

                <div className="col-12">
                  <label htmlFor="reg-direccion" className="form-label">Dirección <span className="text-danger">*</span></label>
                  <input type="text" id="reg-direccion" className="form-control" maxLength={300} />
                  <div className="invalid-feedback"></div>
                </div>

                <div className="col-12">
                  <label htmlFor="reg-fecha" className="form-label">Fecha de nacimiento (opcional)</label>
                  <input type="date" id="reg-fecha" className="form-control" />
                </div>

              </div>

              <button type="submit" className="btn btn-marca mt-4 w-100">Registrar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
