/* TIPOS: RENDERIZADO, PROPS, RENDERIZADO CONDICIONAL y EVENTOS (+ mock vi.fn).
   TarjetaProducto usa <Link>, por eso se envuelve en MemoryRouter. */
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { describe, it, expect, vi } from 'vitest'
import { TarjetaProducto } from '../components/TarjetaProducto.jsx'

const producto = {
  codigo: 'HM001',
  categoria: 'Herramientas',
  nombre: 'Martillo carpintero 500g',
  precio: 7990,
  stock: 20,
  stockMinimo: 5,
  imagen: '/img/martillo.jpg',
}

function dibujar(props) {
  return render(
    <MemoryRouter>
      <TarjetaProducto producto={producto} onAgregar={() => {}} {...props} />
    </MemoryRouter>,
  )
}

describe('Componente TarjetaProducto', () => {
  it('muestra los datos que recibe por props', () => {
    dibujar()
    expect(screen.getByText(producto.nombre)).toBeInTheDocument()
    expect(screen.getByText('$7.990')).toBeInTheDocument()
    expect(screen.getByAltText(producto.nombre)).toHaveAttribute('src', '/img/martillo.jpg')
    // La imagen y el nombre son links al detalle del producto (por eso son 2)
    const links = screen.getAllByRole('link', { name: producto.nombre })
    expect(links).toHaveLength(2)
    links.forEach((link) => expect(link).toHaveAttribute('href', '/producto/HM001'))
  })

  it('al hacer clic en "Añadir" llama a onAgregar con el código (vi.fn)', async () => {
    const onAgregar = vi.fn()
    dibujar({ onAgregar })
    await userEvent.click(screen.getByRole('button', { name: /añadir/i }))
    expect(onAgregar).toHaveBeenCalledTimes(1)
    expect(onAgregar).toHaveBeenCalledWith('HM001')
  })

  it('muestra "¡Últimas unidades!" SOLO si el stock es crítico', () => {
    const { unmount } = dibujar()
    expect(screen.queryByText('¡Últimas unidades!')).not.toBeInTheDocument()
    unmount()

    dibujar({ producto: { ...producto, stock: 3 } })
    expect(screen.getByText('¡Últimas unidades!')).toBeInTheDocument()
  })
})
