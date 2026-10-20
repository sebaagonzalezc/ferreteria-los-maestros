/* TIPO: RENDERIZADO de las páginas informativas (como el test de Inicio del profe).
   it.each repite el mismo test con distintos datos. */
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, it, expect } from 'vitest'
import { Nosotros } from '../pages/Nosotros.jsx'
import { Blogs } from '../pages/Blogs.jsx'
import { Blog1 } from '../pages/Blog1.jsx'
import { Blog2 } from '../pages/Blog2.jsx'

describe('Páginas informativas', () => {
  it.each([
    ['Nosotros', <Nosotros />, 'Sobre nosotros'],
    ['Blogs', <Blogs />, 'Noticias y datos curiosos'],
    ['Blog 1', <Blog1 />, 'El cemento que "respira"'],
    ['Blog 2', <Blog2 />, 'Herramientas que duran toda la vida'],
  ])('%s se renderiza con su título', (_nombre, pagina, titulo) => {
    render(<MemoryRouter>{pagina}</MemoryRouter>)
    expect(screen.getByRole('heading', { level: 1, name: titulo })).toBeInTheDocument()
  })
})
