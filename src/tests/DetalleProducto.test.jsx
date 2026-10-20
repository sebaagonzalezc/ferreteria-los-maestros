/* TIPOS: RENDERIZADO con parámetro de ruta (useParams), RENDERIZADO CONDICIONAL,
   ESTADO (cantidad) y EVENTOS (+ mock vi.fn).
   Para que useParams funcione, la página se dibuja dentro de <Routes>. */
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router'
import { describe, it, expect, vi } from 'vitest'
import { DetalleProducto } from '../pages/DetalleProducto.jsx'

function abrirDetalle(codigo, onAgregar = vi.fn()) {
  render(
    <MemoryRouter initialEntries={[`/producto/${codigo}`]}>
      <Routes>
        <Route path="/producto/:codigo" element={<DetalleProducto onAgregar={onAgregar} />} />
      </Routes>
    </MemoryRouter>,
  )
  return onAgregar
}

describe('Página DetalleProducto', () => {
  it('muestra el producto del código que viene en la URL', () => {
    abrirDetalle('HE001')
    expect(screen.getByRole('heading', { level: 1, name: 'Taladro percutor 650W 13mm' })).toBeInTheDocument()
    expect(screen.getByText('$79.990')).toBeInTheDocument()
    // Relacionados: el otro producto de "Herramientas"
    expect(screen.getByText('Martillo carpintero 500g')).toBeInTheDocument()
  })

  it('agrega la cantidad elegida al carrito', async () => {
    const onAgregar = abrirDetalle('HM001')
    const cantidad = screen.getByLabelText('Cantidad:')
    await userEvent.clear(cantidad)
    await userEvent.type(cantidad, '3')
    await userEvent.click(screen.getByRole('button', { name: /añadir al carrito/i }))
    expect(onAgregar).toHaveBeenCalledWith('HM001', 3)
  })

  it('avisa "stock crítico" cuando corresponde', () => {
    abrirDetalle('EL011')   // ampolleta: stock 8, mínimo 20
    expect(screen.getByText(/¡Solo quedan 8 unidad!/)).toBeInTheDocument()
  })

  it('si el código no existe muestra "Producto no encontrado"', () => {
    abrirDetalle('NOEXISTE')
    expect(screen.getByText(/Producto no encontrado/)).toBeInTheDocument()
  })
})
