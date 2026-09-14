/* ============================================================
   admin.js  —  Lógica del panel de administrador
   ------------------------------------------------------------
   Se encarga de:
     - Proteger el panel: si no hay sesión de admin/vendedor, te manda
       al login (las vistas del admin están protegidas).
     - Aplicar permisos por rol (el vendedor no ve "Usuarios").
     - El menú lateral (sidebar) que se abre/cierra en el celular.
     - Los listados de productos y usuarios (tablas).
     - Precargar datos en el formulario cuando se está EDITANDO.
   ============================================================ */

document.addEventListener("DOMContentLoaded", function () {

  /* ---------- 1) PROTECCIÓN: solo admin o vendedor ---------- */
  const sesion = obtenerSesion();   // función de comun.js
  if (!sesion || (sesion.rol !== "administrador" && sesion.rol !== "vendedor")) {
    // No autorizado -> lo mandamos al login de la tienda.
    window.location.href = "../login.html";
    return;   // detenemos el resto del script
  }

  /* ---------- 2) PERMISOS POR ROL ----------
     El vendedor NO gestiona usuarios: ocultamos los elementos marcados
     con la clase .solo-admin. */
  if (sesion.rol === "vendedor") {
    document.querySelectorAll(".solo-admin").forEach(function (el) {
      el.style.display = "none";
    });
  }

  /* Mostrar el nombre del usuario logeado donde exista #nombre-admin. */
  const nombreAdmin = document.querySelector("#nombre-admin");
  if (nombreAdmin) nombreAdmin.textContent = sesion.nombre;

  const rolAdmin = document.querySelector("#rol-admin");
  if (rolAdmin) rolAdmin.textContent = sesion.rol;

  const saludo = document.querySelector("#saludo-nombre");
  if (saludo) saludo.textContent = sesion.nombre;

  /* Indicadores del dashboard (solo si existen en la página). */
  const statProd = document.querySelector("#stat-productos");
  if (statProd) statProd.textContent = PRODUCTOS.length;
  const statUsr = document.querySelector("#stat-usuarios");
  if (statUsr) statUsr.textContent = USUARIOS.length;
  const statCrit = document.querySelector("#stat-critico");
  if (statCrit) {
    // Contamos los productos cuyo stock está en o bajo el mínimo.
    const criticos = PRODUCTOS.filter(function (p) { return p.stock <= p.stockMinimo; });
    statCrit.textContent = criticos.length;
  }

  /* Botón "cerrar sesión" del panel. */
  const btnSalir = document.querySelector("#btn-salir-admin");
  if (btnSalir) btnSalir.addEventListener("click", cerrarSesion);

  /* ---------- 3) MENÚ LATERAL EN MÓVIL ----------
     El botón hamburguesa agrega/quita la clase que desliza el sidebar. */
  const btnMenu = document.querySelector("#btn-menu-movil");
  if (btnMenu) {
    btnMenu.addEventListener("click", function () {
      document.body.classList.toggle("sidebar-abierto");
    });
  }

  /* Marcar como activo el ítem del menú de la página actual. */
  const paginaActual = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".sidebar .nav-link").forEach(function (enlace) {
    const destino = (enlace.getAttribute("href") || "").split("/").pop();
    if (destino === paginaActual) enlace.classList.add("activo");
  });

  /* ---------- 4) LISTADO DE PRODUCTOS ---------- */
  const tablaProductos = document.querySelector("#tabla-productos tbody");
  if (tablaProductos) {
    tablaProductos.innerHTML = PRODUCTOS.map(function (p) {
      const critico = p.stock <= p.stockMinimo;
      return '<tr>' +
        '<td>' + p.codigo + '</td>' +
        '<td>' + p.nombre + '</td>' +
        '<td>' + p.categoria + '</td>' +
        '<td>' + formatearPrecio(p.precio) + '</td>' +
        '<td>' + p.stock +
          (critico ? ' <span class="badge bg-danger">Stock crítico</span>' : '') +
        '</td>' +
        '<td class="text-nowrap">' +
          '<a href="producto-editar.html?codigo=' + p.codigo + '" class="btn btn-sm btn-outline-primary" title="Editar">' +
            '<i class="bi bi-pencil"></i>' +
          '</a> ' +
          '<button class="btn btn-sm btn-outline-danger" title="Eliminar" onclick="eliminarFila(this)">' +
            '<i class="bi bi-trash"></i>' +
          '</button>' +
        '</td>' +
      '</tr>';
    }).join("");

    // Contador de productos, si existe.
    const cont = document.querySelector("#total-productos");
    if (cont) cont.textContent = PRODUCTOS.length;
  }

  /* ---------- 5) LISTADO DE USUARIOS ---------- */
  const tablaUsuarios = document.querySelector("#tabla-usuarios tbody");
  if (tablaUsuarios) {
    tablaUsuarios.innerHTML = USUARIOS.map(function (u) {
      return '<tr>' +
        '<td>' + u.nombre + '</td>' +
        '<td>' + u.correo + '</td>' +
        '<td><span class="badge bg-secondary text-capitalize">' + u.rol + '</span></td>' +
        '<td class="text-nowrap">' +
          '<a href="usuario-editar.html?correo=' + encodeURIComponent(u.correo) + '" class="btn btn-sm btn-outline-primary" title="Editar">' +
            '<i class="bi bi-pencil"></i>' +
          '</a> ' +
          '<button class="btn btn-sm btn-outline-danger" title="Eliminar" onclick="eliminarFila(this)">' +
            '<i class="bi bi-trash"></i>' +
          '</button>' +
        '</td>' +
      '</tr>';
    }).join("");

    const cont = document.querySelector("#total-usuarios");
    if (cont) cont.textContent = USUARIOS.length;
  }

  /* ---------- 6) EDITAR PRODUCTO: precargar el formulario ----------
     Si estamos en producto-editar.html?codigo=XXX, buscamos el producto
     y rellenamos los campos. (El <select> de categorías ya fue llenado
     por validaciones.js, que se carga antes que este archivo.) */
  const formProducto = document.querySelector("#form-producto");
  if (formProducto && window.location.pathname.includes("producto-editar")) {
    const codigo = new URLSearchParams(window.location.search).get("codigo");
    const p = PRODUCTOS.find(function (x) { return x.codigo === codigo; });
    if (p) {
      formProducto.querySelector("#prod-codigo").value = p.codigo;
      formProducto.querySelector("#prod-nombre").value = p.nombre;
      formProducto.querySelector("#prod-precio").value = p.precio;
      formProducto.querySelector("#prod-stock").value = p.stock;
      formProducto.querySelector("#prod-stock-critico").value = p.stockMinimo;
      formProducto.querySelector("#prod-categoria").value = p.categoria;
    }
  }

  /* ---------- 7) EDITAR USUARIO: precargar el formulario ---------- */
  const formUsuario = document.querySelector("#form-usuario");
  if (formUsuario && window.location.pathname.includes("usuario-editar")) {
    const correo = new URLSearchParams(window.location.search).get("correo");
    const u = USUARIOS.find(function (x) { return x.correo === correo; });
    if (u) {
      // Solo tenemos algunos datos en el arreglo de prueba; rellenamos esos.
      formUsuario.querySelector("#usr-nombre").value = u.nombre.split(" ")[0] || u.nombre;
      formUsuario.querySelector("#usr-correo").value = u.correo;
      const tipo = formUsuario.querySelector("#usr-tipo");
      if (tipo) tipo.value = u.rol.charAt(0).toUpperCase() + u.rol.slice(1);
    }
  }
});

/* Elimina (visualmente) la fila de una tabla al hacer clic en su botón.
   this = el botón; .closest("tr") sube hasta la fila que lo contiene. */
function eliminarFila(boton) {
  const fila = boton.closest("tr");
  if (fila) fila.remove();
}
