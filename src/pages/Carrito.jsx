import { Link } from 'react-router'

/* Carrito de compras.
   Siguiente paso: el carrito tendrá estado (useState) guardado en localStorage. */
export function Carrito() {
  return (
    <>
      <h1 className="titulo-seccion">Mi carrito de compras</h1>

      {/* Mensaje cuando el carrito está vacío */}
      <div className="text-center text-muted py-5">
        <i className="bi bi-cart-x" style={{ fontSize: '4rem' }}></i>
        <p className="mt-3">Tu carrito está vacío.</p>
        <Link to="/productos" className="btn btn-marca">Ir a comprar</Link>
      </div>
    </>
  )
}
