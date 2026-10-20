/* TIPO: pruebas de LÓGICA del archivo de datos (CRUD + filtros). */
import { describe, it, expect } from 'vitest'
import {
  actualizarProducto,
  buscarProducto,
  crearProducto,
  eliminarProducto,
  filtrarProductos,
  listarProductos,
  obtenerCategorias,
  PRODUCTOS_INICIALES,
} from '../data/productos.js'

describe('CRUD de productos', () => {
  it('lista el catálogo inicial', () => {
    expect(listarProductos()).toHaveLength(PRODUCTOS_INICIALES.length)
  })

  it('crea, actualiza y elimina un producto', () => {
    crearProducto({ codigo: 'TEST1', nombre: 'Sierra', categoria: 'Herramientas', precio: 15990, stock: 5, stockMinimo: 1 })
    expect(buscarProducto('TEST1').nombre).toBe('Sierra')

    actualizarProducto('TEST1', { precio: 12990 })
    expect(buscarProducto('TEST1').precio).toBe(12990)

    eliminarProducto('TEST1')
    expect(buscarProducto('TEST1')).toBeUndefined()
  })

  it('no permite repetir el código', () => {
    expect(() => crearProducto({ codigo: 'MC001', nombre: 'Duplicado' })).toThrow(/Ya existe/)
  })
})

describe('Filtros del catálogo', () => {
  it('filtra por texto (nombre o código) y por categoría', () => {
    const productos = listarProductos()
    expect(filtrarProductos(productos, 'taladro', '')).toHaveLength(1)
    expect(filtrarProductos(productos, 'mc001', '')).toHaveLength(1)
    expect(filtrarProductos(productos, '', 'Herramientas')).toHaveLength(2)
    expect(filtrarProductos(productos, 'xyz', '')).toHaveLength(0)
  })

  it('obtiene categorías sin repetir', () => {
    const categorias = obtenerCategorias(listarProductos())
    expect(categorias).toContain('Herramientas')
    expect(categorias.filter((c) => c === 'Herramientas')).toHaveLength(1)
  })
})
