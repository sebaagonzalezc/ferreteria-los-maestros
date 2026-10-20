/* TIPOS: RENDERIZADO DE LISTA (map) y RENDERIZADO CONDICIONAL (lista vacía). */
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, it, expect } from 'vitest'
import { GrillaProductos } from '../components/GrillaProductos.jsx'
import { PRODUCTOS_INICIALES } from '../data/productos.js'

describe('Componente GrillaProductos', () => {
  it('dibuja una tarjeta por cada producto del arreglo', () => {
    render(
      <MemoryRouter>
        <GrillaProductos productos={PRODUCTOS_INICIALES} onAgregar={() => {}} />
      </MemoryRouter>,
    )
    // Un botón "Añadir" por tarjeta
    expect(screen.getAllByRole('button', { name: /añadir/i })).toHaveLength(PRODUCTOS_INICIALES.length)
    PRODUCTOS_INICIALES.forEach((p) => {
      expect(screen.getByText(p.nombre)).toBeInTheDocument()
    })
  })

  it('muestra un aviso cuando la lista está vacía', () => {
    render(
      <MemoryRouter>
        <GrillaProductos productos={[]} onAgregar={() => {}} />
      </MemoryRouter>,
    )
    expect(screen.getByText('No se encontraron productos.')).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /añadir/i })).not.toBeInTheDocument()
  })
})
