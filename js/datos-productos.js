/* ============================================================
   datos-productos.js
   ------------------------------------------------------------
   El "catálogo" de la tienda como un ARREGLO de objetos.
   La evaluación pide justamente esto: "Crear un arreglo de productos
   y mostrar los productos del arreglo" mediante JavaScript.

   Cada producto es un OBJETO { } con estas propiedades:
     codigo, categoria, subcategoria, nombre, marca, unidad,
     precio (CLP), stock, stockMinimo (umbral de stock crítico)
     imagen -> ruta de la foto del producto (opcional)

   👉 PARA CAMBIAR LAS FOTOS: reemplaza el archivo dentro de la carpeta
      "img/" por tu propia imagen usando EL MISMO NOMBRE (ej: pon tu foto
      de un martillo como "img/martillo.jpg"). Si un producto no tiene
      "imagen", se muestra un ícono en su lugar.

   IMPORTANTE: este archivo solo DEFINE los datos. De mostrarlos se
   encargan tienda.js, detalle.js y admin.js.
   ============================================================ */

const PRODUCTOS = [
  { codigo: "MC001", categoria: "Mat. Construcción", subcategoria: "Cementos",    nombre: "Cemento Polpaico gris 25 kg",            marca: "Polpaico", unidad: "Saco",   precio: 5990,  stock: 80, stockMinimo: 20, imagen: "img/cemento.jpg" },
  { codigo: "PT001", categoria: "Pinturas",          subcategoria: "Látex",       nombre: "Pintura látex interior 1 galón blanco",  marca: "Sipa",     unidad: "Galón",  precio: 9990,  stock: 40, stockMinimo: 10, imagen: "img/pintura.jpg" },
  { codigo: "HM001", categoria: "Herramientas",      subcategoria: "Manuales",    nombre: "Martillo carpintero 500g",               marca: "Stanley",  unidad: "Unidad", precio: 7990,  stock: 20, stockMinimo: 5,  imagen: "img/martillo.jpg" },
  { codigo: "HE001", categoria: "Herramientas",      subcategoria: "Eléctricas",  nombre: "Taladro percutor 650W 13mm",             marca: "Makita",   unidad: "Unidad", precio: 79990, stock: 8,  stockMinimo: 2,  imagen: "img/taladro.jpg" },
  { codigo: "EL011", categoria: "Electricidad",      subcategoria: "Iluminación", nombre: "Ampolleta LED 9W E27 luz fría",          marca: "Philips",  unidad: "Unidad", precio: 3990,  stock: 8,  stockMinimo: 20, imagen: "img/ampolleta.jpg" }, // stock bajo el mínimo: se marca "crítico"
  { codigo: "GS007", categoria: "Gasfitería",        subcategoria: "Llaves",      nombre: "Llave de paso esfera 1/2\" latón",       marca: "Emmeti",   unidad: "Unidad", precio: 3490,  stock: 30, stockMinimo: 10, imagen: "img/llave-paso.jpg" }
];

/* Lista de categorías únicas, para los <select> de filtro y del admin. */
const CATEGORIAS = [...new Set(PRODUCTOS.map(p => p.categoria))];
