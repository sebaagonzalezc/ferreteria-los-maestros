/* Funciones pequeñas de formato que se usan en varias partes. */

/* Precio chileno: 5990 -> "$5.990". Si es 0, se muestra "GRATIS". */
export function formatearPrecio(valor) {
  if (valor === 0) return 'GRATIS'
  return '$' + valor.toLocaleString('es-CL')
}

/* Ícono de Bootstrap Icons según la categoría.
   Se muestra si el producto no tiene foto o si la foto no carga. */
export function iconoCategoria(categoria) {
  const iconos = {
    'Mat. Construcción': 'bi-bricks',
    'Pinturas': 'bi-palette-fill',
    'Herramientas': 'bi-tools',
    'Gasfitería': 'bi-droplet-fill',
    'Electricidad': 'bi-lightning-charge-fill',
    'Tornillería': 'bi-nut-fill',
    'Madera': 'bi-tree-fill',
    'Seguridad': 'bi-shield-fill-check',
    'Jardín': 'bi-flower1',
  }
  return iconos[categoria] || 'bi-box-seam'
}
