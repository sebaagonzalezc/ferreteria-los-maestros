/* TIPOS: ESTADO (validación en tiempo real y selects dependientes) y EVENTOS. */
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { describe, it, expect } from 'vitest'
import { Registro } from '../pages/Registro.jsx'
import { buscarUsuarioPorCorreo } from '../data/usuarios.js'

function dibujar() {
  render(
    <MemoryRouter>
      <Registro />
    </MemoryRouter>,
  )
}

describe('Página Registro', () => {
  it('valida el RUN mientras se escribe (tiempo real)', async () => {
    dibujar()
    const run = screen.getByLabelText(/RUN/)
    await userEvent.type(run, '19011022K')
    expect(run).toHaveClass('is-invalid')
    expect(screen.getByText('El RUN no es válido (dígito verificador incorrecto).')).toBeInTheDocument()

    await userEvent.clear(run)
    await userEvent.type(run, '123456785')
    expect(run).toHaveClass('is-valid')
  })

  it('al elegir una región se cargan sus comunas', async () => {
    dibujar()
    const comuna = screen.getByLabelText(/Comuna/)
    expect(comuna.querySelectorAll('option')).toHaveLength(1)   // solo "-- Seleccione --"

    await userEvent.selectOptions(screen.getByLabelText(/Región/), 'Región de Coquimbo')
    expect(screen.getByRole('option', { name: 'La Serena' })).toBeInTheDocument()
    expect(comuna.querySelectorAll('option').length).toBeGreaterThan(1)
  })

  it('con todo válido registra al usuario y muestra el mensaje de éxito', async () => {
    dibujar()
    await userEvent.type(screen.getByLabelText(/RUN/), '123456785')
    await userEvent.type(screen.getByLabelText(/^Nombre/), 'Segas')
    await userEvent.type(screen.getByLabelText(/Apellidos/), 'González')
    await userEvent.type(screen.getByLabelText(/^Correo/), 'segas@gmail.com')
    await userEvent.type(screen.getByLabelText(/^Contraseña/), 'abc12')
    await userEvent.type(screen.getByLabelText(/Confirmar/), 'abc12')
    await userEvent.selectOptions(screen.getByLabelText(/Región/), 'Región de Coquimbo')
    await userEvent.selectOptions(screen.getByLabelText(/Comuna/), 'La Serena')
    await userEvent.type(screen.getByLabelText(/Dirección/), 'Av. del Mar 123')
    await userEvent.click(screen.getByRole('button', { name: 'Registrar' }))

    expect(screen.getByRole('alert')).toHaveTextContent('¡Registro exitoso!')
    expect(buscarUsuarioPorCorreo('segas@gmail.com').nombre).toBe('Segas')
  })
})
