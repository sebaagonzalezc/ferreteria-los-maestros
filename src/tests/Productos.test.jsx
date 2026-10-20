/* TIPOS: ESTADO (buscador y filtro) y EVENTOS (escribir y seleccionar). */
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { describe, it, expect } from 'vitest'
import { Productos } from '../pages/Productos.jsx'

function dibujar() {
  return render(
    <MemoryRouter>
      <Productos onAgregar={() => {}} />
    </MemoryRouter>,
  )
}

describe('Página Productos', () => {
  it('al escribir en el buscador, el estado cambia y se filtra la lista', async () => {
    dibujar()
    expect(screen.getByText('6 producto(s)')).toBeInTheDocument()

    const buscador = screen.getByLabelText('Buscar productos')
    await userEvent.type(buscador, 'taladro')

    expect(buscador).toHaveValue('taladro')
    expect(screen.getByText('1 producto(s)')).toBeInTheDocument()
    expect(screen.getByText('Taladro percutor 650W 13mm')).toBeInTheDocument()
    expect(screen.queryByText('Martillo carpintero 500g')).not.toBeInTheDocument()
  })

  it('al elegir una categoría muestra solo esos productos', async () => {
    dibujar()
    await userEvent.selectOptions(screen.getByLabelText('Filtrar por categoría'), 'Herramientas')
    expect(screen.getByText('2 producto(s)')).toBeInTheDocument()
  })

  it('si no hay coincidencias muestra "No se encontraron productos."', async () => {
    dibujar()
    await userEvent.type(screen.getByLabelText('Buscar productos'), 'zzz')
    expect(screen.getByText('No se encontraron productos.')).toBeInTheDocument()
  })
})
