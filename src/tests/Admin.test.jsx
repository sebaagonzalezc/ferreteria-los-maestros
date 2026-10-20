/* TIPOS: RENDERIZADO CONDICIONAL por rol (protección del panel), ESTADO,
   EVENTOS y MOCK de window.confirm con vi.spyOn.
   Se renderiza App completo en una ruta /admin con MemoryRouter. */
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { describe, it, expect, vi } from 'vitest'
import { App } from '../App.jsx'
import { guardarSesion } from '../utils/sesion.js'
import { buscarProducto } from '../data/productos.js'

const ADMIN = { correo: 'admin@duoc.cl', nombre: 'Ana', rol: 'administrador' }
const VENDEDOR = { correo: 'vendedor@duoc.cl', nombre: 'Víctor', rol: 'vendedor' }

function abrirEn(ruta, sesion) {
  if (sesion) guardarSesion(sesion)   // simula que ya inició sesión
  render(
    <MemoryRouter initialEntries={[ruta]}>
      <App />
    </MemoryRouter>,
  )
}

describe('Panel de administración', () => {
  it('sin sesión, /admin redirige al login', () => {
    abrirEn('/admin')
    expect(screen.getByRole('heading', { name: 'Iniciar sesión' })).toBeInTheDocument()
  })

  it('un cliente tampoco puede entrar al panel', () => {
    abrirEn('/admin', { correo: 'cliente@gmail.com', nombre: 'Carla', rol: 'cliente' })
    expect(screen.queryByText('¡Hola, Carla!')).not.toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Iniciar sesión' })).toBeInTheDocument()
  })

  it('el administrador ve el dashboard con la alerta de stock crítico', () => {
    abrirEn('/admin', ADMIN)
    expect(screen.getByText('¡Hola, Ana!')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /usuarios/i })).toBeInTheDocument()
    expect(screen.getByText('Productos con stock crítico')).toBeInTheDocument()
    expect(screen.getByText(/Ampolleta LED/)).toBeInTheDocument()
  })

  it('el vendedor NO ve "Usuarios" y si entra a la URL vuelve al dashboard', () => {
    abrirEn('/admin/usuarios', VENDEDOR)
    expect(screen.getByText('¡Hola, Víctor!')).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /usuarios/i })).not.toBeInTheDocument()
  })

  it('eliminar un producto pide confirmación (mock de window.confirm)', async () => {
    const confirmar = vi.spyOn(window, 'confirm').mockReturnValue(true)
    abrirEn('/admin/productos', ADMIN)
    await userEvent.click(screen.getByRole('button', { name: 'Eliminar Martillo carpintero 500g' }))

    expect(confirmar).toHaveBeenCalled()
    expect(screen.queryByText('Martillo carpintero 500g')).not.toBeInTheDocument()
    expect(buscarProducto('HM001')).toBeUndefined()
    confirmar.mockRestore()
  })

  it('si se cancela la confirmación, el producto NO se elimina', async () => {
    const confirmar = vi.spyOn(window, 'confirm').mockReturnValue(false)
    abrirEn('/admin/productos', ADMIN)
    await userEvent.click(screen.getByRole('button', { name: 'Eliminar Martillo carpintero 500g' }))
    expect(screen.getByText('Martillo carpintero 500g')).toBeInTheDocument()
    confirmar.mockRestore()
  })

  it('crear un producto: valida y luego lo guarda', async () => {
    abrirEn('/admin/productos/nuevo', ADMIN)
    await userEvent.click(screen.getByRole('button', { name: /guardar producto/i }))
    expect(screen.getByText('El código es obligatorio.')).toBeInTheDocument()

    await userEvent.type(screen.getByLabelText(/^Código/), 'SR001')
    await userEvent.type(screen.getByLabelText(/^Nombre/), 'Sierra de costilla')
    await userEvent.selectOptions(screen.getByLabelText(/^Categoría/), 'Herramientas')
    await userEvent.type(screen.getByLabelText(/^Precio/), '12990')
    await userEvent.type(screen.getByLabelText(/^Stock \*/), '15')
    await userEvent.click(screen.getByRole('button', { name: /guardar producto/i }))

    expect(screen.getByRole('status')).toHaveTextContent('Producto "Sierra de costilla" guardado correctamente.')
    expect(buscarProducto('SR001').precio).toBe(12990)
  })

  it('el admin crea un usuario vendedor y aparece en el listado', async () => {
    abrirEn('/admin/usuarios/nuevo', ADMIN)
    await userEvent.type(screen.getByLabelText(/RUN/), '123456785')
    await userEvent.type(screen.getByLabelText(/^Nombre/), 'Pedro')
    await userEvent.type(screen.getByLabelText(/Apellidos/), 'Pérez')
    await userEvent.type(screen.getByLabelText(/^Correo/), 'pedro@duoc.cl')
    await userEvent.selectOptions(screen.getByLabelText(/Tipo de usuario/), 'vendedor')
    await userEvent.selectOptions(screen.getByLabelText(/Región/), 'Región de Coquimbo')
    await userEvent.selectOptions(screen.getByLabelText(/Comuna/), 'Ovalle')
    await userEvent.type(screen.getByLabelText(/Dirección/), 'Calle Uno 123')
    await userEvent.type(screen.getByLabelText(/Contraseña/), 'pedro1')
    await userEvent.click(screen.getByRole('button', { name: /guardar usuario/i }))

    expect(screen.getByRole('status')).toHaveTextContent('Usuario Pedro guardado correctamente.')
    expect(screen.getByText('pedro@duoc.cl')).toBeInTheDocument()
  })

  it('el admin no puede eliminarse a sí mismo', () => {
    abrirEn('/admin/usuarios', ADMIN)
    expect(screen.getByRole('button', { name: 'Eliminar Ana' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Eliminar Carla' })).toBeEnabled()
  })

  it('editar un producto carga sus datos en el formulario', () => {
    abrirEn('/admin/productos/HM001/editar', ADMIN)
    expect(screen.getByLabelText(/^Nombre/)).toHaveValue('Martillo carpintero 500g')
    expect(screen.getByLabelText(/^Código/)).toBeDisabled()
  })
})
