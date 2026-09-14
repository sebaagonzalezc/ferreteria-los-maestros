/* ============================================================
   detalle.js  —  Página de detalle de un producto
   ------------------------------------------------------------
   El detalle sabe QUÉ producto mostrar leyendo el código desde la URL.
   Cuando entras a "detalle-producto.html?codigo=MC001", la parte
   "?codigo=MC001" se llama "query string". La leemos con URLSearchParams.
   ============================================================ */

document.addEventListener("DOMContentLoaded", function () {
  const contenedor = document.querySelector("#detalle-producto");
  if (!contenedor) return;   // no estamos en la página de detalle

  // 1) Leer el código desde la URL.
  const params = new URLSearchParams(window.location.search);
  const codigo = params.get("codigo");

  // 2) Buscar el producto en el arreglo.
  const p = buscarProducto(codigo);   // función de carrito.js

  // 3) Si no existe (código inventado o sin código), mostramos un aviso.
  if (!p) {
    contenedor.innerHTML =
      '<div class="alert alert-warning">' +
        'Producto no encontrado. <a href="productos.html">Volver a productos</a>.' +
      '</div>';
    return;
  }

  const critico = p.stock <= p.stockMinimo;

  // 4) Dibujar el detalle. Descripción generada a partir de los datos.
  contenedor.innerHTML = '' +
    '<nav aria-label="ruta" class="mb-3">' +
      '<ol class="breadcrumb">' +
        '<li class="breadcrumb-item"><a href="index.html">Inicio</a></li>' +
        '<li class="breadcrumb-item"><a href="productos.html">Productos</a></li>' +
        '<li class="breadcrumb-item active">' + p.nombre + '</li>' +
      '</ol>' +
    '</nav>' +
    '<div class="row g-4">' +
      // Columna izquierda: imagen
      '<div class="col-md-6">' +
        imagenProductoHTML(p, "detalle-imagen") +
      '</div>' +
      // Columna derecha: datos y botón
      '<div class="col-md-6">' +
        '<span class="badge bg-secondary mb-2">' + p.categoria + ' · ' + p.subcategoria + '</span>' +
        '<h1 class="h3 fw-bold">' + p.nombre + '</h1>' +
        '<p class="text-muted mb-1">Marca: <strong>' + p.marca + '</strong> · Código: ' + p.codigo + '</p>' +
        '<p class="precio fs-2 fw-bold" style="color:#e8590c;">' + formatearPrecio(p.precio) + '</p>' +
        '<p>' +
          'Producto de la categoría <strong>' + p.categoria + '</strong> (' + p.subcategoria + '), ' +
          'marca ' + p.marca + '. Se vende por ' + p.unidad.toLowerCase() + '. ' +
          'Ideal para tus proyectos de construcción y mantención.' +
        '</p>' +
        // Estado de stock
        (p.stock > 0
          ? '<p class="' + (critico ? "text-danger" : "text-success") + '">' +
              '<i class="bi bi-box-seam"></i> ' +
              (critico ? "¡Solo quedan " + p.stock + " " + p.unidad.toLowerCase() + "!" : "En stock (" + p.stock + " disponibles)") +
            '</p>'
          : '<p class="text-danger"><i class="bi bi-x-circle"></i> Sin stock</p>') +
        // Selector de cantidad + botón añadir
        '<div class="d-flex align-items-center gap-2 my-3" style="max-width:320px;">' +
          '<label for="cantidad" class="form-label mb-0">Cantidad:</label>' +
          '<input type="number" id="cantidad" class="form-control" value="1" min="1" max="' + p.stock + '" style="width:90px;">' +
          '<button class="btn btn-marca flex-grow-1" id="btn-anadir">' +
            '<i class="bi bi-cart-plus"></i> Añadir al carrito' +
          '</button>' +
        '</div>' +
        '<a href="productos.html" class="btn btn-outline-secondary btn-sm">' +
          '<i class="bi bi-arrow-left"></i> Seguir comprando' +
        '</a>' +
      '</div>' +
    '</div>';

  // 5) Conectar el botón "Añadir al carrito" con la cantidad elegida.
  document.querySelector("#btn-anadir").addEventListener("click", function () {
    const cantidad = parseInt(document.querySelector("#cantidad").value, 10) || 1;
    agregarAlCarrito(p.codigo, cantidad);
    mostrarToast(cantidad + " x " + p.nombre + " añadido(s) al carrito");
  });

  // 6) Productos relacionados (misma categoría, distinto código).
  const zonaRel = document.querySelector("#relacionados");
  if (zonaRel) {
    const relacionados = PRODUCTOS
      .filter(function (o) { return o.categoria === p.categoria && o.codigo !== p.codigo; })
      .slice(0, 4);
    zonaRel.innerHTML = relacionados.map(tarjetaProductoHTML).join("");
  }
});
