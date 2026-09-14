/* ============================================================
   tienda.js  —  Mostrar productos en la tienda
   ------------------------------------------------------------
   Se encarga de dibujar los productos del arreglo PRODUCTOS:
     - En el HOME (index.html): unos pocos productos "destacados".
     - En productos.html: todos, con buscador y filtro por categoría.

   Cada archivo detecta en qué página está mirando si existen ciertos
   contenedores (por su id). Si el contenedor no existe, no hace nada.
   ============================================================ */

/* Devuelve el HTML de UNA tarjeta de producto.
   La reutilizamos tanto en el home como en la página de productos. */
function tarjetaProductoHTML(p) {
  // ¿Está en stock crítico? (stock menor o igual al mínimo)
  const critico = p.stock <= p.stockMinimo;

  return '' +
  '<div class="col-6 col-md-4 col-lg-3">' +
    '<div class="card card-producto shadow-sm">' +
      // La imagen/ícono es un enlace al detalle del producto
      '<a href="detalle-producto.html?codigo=' + p.codigo + '" class="text-decoration-none">' +
        imagenProductoHTML(p, "imagen-producto card-img-top") +
      '</a>' +
      '<div class="card-body d-flex flex-column">' +
        '<small class="text-muted">' + p.categoria + '</small>' +
        '<h6 class="card-title">' +
          '<a href="detalle-producto.html?codigo=' + p.codigo + '" class="text-dark text-decoration-none">' +
            p.nombre +
          '</a>' +
        '</h6>' +
        (critico
          ? '<span class="badge badge-stock-critico mb-2 align-self-start">¡Últimas unidades!</span>'
          : '') +
        '<div class="mt-auto">' +
          '<p class="precio mb-2">' + formatearPrecio(p.precio) + '</p>' +
          '<button class="btn btn-marca w-100" onclick="anadirYAvisar(\'' + p.codigo + '\')">' +
            '<i class="bi bi-cart-plus"></i> Añadir' +
          '</button>' +
        '</div>' +   // cierra .mt-auto
      '</div>' +     // cierra .card-body
    '</div>' +       // cierra .card
  '</div>';          // cierra .col  (¡este faltaba! sin él las tarjetas se anidaban)
}

/* Añade al carrito y muestra el aviso flotante. */
function anadirYAvisar(codigo) {
  agregarAlCarrito(codigo, 1);              // función de carrito.js
  const p = buscarProducto(codigo);
  mostrarToast((p ? p.nombre : "Producto") + " añadido al carrito");
}

/* Dibuja una lista de productos dentro de un contenedor dado. */
function pintarProductos(lista, contenedor) {
  if (lista.length === 0) {
    contenedor.innerHTML =
      '<div class="col-12 text-center text-muted py-5">' +
        '<i class="bi bi-search fs-1"></i>' +
        '<p class="mt-2">No se encontraron productos.</p>' +
      '</div>';
    return;
  }
  // .map transforma cada producto en su HTML; .join("") los une en un solo texto.
  contenedor.innerHTML = lista.map(tarjetaProductoHTML).join("");
}

/* ============================================================
   AL CARGAR LA PÁGINA
   ============================================================ */
document.addEventListener("DOMContentLoaded", function () {

  /* --- HOME: productos destacados (los primeros 8) --- */
  const destacados = document.querySelector("#productos-destacados");
  if (destacados) {
    pintarProductos(PRODUCTOS.slice(0, 8), destacados);
  }

  /* --- PÁGINA DE PRODUCTOS: grilla + buscador + filtro --- */
  const grid = document.querySelector("#grid-productos");
  if (grid) {
    const buscador = document.querySelector("#buscador");
    const filtroCat = document.querySelector("#filtro-categoria");

    // Llenamos el <select> de categorías con las categorías únicas.
    if (filtroCat) {
      CATEGORIAS.forEach(function (cat) {
        const opcion = document.createElement("option");
        opcion.value = cat;
        opcion.textContent = cat;
        filtroCat.appendChild(opcion);
      });
    }

    // Función que aplica los filtros actuales y repinta.
    function aplicarFiltros() {
      const texto = (buscador ? buscador.value : "").toLowerCase().trim();
      const categoria = filtroCat ? filtroCat.value : "";

      const filtrados = PRODUCTOS.filter(function (p) {
        // ¿coincide el texto con el nombre o el código?
        const coincideTexto =
          p.nombre.toLowerCase().includes(texto) ||
          p.codigo.toLowerCase().includes(texto);
        // ¿coincide la categoría? ("" significa "todas")
        const coincideCat = categoria === "" || p.categoria === categoria;
        return coincideTexto && coincideCat;
      });

      pintarProductos(filtrados, grid);
      // Actualizamos el contador de resultados, si existe.
      const cont = document.querySelector("#contador-resultados");
      if (cont) cont.textContent = filtrados.length + " producto(s)";
    }

    // Escuchamos cambios en el buscador y el filtro (en tiempo real).
    if (buscador) buscador.addEventListener("input", aplicarFiltros);
    if (filtroCat) filtroCat.addEventListener("change", aplicarFiltros);

    // Primera pintada (todos los productos).
    aplicarFiltros();
  }
});
