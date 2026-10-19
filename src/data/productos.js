/* ============================================================
   productos.js  —  Fuente de datos simulada (como una base de datos)
   ------------------------------------------------------------
   En la entrega 1 el catálogo era un arreglo fijo (datos-productos.js).
   Ahora además tiene funciones CRUD (Crear, Leer, Actualizar, Eliminar)
   y guarda los cambios en localStorage, para que lo que haga el
   administrador se mantenga al recargar la página.

   Cada producto es un objeto con:
     codigo (identificador único), categoria, subcategoria, nombre,
     marca, unidad, precio (CLP), stock, stockMinimo e imagen.
   ============================================================ */

const CLAVE_PRODUCTOS = 'flm_productos'

/* Catálogo inicial (el mismo de la entrega 1).
   Las imágenes empiezan con "/" para que funcionen desde cualquier ruta,
   por ejemplo desde /producto/MC001. */
export const PRODUCTOS_INICIALES = [
  { codigo: 'MC001', categoria: 'Mat. Construcción', subcategoria: 'Cementos', nombre: 'Cemento Polpaico gris 25 kg', marca: 'Polpaico', unidad: 'Saco', precio: 5990, stock: 80, stockMinimo: 20, imagen: '/img/cemento.jpg' },
  { codigo: 'PT001', categoria: 'Pinturas', subcategoria: 'Látex', nombre: 'Pintura látex interior 1 galón blanco', marca: 'Sipa', unidad: 'Galón', precio: 9990, stock: 40, stockMinimo: 10, imagen: '/img/pintura.jpg' },
  { codigo: 'HM001', categoria: 'Herramientas', subcategoria: 'Manuales', nombre: 'Martillo carpintero 500g', marca: 'Stanley', unidad: 'Unidad', precio: 7990, stock: 20, stockMinimo: 5, imagen: '/img/martillo.jpg' },
  { codigo: 'HE001', categoria: 'Herramientas', subcategoria: 'Eléctricas', nombre: 'Taladro percutor 650W 13mm', marca: 'Makita', unidad: 'Unidad', precio: 79990, stock: 8, stockMinimo: 2, imagen: '/img/taladro.jpg' },
  { codigo: 'EL011', categoria: 'Electricidad', subcategoria: 'Iluminación', nombre: 'Ampolleta LED 9W E27 luz fría', marca: 'Philips', unidad: 'Unidad', precio: 3990, stock: 8, stockMinimo: 20, imagen: '/img/ampolleta.jpg' }, // stock bajo el mínimo: "crítico"
  { codigo: 'GS007', categoria: 'Gasfitería', subcategoria: 'Llaves', nombre: 'Llave de paso esfera 1/2" latón', marca: 'Emmeti', unidad: 'Unidad', precio: 3490, stock: 30, stockMinimo: 10, imagen: '/img/llave-paso.jpg' },
]

/* --- Lectura y escritura en localStorage (uso interno) --- */
function leer() {
  try {
    const dato = localStorage.getItem(CLAVE_PRODUCTOS)
    return dato ? JSON.parse(dato) : [...PRODUCTOS_INICIALES]
  } catch {
    return [...PRODUCTOS_INICIALES]
  }
}

function guardar(lista) {
  try {
    localStorage.setItem(CLAVE_PRODUCTOS, JSON.stringify(lista))
  } catch (error) {
    console.warn('No se pudieron guardar los productos:', error)
  }
}

/* ===================== CRUD ===================== */

/* LEER: todos los productos. */
export function listarProductos() {
  return leer()
}

/* LEER: un producto por su código (undefined si no existe). */
export function buscarProducto(codigo) {
  return leer().find((p) => p.codigo === codigo)
}

/* CREAR: agrega un producto nuevo. El código no se puede repetir. */
export function crearProducto(producto) {
  if (buscarProducto(producto.codigo)) {
    throw new Error(`Ya existe un producto con el código ${producto.codigo}`)
  }
  guardar([...leer(), producto])
  return producto
}

/* ACTUALIZAR: cambia los datos de un producto (el código no cambia). */
export function actualizarProducto(codigo, cambios) {
  const lista = leer().map((p) => (p.codigo === codigo ? { ...p, ...cambios, codigo } : p))
  guardar(lista)
  return lista.find((p) => p.codigo === codigo)
}

/* ELIMINAR: quita un producto por su código. */
export function eliminarProducto(codigo) {
  guardar(leer().filter((p) => p.codigo !== codigo))
}

/* Vuelve al catálogo original (útil para pruebas y para la demo). */
export function reiniciarProductos() {
  try {
    localStorage.removeItem(CLAVE_PRODUCTOS)
  } catch {
    // si localStorage no está disponible, no hay nada que borrar
  }
}

/* ===================== Ayudantes ===================== */

/* Categorías únicas (sin repetir), para el filtro y el admin. */
export function obtenerCategorias(productos) {
  return [...new Set(productos.map((p) => p.categoria))]
}

/* Filtra por texto (nombre o código) y por categoría ("" = todas). */
export function filtrarProductos(productos, texto, categoria) {
  const buscado = texto.toLowerCase().trim()
  return productos.filter((p) => {
    const coincideTexto =
      p.nombre.toLowerCase().includes(buscado) || p.codigo.toLowerCase().includes(buscado)
    const coincideCategoria = categoria === '' || p.categoria === categoria
    return coincideTexto && coincideCategoria
  })
}

/* ¿Está en stock crítico? (stock menor o igual al mínimo) */
export function esStockCritico(producto) {
  return producto.stock <= producto.stockMinimo
}
