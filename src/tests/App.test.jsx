/* TIPO: prueba de INTEGRACIÓN — varios componentes trabajando juntos.
   El estado del carrito vive en App: al añadir desde una tarjeta,
   debe subir el contador del Header (otro componente). */
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { describe, it, expect } from 'vitest'
import { App } from '../App.jsx'

describe('App (integración)', () => {
  it('añadir un producto actualiza el contador del Header y muestra el aviso', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    )
    expect(screen.getByTestId('contador-carrito')).toHaveTextContent('0')

    const botones = screen.getAllByRole('button', { name: /añadir/i })
    await userEvent.click(botones[0])
    await userEvent.click(botones[1])

    expect(screen.getByTestId('contador-carrito')).toHaveTextContent('2')
    expect(screen.getByRole('status')).toHaveTextContent('añadido al carrito')
  })

  it('una URL inexistente muestra la página 404', () => {
    render(
      <MemoryRouter initialEntries={['/no-existe']}>
        <App />
      </MemoryRouter>,
    )
    expect(screen.getByText('Página no encontrada')).toBeInTheDocument()
  })
})
