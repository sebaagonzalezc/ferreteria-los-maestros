/* ============================================================
   comun.js  —  Funciones compartidas por TODAS las páginas
   ------------------------------------------------------------
   Aquí ponemos utilidades que se usan en varias páginas para no
   repetir código: formatear precios, dibujar la "imagen" de un
   producto, manejar la sesión del usuario y marcar el enlace activo
   del menú.

   Este archivo se carga en casi todas las páginas y SIEMPRE al final,
   para que las funciones de los otros archivos (carrito.js, etc.) ya
   existan cuando este las llame.
   ============================================================ */

/* --- Formatear un número como precio chileno: 5990 -> "$5.990" ---
   toLocaleString("es-CL") pone los puntos de miles a la chilena. */
function formatearPrecio(valor) {
  if (valor === 0) return "GRATIS";
  return "$" + valor.toLocaleString("es-CL");
}

/* --- Ícono (de Bootstrap Icons) según la categoría del producto ---
   Devuelve el nombre de una clase de ícono. Se usa como "imagen"
   placeholder para no depender de archivos de imagen. */
function iconoCategoria(categoria) {
  const iconos = {
    "Mat. Construcción": "bi-bricks",
    "Pinturas": "bi-palette-fill",
    "Herramientas": "bi-tools",
    "Gasfitería": "bi-droplet-fill",
    "Electricidad": "bi-lightning-charge-fill",
    "Tornillería": "bi-nut-fill",
    "Madera": "bi-tree-fill",
    "Seguridad": "bi-shield-fill-check",
    "Jardín": "bi-flower1"
  };
  // Si la categoría no está en la lista, usamos un ícono genérico.
  return iconos[categoria] || "bi-box-seam";
}

/* Devuelve el HTML de la "imagen" de un producto.
   - Siempre dibuja el recuadro con el ícono de la categoría (de respaldo).
   - Si el producto tiene "imagen", pone la foto ENCIMA cubriendo el recuadro.
   - Si la foto no carga (archivo faltante), onerror la quita y queda el ícono.
   claseExtra permite reutilizarlo con distintos tamaños. */
function imagenProductoHTML(producto, claseExtra) {
  const icono = '<i class="bi ' + iconoCategoria(producto.categoria) + '"></i>';
  const foto = producto.imagen
    ? '<img src="' + producto.imagen + '" alt="' + producto.nombre +
      '" class="img-cover" loading="lazy" onerror="this.remove()">'
    : '';
  return '<div class="' + claseExtra + '">' + icono + foto + '</div>';
}

/* --- Aviso flotante (toast) para dar feedback rápido ---
   Crea un mensajito verde abajo a la derecha que desaparece solo.
   Se usa, por ejemplo, al añadir un producto al carrito. */
function mostrarToast(texto) {
  let cont = document.querySelector("#zona-toasts");
  if (!cont) {
    // Si no existe el contenedor, lo creamos una vez.
    cont = document.createElement("div");
    cont.id = "zona-toasts";
    cont.style.cssText =
      "position:fixed; bottom:1rem; right:1rem; z-index:1080; display:flex; flex-direction:column; gap:.5rem;";
    document.body.appendChild(cont);
  }
  const toast = document.createElement("div");
  toast.className = "alert alert-success shadow-sm mb-0";
  toast.innerHTML = '<i class="bi bi-check-circle-fill"></i> ' + texto;
  cont.appendChild(toast);
  // Lo quitamos después de 2.5 segundos.
  setTimeout(function () { toast.remove(); }, 2500);
}

/* ============================================================
   SESIÓN DEL USUARIO
   Guardamos en localStorage quién inició sesión, para saber su rol
   y mostrar/ocultar cosas. (Login real vendrá en próximas entregas.)
   ============================================================ */
const CLAVE_SESION = "flm_sesion";

function guardarSesion(usuario) {
  try {
    localStorage.setItem(CLAVE_SESION, JSON.stringify(usuario));
  } catch (e) {
    console.warn("No se pudo guardar la sesión:", e);
  }
}

function obtenerSesion() {
  try {
    const dato = localStorage.getItem(CLAVE_SESION);
    return dato ? JSON.parse(dato) : null;   // null = nadie ha iniciado sesión
  } catch (e) {
    return null;
  }
}

function cerrarSesion() {
  try {
    localStorage.removeItem(CLAVE_SESION);
  } catch (e) {}
  // Volvemos al home de la tienda.
  window.location.href = rutaBase() + "index.html";
}

/* Como el admin está en una subcarpeta (/admin/), las rutas hacia la
   raíz cambian. Esta función devuelve "" en la tienda y "../" en admin. */
function rutaBase() {
  return window.location.pathname.includes("/admin/") ? "../" : "";
}

/* ============================================================
   AL CARGAR CADA PÁGINA
   ============================================================ */
document.addEventListener("DOMContentLoaded", function () {

  // 1) Marcar como "activo" el enlace del menú que corresponde a esta página.
  //    Comparamos el nombre de archivo actual con el href de cada enlace.
  const paginaActual = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-link").forEach(function (enlace) {
    const destino = (enlace.getAttribute("href") || "").split("/").pop();
    if (destino === paginaActual) {
      enlace.classList.add("activo");
    }
  });

  // 2) Actualizar el contador del carrito en la navbar (si existe en la página).
  //    contarItemsCarrito() vive en carrito.js.
  if (typeof actualizarContadorCarrito === "function") {
    actualizarContadorCarrito();
  }

  // 3) Mostrar el nombre del usuario logeado y el botón "cerrar sesión"
  //    en los lugares que tengan estos id (si existen).
  const sesion = obtenerSesion();
  const zonaUsuario = document.querySelector("#zona-usuario");
  if (zonaUsuario) {
    if (sesion) {
      zonaUsuario.innerHTML =
        '<span class="me-2">Hola, ' + sesion.nombre + '</span>' +
        '<button class="btn btn-sm btn-outline-light" id="btn-salir">Cerrar sesión</button>';
      document.querySelector("#btn-salir").addEventListener("click", cerrarSesion);
    } else {
      zonaUsuario.innerHTML =
        '<a href="' + rutaBase() + 'login.html" class="me-2 text-decoration-none">Iniciar sesión</a>' +
        '<a href="' + rutaBase() + 'registro.html" class="text-decoration-none">Registrarse</a>';
    }
  }
});
