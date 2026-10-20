/* TIPOS: RENDERIZADO CONDICIONAL (vacío / con productos), PROPS, ESTADO (cupón) y EVENTOS. */
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { describe, it, expect, vi } from 'vitest'
import { Carrito } from '../pages/Carrito.jsx'

function dibujar(props) {
  const funciones = { onCambiarCantidad: vi.fn(), onEliminar: vi.fn(), onVaciar: vi.fn() }
  render(
    <MemoryRouter>
      <Carrito carrito={[]} {...funciones} {...props} />
    </MemoryRouter>,
  )
  return funciones
}

// 2 martillos ($7.990 c/u) + 1 cemento ($5.990) = $21.970
const carritoConProductos = [
  { codigo: 'HM001', cantidad: 2 },
  { codigo: 'MC001', cantidad: 1 },
]

describe('Página Carrito', () => {
  it('si está vacío muestra el mensaje de carrito vacío', () => {
    dibujar()
    expect(screen.getByText('Tu carrito está vacío.')).toBeInTheDocument()
  })

  it('lista los productos y calcula el total', () => {
    dibujar({ carrito: carritoConProductos })
    expect(screen.getByText('Martillo carpintero 500g')).toBeInTheDocument()
    expect(screen.getByText('Cemento Polpaico gris 25 kg')).toBeInTheDocument()
    expect(screen.getAllByText('$21.970')).toHaveLength(2)   // subtotal y total
  })

  it('aplica un cupón válido (estado propio de la página)', async () => {
    dibujar({ carrito: carritoConProductos })
    await userEvent.type(screen.getByLabelText('¿Tienes un cupón?'), 'MAESTRO10')
    await userEvent.click(screen.getByRole('button', { name: 'Aplicar' }))
    expect(screen.getByText('¡Cupón aplicado! 10% de descuento.')).toBeInTheDocument()
    expect(screen.getByText('-$2.197')).toBeInTheDocument()
    expect(screen.getByText('$19.773')).toBeInTheDocument()
  })

  it('rechaza un cupón inválido', async () => {
    dibujar({ carrito: carritoConProductos })
    await userEvent.type(screen.getByLabelText('¿Tienes un cupón?'), 'TRUCHO')
    await userEvent.click(screen.getByRole('button', { name: 'Aplicar' }))
    expect(screen.getByText('El cupón no es válido.')).toBeInTheDocument()
  })

  it('los botones avisan al padre: quitar y pagar', async () => {
    const { onEliminar, onVaciar } = dibujar({ carrito: carritoConProductos })
    await userEvent.click(screen.getByRole('button', { name: 'Quitar Martillo carpintero 500g' }))
    expect(onEliminar).toHaveBeenCalledWith('HM001')

    await userEvent.click(screen.getByRole('button', { name: /pagar/i }))
    expect(onVaciar).toHaveBeenCalledTimes(1)
    expect(screen.getByText('¡Gracias por tu compra!')).toBeInTheDocument()
  })
})
