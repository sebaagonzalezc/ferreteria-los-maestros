/* ============================================================
   carrito.js  —  Lógica del carrito (funciones PURAS)
   ------------------------------------------------------------
   "Pura" = recibe datos y DEVUELVE datos nuevos, sin modificar los
   originales ni tocar la pantalla. Así React detecta el cambio de
   estado, y además estas funciones son muy fáciles de testear.

   El carrito es un arreglo liviano: solo código y cantidad.
     Ejemplo: [ { codigo: 'MC001', cantidad: 2 } ]
   ============================================================ */

export const CLAVE_CARRITO = 'flm_carrito'

/* Cupones válidos: código -> porcentaje (0.10 = 10%). */
export const CUPONES = {
  MAESTRO10: 0.10,
  BIENVENIDO: 0.05,
}

/* --- localStorage: el carrito sobrevive aunque se recargue la página --- */
export function leerCarrito() {
  try {
    const dato = localStorage.getItem(CLAVE_CARRITO)
    return dato ? JSON.parse(dato) : []
  } catch {
    return []
  }
}

export function guardarCarrito(carrito) {
  try {
    localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito))
  } catch (error) {
    console.warn('No se pudo guardar el carrito:', error)
  }
}

/* Agrega un producto. Si ya estaba, suma la cantidad. */
export function agregarItem(carrito, codigo, cantidad = 1) {
  const existe = carrito.some((item) => item.codigo === codigo)
  if (existe) {
    return carrito.map((item) =>
      item.codigo === codigo ? { ...item, cantidad: item.cantidad + cantidad } : item,
    )
  }
  return [...carrito, { codigo, cantidad }]
}

/* Cambia la cantidad de un producto (mínimo 1). */
export function cambiarCantidadItem(carrito, codigo, cantidad) {
  const numero = parseInt(cantidad, 10)
  const segura = isNaN(numero) || numero < 1 ? 1 : numero
  return carrito.map((item) => (item.codigo === codigo ? { ...item, cantidad: segura } : item))
}

/* Quita un producto del carrito. */
export function quitarItem(carrito, codigo) {
  return carrito.filter((item) => item.codigo !== codigo)
}

/* Total de unidades (el numerito rojo del header). */
export function contarItems(carrito) {
  return carrito.reduce((suma, item) => suma + item.cantidad, 0)
}

/* Suma de precio x cantidad, buscando cada precio en la lista de productos. */
export function calcularSubtotal(carrito, productos) {
  return carrito.reduce((suma, item) => {
    const producto = productos.find((p) => p.codigo === item.codigo)
    return producto ? suma + producto.precio * item.cantidad : suma
  }, 0)
}

/* Porcentaje de un cupón, o null si no es válido. */
export function porcentajeCupon(codigo) {
  return CUPONES[codigo.trim().toUpperCase()] ?? null
}
