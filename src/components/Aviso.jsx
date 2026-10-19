import { useEffect } from 'react'

/* Aviso flotante ("toast") abajo a la derecha.
   - Si mensaje está vacío, no se dibuja nada (renderizado condicional).
   - useEffect programa que se cierre solo a los 2,5 segundos.
     El "return" del efecto cancela el temporizador si llega otro
     mensaje antes (así no se cierra uno nuevo antes de tiempo). */
export function Aviso({ mensaje, onCerrar }) {
  useEffect(() => {
    if (!mensaje) return
    const temporizador = setTimeout(onCerrar, 2500)
    return () => clearTimeout(temporizador)
  }, [mensaje, onCerrar])

  if (!mensaje) return null

  return (
    <div className="aviso-flotante">
      <div className="alert alert-success shadow-sm mb-0" role="status">
        <i className="bi bi-check-circle-fill"></i> {mensaje}
      </div>
    </div>
  )
}
