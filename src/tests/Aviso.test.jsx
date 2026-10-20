/* TIPOS: RENDERIZADO CONDICIONAL + MOCK de temporizadores (vi.useFakeTimers). */
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, afterEach } from 'vitest'
import { Aviso } from '../components/Aviso.jsx'

describe('Componente Aviso', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('no dibuja nada si no hay mensaje', () => {
    const { container } = render(<Aviso mensaje="" onCerrar={() => {}} />)
    expect(container).toBeEmptyDOMElement()
  })

  it('muestra el mensaje y llama a onCerrar a los 2,5 segundos', () => {
    vi.useFakeTimers()   // "reloj falso": no hay que esperar 2,5 s de verdad
    const onCerrar = vi.fn()
    render(<Aviso mensaje="Producto añadido" onCerrar={onCerrar} />)

    expect(screen.getByRole('status')).toHaveTextContent('Producto añadido')
    vi.advanceTimersByTime(2400)
    expect(onCerrar).not.toHaveBeenCalled()
    vi.advanceTimersByTime(100)
    expect(onCerrar).toHaveBeenCalledTimes(1)
  })
})
