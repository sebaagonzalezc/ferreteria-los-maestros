/* TIPOS: PROPS, RENDERIZADO CONDICIONAL (con/sin sesión) y EVENTOS (+ mock vi.fn). */
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { describe, it, expect, vi } from 'vitest'
import { Header } from '../components/Header.jsx'

function dibujar(props) {
  return render(
    <MemoryRouter>
      <Header cantidadCarrito={0} sesion={null} onCerrarSesion={() => {}} {...props} />
    </MemoryRouter>,
  )
}

describe('Componente Header', () => {
  it('muestra la cantidad del carrito que recibe por props', () => {
    dibujar({ cantidadCarrito: 7 })
    expect(screen.getByTestId('contador-carrito')).toHaveTextContent('7')
  })

  it('sin sesión muestra "Iniciar sesión" y "Registrarse"', () => {
    dibujar()
    expect(screen.getByRole('link', { name: 'Iniciar sesión' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Registrarse' })).toBeInTheDocument()
  })

  it('con sesión saluda y "Cerrar sesión" ejecuta onCerrarSesion', async () => {
    const onCerrarSesion = vi.fn()
    dibujar({ sesion: { nombre: 'Ana', rol: 'administrador' }, onCerrarSesion })
    expect(screen.getByText('Hola, Ana')).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: 'Iniciar sesión' })).not.toBeInTheDocument()

    await userEvent.click(screen.getByRole('button', { name: 'Cerrar sesión' }))
    expect(onCerrarSesion).toHaveBeenCalledTimes(1)
  })
})
