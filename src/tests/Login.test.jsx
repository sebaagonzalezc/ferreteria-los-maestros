/* TIPOS: ESTADO del formulario, RENDERIZADO CONDICIONAL de errores y EVENTOS (+ mock vi.fn). */
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { describe, it, expect, vi } from 'vitest'
import { Login } from '../pages/Login.jsx'

function dibujar(onIniciarSesion = vi.fn()) {
  render(
    <MemoryRouter>
      <Login onIniciarSesion={onIniciarSesion} />
    </MemoryRouter>,
  )
  return onIniciarSesion
}

describe('Página Login', () => {
  it('el estado del formulario cambia cuando el usuario escribe', async () => {
    dibujar()
    const correo = screen.getByLabelText('Correo')
    await userEvent.type(correo, 'ana@duoc.cl')
    expect(correo).toHaveValue('ana@duoc.cl')
  })

  it('muestra errores SOLO después de intentar enviar vacío', async () => {
    dibujar()
    expect(screen.queryByText('El correo es obligatorio.')).not.toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: 'Iniciar sesión' }))
    expect(screen.getByText('El correo es obligatorio.')).toBeInTheDocument()
    expect(screen.getByText('La contraseña es obligatoria.')).toBeInTheDocument()
  })

  it('con datos incorrectos avisa y NO inicia sesión', async () => {
    const onIniciarSesion = dibujar()
    await userEvent.type(screen.getByLabelText('Correo'), 'admin@duoc.cl')
    await userEvent.type(screen.getByLabelText('Contraseña'), 'malaclave')
    await userEvent.click(screen.getByRole('button', { name: 'Iniciar sesión' }))
    expect(screen.getByRole('alert')).toHaveTextContent('Correo o contraseña incorrectos.')
    expect(onIniciarSesion).not.toHaveBeenCalled()
  })

  it('con datos correctos llama a onIniciarSesion con el usuario (sin contraseña)', async () => {
    const onIniciarSesion = dibujar()
    await userEvent.type(screen.getByLabelText('Correo'), 'admin@duoc.cl')
    await userEvent.type(screen.getByLabelText('Contraseña'), 'admin123')
    await userEvent.click(screen.getByRole('button', { name: 'Iniciar sesión' }))
    expect(onIniciarSesion).toHaveBeenCalledWith({
      correo: 'admin@duoc.cl',
      nombre: 'Ana',
      rol: 'administrador',
    })
  })
})
