/* TIPO: pruebas de LÓGICA (funciones puras de validación).
   Entra un valor -> sale un mensaje ("" = válido). */
import { describe, it, expect } from 'vitest'
import {
  calcularDigitoVerificador,
  validarCodigoProducto,
  validarConfirmacion,
  validarCorreo,
  validarEntero,
  validarOpcional,
  validarPassword,
  validarPrecio,
  validarRun,
  validarTexto,
} from '../utils/validaciones.js'

describe('validarRun', () => {
  it('acepta un RUN con dígito verificador correcto', () => {
    expect(validarRun('123456785')).toBe('')
  })

  it('acepta K minúscula como dígito verificador', () => {
    // 10000013-K es un RUN válido; se escribe sin guion y con k minúscula
    expect(calcularDigitoVerificador('10000013')).toBe('K')
    expect(validarRun('10000013k')).toBe('')
  })

  it('rechaza un dígito verificador incorrecto', () => {
    expect(validarRun('19011022K')).toBe('El RUN no es válido (dígito verificador incorrecto).')
  })

  it('rechaza vacío, muy corto, muy largo y con puntos/guion', () => {
    expect(validarRun('')).toBe('El RUN es obligatorio.')
    expect(validarRun('12345')).toBe('El RUN debe tener al menos 7 caracteres.')
    expect(validarRun('1234567890')).toBe('El RUN no puede tener más de 9 caracteres.')
    expect(validarRun('12.345-6')).toMatch(/Formato inválido/)
  })
})

describe('validarCorreo', () => {
  it('acepta solo los dominios permitidos', () => {
    expect(validarCorreo('ana@duoc.cl')).toBe('')
    expect(validarCorreo('profe@profesor.duoc.cl')).toBe('')
    expect(validarCorreo('cliente@gmail.com')).toBe('')
    expect(validarCorreo('alguien@hotmail.com')).toMatch(/Solo se permiten/)
  })

  it('exige el correo', () => {
    expect(validarCorreo('   ')).toBe('El correo es obligatorio.')
  })
})

describe('validarPassword, validarConfirmacion y validarTexto', () => {
  it('la contraseña debe tener entre 4 y 10 caracteres', () => {
    expect(validarPassword('abc')).toMatch(/entre 4 y 10/)
    expect(validarPassword('abcd')).toBe('')
    expect(validarPassword('abcdefghijk')).toMatch(/entre 4 y 10/)
  })

  it('la confirmación debe coincidir', () => {
    expect(validarConfirmacion('abc12', 'abc13')).toBe('Las contraseñas no coinciden.')
    expect(validarConfirmacion('abc12', 'abc12')).toBe('')
  })

  it('valida texto obligatorio y largo máximo', () => {
    expect(validarTexto('', 50, 'El nombre')).toBe('El nombre es obligatorio.')
    expect(validarTexto('a'.repeat(51), 50, 'El nombre')).toBe('Máximo 50 caracteres.')
    expect(validarTexto('Segas', 50, 'El nombre')).toBe('')
  })
})

describe('Validaciones de producto (admin)', () => {
  it('código: obligatorio y mínimo 3 caracteres', () => {
    expect(validarCodigoProducto('')).toBe('El código es obligatorio.')
    expect(validarCodigoProducto('AB')).toBe('Mínimo 3 caracteres.')
    expect(validarCodigoProducto('MC001')).toBe('')
  })

  it('precio: número mayor o igual a 0 (0 = gratis, acepta decimales)', () => {
    expect(validarPrecio('')).toBe('El precio es obligatorio.')
    expect(validarPrecio('abc')).toBe('Debe ser un número.')
    expect(validarPrecio('-1')).toBe('El precio no puede ser negativo.')
    expect(validarPrecio('0')).toBe('')
    expect(validarPrecio('9990.5')).toBe('')
  })

  it('stock: entero >= 0; el stock crítico es opcional', () => {
    expect(validarEntero('', 'El stock')).toBe('El stock es obligatorio.')
    expect(validarEntero('2.5', 'El stock')).toBe('Debe ser un número entero.')
    expect(validarEntero('-3', 'El stock')).toBe('No puede ser negativo.')
    expect(validarEntero('10', 'El stock')).toBe('')
    expect(validarEntero('', 'El stock crítico', true)).toBe('')
  })

  it('descripción opcional con máximo de caracteres', () => {
    expect(validarOpcional('', 500)).toBe('')
    expect(validarOpcional('a'.repeat(501), 500)).toBe('Máximo 500 caracteres.')
  })
})
