import { useState } from 'react'
import { Link } from 'react-router'
import { listarProductos } from '../data/productos.js'
import { calcularSubtotal, porcentajeCupon } from '../utils/carrito.js'
import { formatearPrecio, iconoCategoria } from '../utils/formato.js'

/* Carrito de compras.
   Props (vienen de App, que es quien guarda el estado del carrito):
     carrito            -> arreglo [{ codigo, cantidad }]
     onCambiarCantidad  -> (codigo, cantidad)
     onEliminar         -> (codigo)
     onVaciar           -> ()
   Estado PROPIO de esta página: el cupón y si la compra ya se hizo. */
export function Carrito({ carrito, onCambiarCantidad, onEliminar, onVaciar }) {
  const [cupon, setCupon] = useState('')
  const [descuento, setDescuento] = useState(0)          // 0.10 = 10%
  const [mensajeCupon, setMensajeCupon] = useState(null) // { ok, texto }
  const [compraRealizada, setCompraRealizada] = useState(false)

  const productos = listarProductos()
  // Unimos cada ítem del carrito con los datos de su producto.
  const lineas = carrito
    .map((item) => ({ ...item, producto: productos.find((p) => p.codigo === item.codigo) }))
    .filter((linea) => linea.producto)

  const subtotal = calcularSubtotal(carrito, productos)
  const montoDescuento = Math.round(subtotal * descuento)
  const total = subtotal - montoDescuento

  function aplicarCupon() {
    const porcentaje = porcentajeCupon(cupon)
    if (porcentaje) {
      setDescuento(porcentaje)
      setMensajeCupon({ ok: true, texto: `¡Cupón aplicado! ${Math.round(porcentaje * 100)}% de descuento.` })
    } else {
      setDescuento(0)
      setMensajeCupon({ ok: false, texto: 'El cupón no es válido.' })
    }
  }

  function pagar() {
    onVaciar()
    setCompraRealizada(true)
  }

  // Después de pagar mostramos la confirmación.
  if (compraRealizada) {
    return (
      <div className="text-center py-5">
        <i className="bi bi-bag-check text-success" style={{ fontSize: '4rem' }}></i>
        <h1 className="h3 mt-3">¡Gracias por tu compra!</h1>
        <p className="text-muted">Tu pedido fue registrado (demo, sin pago real).</p>
        <Link to="/productos" className="btn btn-marca">Seguir comprando</Link>
      </div>
    )
  }

  // Carrito vacío.
  if (lineas.length === 0) {
    return (
      <>
        <h1 className="titulo-seccion">Mi carrito de compras</h1>
        <div className="text-center text-muted py-5">
          <i className="bi bi-cart-x" style={{ fontSize: '4rem' }}></i>
          <p className="mt-3">Tu carrito está vacío.</p>
          <Link to="/productos" className="btn btn-marca">Ir a comprar</Link>
        </div>
      </>
    )
  }

  return (
    <>
      <h1 className="titulo-seccion">Mi carrito de compras</h1>

      <div className="row g-4">
        {/* Columna izquierda: una fila por producto */}
        <div className="col-lg-8">
          {lineas.map(({ codigo, cantidad, producto }) => (
            <div key={codigo} className="carrito-item d-flex align-items-center gap-3 border-bottom py-3">
              <div className="imagen-mini"><i className={`bi ${iconoCategoria(producto.categoria)}`}></i></div>
              <div className="flex-grow-1">
                <h6 className="mb-0">{producto.nombre}</h6>
                <small className="text-muted">{codigo} · {formatearPrecio(producto.precio)} c/u</small>
              </div>
              <input
                type="number"
                min={1}
                className="form-control control-cantidad"
                aria-label={`Cantidad de ${producto.nombre}`}
                value={cantidad}
                onChange={(e) => onCambiarCantidad(codigo, e.target.value)}
              />
              <div className="fw-bold" style={{ width: '90px', textAlign: 'right' }}>
                {formatearPrecio(producto.precio * cantidad)}
              </div>
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => onEliminar(codigo)}
                title="Quitar"
                aria-label={`Quitar ${producto.nombre}`}
              >
                <i className="bi bi-trash"></i>
              </button>
            </div>
          ))}
        </div>

        {/* Columna derecha: resumen, cupón y pagar */}
        <div className="col-lg-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Resumen</h5>
              <div className="d-flex justify-content-between"><span>Subtotal</span><span>{formatearPrecio(subtotal)}</span></div>
              <div className="d-flex justify-content-between text-success"><span>Descuento</span><span>-{formatearPrecio(montoDescuento)}</span></div>
              <hr />
              <div className="d-flex justify-content-between fs-5 fw-bold"><span>Total</span><span>{formatearPrecio(total)}</span></div>

              {/* Cupón de descuento */}
              <label htmlFor="cupon" className="form-label mt-3 small">¿Tienes un cupón?</label>
              <div className="input-group">
                <input
                  type="text"
                  id="cupon"
                  className="form-control"
                  placeholder="Ej: MAESTRO10"
                  value={cupon}
                  onChange={(e) => setCupon(e.target.value)}
                />
                <button className="btn btn-outline-secondary" onClick={aplicarCupon}>Aplicar</button>
              </div>
              {mensajeCupon && (
                <div className={`small mt-1 ${mensajeCupon.ok ? 'text-success' : 'text-danger'}`}>
                  {mensajeCupon.texto}
                </div>
              )}

              <button className="btn btn-success w-100 mt-3" onClick={pagar}>
                <i className="bi bi-bag-check"></i> Pagar
              </button>
              <button className="btn btn-link text-danger w-100 mt-1" onClick={onVaciar}>
                Vaciar carrito
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
