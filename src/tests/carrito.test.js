/* TIPO: pruebas de LÓGICA (funciones puras del carrito) + MOCK con vi.spyOn. */
import { describe, it, expect, vi } from 'vitest'
import {
  agregarItem,
  calcularSubtotal,
  cambiarCantidadItem,
  contarItems,
  guardarCarrito,
  leerCarrito,
  porcentajeCupon,
  quitarItem,
} from '../utils/carrito.js'

const productos = [
  { codigo: 'A1', precio: 1000 },
  { codigo: 'B2', precio: 2500 },
]

describe('Lógica del carrito', () => {
  it('agrega un producto nuevo y suma la cantidad si ya estaba', () => {
    let carrito = agregarItem([], 'A1')
    expect(carrito).toEqual([{ codigo: 'A1', cantidad: 1 }])
    carrito = agregarItem(carrito, 'A1', 2)
    expect(carrito).toEqual([{ codigo: 'A1', cantidad: 3 }])
  })

  it('NO modifica el carrito original (función pura)', () => {
    const original = [{ codigo: 'A1', cantidad: 1 }]
    agregarItem(original, 'A1', 5)
    expect(original).toEqual([{ codigo: 'A1', cantidad: 1 }])
  })

  it('cambia la cantidad con mínimo 1 y quita productos', () => {
    const carrito = [{ codigo: 'A1', cantidad: 2 }, { codigo: 'B2', cantidad: 1 }]
    expect(cambiarCantidadItem(carrito, 'A1', '0')[0].cantidad).toBe(1)
    expect(cambiarCantidadItem(carrito, 'A1', 'abc')[0].cantidad).toBe(1)
    expect(quitarItem(carrito, 'A1')).toEqual([{ codigo: 'B2', cantidad: 1 }])
  })

  it('cuenta unidades y calcula el subtotal', () => {
    const carrito = [{ codigo: 'A1', cantidad: 2 }, { codigo: 'B2', cantidad: 1 }]
    expect(contarItems(carrito)).toBe(3)
    expect(calcularSubtotal(carrito, productos)).toBe(4500)
  })

  it('reconoce cupones válidos sin importar mayúsculas', () => {
    expect(porcentajeCupon(' maestro10 ')).toBe(0.1)
    expect(porcentajeCupon('INVENTADO')).toBeNull()
  })

  it('guarda el carrito en localStorage (espiando setItem con vi.spyOn)', () => {
    const espia = vi.spyOn(Storage.prototype, 'setItem')
    guardarCarrito([{ codigo: 'A1', cantidad: 2 }])
    expect(espia).toHaveBeenCalledWith('flm_carrito', JSON.stringify([{ codigo: 'A1', cantidad: 2 }]))
    expect(leerCarrito()).toEqual([{ codigo: 'A1', cantidad: 2 }])
    espia.mockRestore()
  })
})
