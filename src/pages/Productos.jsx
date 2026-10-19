/* Catálogo completo con buscador y filtro por categoría.
   Siguiente paso: los productos, el buscador y el filtro funcionarán con estado (useState). */
export function Productos() {
  return (
    <>
      <h1 className="titulo-seccion text-center">Nuestros productos</h1>

      {/* Barra de búsqueda + filtro por categoría */}
      <div className="row g-2 mb-4 justify-content-center">
        <div className="col-md-6">
          <div className="input-group">
            <span className="input-group-text"><i className="bi bi-search"></i></span>
            <input
              type="text"
              className="form-control"
              placeholder="Buscar por nombre o código..."
              aria-label="Buscar productos"
            />
          </div>
        </div>
        <div className="col-md-4">
          <select className="form-select" aria-label="Filtrar por categoría">
            <option value="">Todas las categorías</option>
          </select>
        </div>
      </div>

      {/* Grilla de productos */}
      <div className="row g-3"></div>
    </>
  )
}
