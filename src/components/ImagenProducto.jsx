import { useState } from 'react'
import { iconoCategoria } from '../utils/formato.js'

/* "Imagen" de un producto:
   - Siempre dibuja el ícono de la categoría como respaldo.
   - Si el producto tiene foto, la pone encima.
   - Si la foto no carga, el estado fotoFallo pasa a true y la foto se quita.
   La prop className permite usarla con distintos tamaños (tarjeta o detalle). */
export function ImagenProducto({ producto, className }) {
  const [fotoFallo, setFotoFallo] = useState(false)

  return (
    <div className={className}>
      <i className={`bi ${iconoCategoria(producto.categoria)}`}></i>
      {producto.imagen && !fotoFallo && (
        <img
          src={producto.imagen}
          alt={producto.nombre}
          className="img-cover"
          loading="lazy"
          onError={() => setFotoFallo(true)}
        />
      )}
    </div>
  )
}
