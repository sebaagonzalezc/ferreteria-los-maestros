/* TIPOS: ESTADO del formulario, RENDERIZADO CONDICIONAL (errores / éxito) y EVENTOS. */
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import { Contacto } from '../pages/Contacto.jsx'

describe('Página Contacto', () => {
  it('al enviar vacío muestra los 3 errores', async () => {
    render(<Contacto />)
    await userEvent.click(screen.getByRole('button', { name: /enviar mensaje/i }))
    expect(screen.getByText('El nombre es obligatorio.')).toBeInTheDocument()
    expect(screen.getByText('El correo es obligatorio.')).toBeInTheDocument()
    expect(screen.getByText('El comentario es obligatorio.')).toBeInTheDocument()
  })

  it('con datos válidos muestra el éxito y limpia el formulario', async () => {
    render(<Contacto />)
    await userEvent.type(screen.getByLabelText(/Nombre completo/), 'Segas')
    await userEvent.type(screen.getByLabelText(/^Correo/), 'segas@duoc.cl')
    await userEvent.type(screen.getByLabelText(/Comentario/), 'Necesito cotizar cemento')
    await userEvent.click(screen.getByRole('button', { name: /enviar mensaje/i }))

    expect(screen.getByRole('status')).toHaveTextContent('¡Mensaje enviado!')
    expect(screen.getByLabelText(/Nombre completo/)).toHaveValue('')
  })
})
