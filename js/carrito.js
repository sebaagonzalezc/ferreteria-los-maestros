/* ============================================================
   carrito.js  —  Carrito de compras con localStorage
   ------------------------------------------------------------
   La evaluación pide: implementar un carrito, añadir productos, y
   "Guardar información del carrito en LOCALSTORAGE" para que no se
   pierda al recargar o cambiar de página.

   ¿Qué es localStorage? Es una "cajita" del navegador donde se pueden
   guardar textos que sobreviven aunque cierres la pestaña. Solo guarda
   TEXTO, así que convertimos el carrito a texto con JSON.stringify al
   guardar, y de texto a objeto con JSON.parse al leer.

   Guardamos el carrito como un arreglo liviano: solo el código del
   producto y la cantidad. El resto de los datos (nombre, precio) los
   buscamos en el arreglo PRODUCTOS cuando hace falta.
     Ejemplo guardado: [ { "codigo": "MC001", "cantidad": 2 } ]
   ============================================================ */

const CLAVE_CARRITO = "flm_carrito";

/* Cupones de descuento válidos: código -> porcentaje (0.10 = 10%). */
const CUPONES = {
  "MAESTRO10": 0.10,
  "BIENVENIDO": 0.05
};

/* --- Leer el carrito desde localStorage --- */
function obtenerCarrito() {
  try {
    const dato = localStorage.getItem(CLAVE_CARRITO);
    return dato ? JSON.parse(dato) : [];   // si no hay nada, carrito vacío
  } catch (e) {
    return [];
  }
}

/* --- Guardar el carrito en localStorage --- */
function guardarCarrito(carrito) {
  try {
    localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
  } catch (e) {
    console.warn("No se pudo guardar el carrito:", e);
  }
  // Cada vez que cambia el carrito, refrescamos el contador de la navbar.
  actualizarContadorCarrito();
}

/* --- Buscar un producto por su código en el arreglo PRODUCTOS --- */
function buscarProducto(codigo) {
  // .find devuelve el primer elemento que cumpla la condición, o undefined.
  return PRODUCTOS.find(function (p) { return p.codigo === codigo; });
}

/* --- Añadir un producto al carrito ---
   Si ya estaba, le sube la cantidad; si no, lo agrega nuevo. */
function agregarAlCarrito(codigo, cantidad) {
  cantidad = cantidad || 1;
  const carrito = obtenerCarrito();

  const existente = carrito.find(function (item) { return item.codigo === codigo; });
  if (existente) {
    existente.cantidad += cantidad;
  } else {
    carrito.push({ codigo: codigo, cantidad: cantidad });
  }

  guardarCarrito(carrito);
}

/* --- Cambiar la cantidad de un producto (mínimo 1) --- */
function cambiarCantidad(codigo, nuevaCantidad) {
  nuevaCantidad = parseInt(nuevaCantidad, 10);
  if (isNaN(nuevaCantidad) || nuevaCantidad < 1) nuevaCantidad = 1;

  const carrito = obtenerCarrito();
  const item = carrito.find(function (i) { return i.codigo === codigo; });
  if (item) {
    item.cantidad = nuevaCantidad;
    guardarCarrito(carrito);
  }
}

/* --- Eliminar un producto del carrito --- */
function eliminarDelCarrito(codigo) {
  let carrito = obtenerCarrito();
  // .filter deja solo los que NO coinciden con el código a eliminar.
  carrito = carrito.filter(function (i) { return i.codigo !== codigo; });
  guardarCarrito(carrito);
}

/* --- Vaciar todo el carrito --- */
function vaciarCarrito() {
  guardarCarrito([]);
}

/* --- Contar cuántas unidades hay en total (para el globito de la navbar) --- */
function contarItemsCarrito() {
  return obtenerCarrito().reduce(function (suma, item) {
    return suma + item.cantidad;
  }, 0);
}

/* --- Actualizar el número del carrito en la navbar ---
   Busca TODOS los elementos con clase .contador-carrito y les pone el número. */
function actualizarContadorCarrito() {
  const total = contarItemsCarrito();
  document.querySelectorAll(".contador-carrito").forEach(function (el) {
    el.textContent = total;
  });
}

/* --- Calcular el subtotal (suma de precio x cantidad) --- */
function calcularSubtotal() {
  return obtenerCarrito().reduce(function (suma, item) {
    const producto = buscarProducto(item.codigo);
    return producto ? suma + producto.precio * item.cantidad : suma;
  }, 0);
}

/* ============================================================
   DIBUJAR LA PÁGINA DEL CARRITO (carrito.html)
   Solo corre si en la página existe el contenedor #lista-carrito.
   ============================================================ */
function renderizarCarrito() {
  const contenedor = document.querySelector("#lista-carrito");
  if (!contenedor) return;   // no estamos en carrito.html, no hacemos nada

  const carrito = obtenerCarrito();
  const zonaVacio = document.querySelector("#carrito-vacio");
  const zonaResumen = document.querySelector("#carrito-resumen");

  // Caso carrito vacío
  if (carrito.length === 0) {
    contenedor.innerHTML = "";
    if (zonaVacio) zonaVacio.classList.remove("d-none");
    if (zonaResumen) zonaResumen.classList.add("d-none");
    return;
  }

  if (zonaVacio) zonaVacio.classList.add("d-none");
  if (zonaResumen) zonaResumen.classList.remove("d-none");

  // Construimos una fila por cada producto del carrito.
  let html = "";
  carrito.forEach(function (item) {
    const p = buscarProducto(item.codigo);
    if (!p) return;
    const subtotalLinea = p.precio * item.cantidad;

    html +=
      '<div class="carrito-item d-flex align-items-center gap-3 border-bottom py-3">' +
        '<div class="imagen-mini"><i class="bi ' + iconoCategoria(p.categoria) + '"></i></div>' +
        '<div class="flex-grow-1">' +
          '<h6 class="mb-0">' + p.nombre + '</h6>' +
          '<small class="text-muted">' + p.codigo + ' · ' + formatearPrecio(p.precio) + ' c/u</small>' +
        '</div>' +
        '<input type="number" min="1" value="' + item.cantidad + '" ' +
               'class="form-control control-cantidad" ' +
               'onchange="cambiarCantidad(\'' + p.codigo + '\', this.value); renderizarCarrito();">' +
        '<div class="fw-bold" style="width:90px; text-align:right;">' + formatearPrecio(subtotalLinea) + '</div>' +
        '<button class="btn btn-sm btn-outline-danger" ' +
                'onclick="eliminarDelCarrito(\'' + p.codigo + '\'); renderizarCarrito();" title="Quitar">' +
          '<i class="bi bi-trash"></i>' +
        '</button>' +
      '</div>';
  });
  contenedor.innerHTML = html;

  // Recalcular totales (respetando un cupón aplicado, si lo hay).
  actualizarTotales();
}

/* Guarda el descuento aplicado en memoria mientras dure la página. */
let descuentoAplicado = 0;

function aplicarCupon() {
  const input = document.querySelector("#cupon");
  const mensaje = document.querySelector("#mensaje-cupon");
  if (!input) return;

  const codigo = input.value.trim().toUpperCase();

  if (CUPONES[codigo]) {
    descuentoAplicado = CUPONES[codigo];
    mensaje.className = "text-success small mt-1";
    mensaje.textContent = "¡Cupón aplicado! " + (descuentoAplicado * 100) + "% de descuento.";
  } else {
    descuentoAplicado = 0;
    mensaje.className = "text-danger small mt-1";
    mensaje.textContent = "El cupón no es válido.";
  }
  actualizarTotales();
}

function actualizarTotales() {
  const subtotal = calcularSubtotal();
  const descuento = Math.round(subtotal * descuentoAplicado);
  const total = subtotal - descuento;

  const elSub = document.querySelector("#subtotal");
  const elDesc = document.querySelector("#descuento");
  const elTotal = document.querySelector("#total");

  if (elSub) elSub.textContent = formatearPrecio(subtotal);
  if (elDesc) elDesc.textContent = "-" + formatearPrecio(descuento);
  if (elTotal) elTotal.textContent = formatearPrecio(total);
}

/* Al cargar la página del carrito, la dibujamos. */
document.addEventListener("DOMContentLoaded", renderizarCarrito);
