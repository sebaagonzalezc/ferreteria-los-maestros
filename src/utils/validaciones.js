/* ============================================================
   validaciones.js  —  Reglas de validación (funciones PURAS)
   ------------------------------------------------------------
   Son las mismas reglas de la entrega 1, pero ahora cada función
   solo RECIBE un valor y DEVUELVE un texto:
     ""        -> el valor es válido
     "mensaje" -> el error que se le muestra al usuario
   No tocan la pantalla: de eso se encarga React. Por eso son fáciles
   de probar con tests (entra un valor, sale un mensaje).
   ============================================================ */

/* Texto obligatorio con largo máximo. */
export function validarTexto(valor, maximo, nombreCampo) {
  const texto = valor.trim()
  if (texto === '') return `${nombreCampo} es obligatorio.`
  if (texto.length > maximo) return `Máximo ${maximo} caracteres.`
  return ''
}

/* Correo: obligatorio, máx 100 y solo dominios permitidos por el enunciado. */
export function validarCorreo(valor) {
  const correo = valor.trim()
  if (correo === '') return 'El correo es obligatorio.'
  if (correo.length > 100) return 'Máximo 100 caracteres.'
  const dominiosPermitidos = /^[^@\s]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/
  if (!dominiosPermitidos.test(correo)) {
    return 'Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com.'
  }
  return ''
}

/* Contraseña: obligatoria, entre 4 y 10 caracteres. */
export function validarPassword(valor) {
  if (valor === '') return 'La contraseña es obligatoria.'
  if (valor.length < 4 || valor.length > 10) return 'La contraseña debe tener entre 4 y 10 caracteres.'
  return ''
}

/* Confirmación: debe ser igual a la contraseña. */
export function validarConfirmacion(valor, password) {
  if (valor === '') return 'Repite la contraseña.'
  if (valor !== password) return 'Las contraseñas no coinciden.'
  return ''
}

/* Select obligatorio (región, comuna, categoría, tipo de usuario...). */
export function validarSeleccion(valor, queSeleccionar) {
  return valor === '' ? `Selecciona ${queSeleccionar}.` : ''
}

/* Calcula el dígito verificador de un RUN (algoritmo módulo 11). */
export function calcularDigitoVerificador(cuerpo) {
  let suma = 0
  let multiplicador = 2
  // Recorremos el cuerpo de derecha a izquierda.
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo.charAt(i), 10) * multiplicador
    multiplicador = multiplicador === 7 ? 2 : multiplicador + 1
  }
  const resto = 11 - (suma % 11)
  if (resto === 11) return '0'
  if (resto === 10) return 'K'
  return String(resto)
}

/* RUN: obligatorio, sin puntos ni guion, 7 a 9 caracteres y con
   dígito verificador correcto. Ej. válido: 123456785 */
export function validarRun(valor) {
  const run = valor.trim().toUpperCase()
  if (run === '') return 'El RUN es obligatorio.'
  if (run.length < 7) return 'El RUN debe tener al menos 7 caracteres.'
  if (run.length > 9) return 'El RUN no puede tener más de 9 caracteres.'
  if (!/^[0-9]+[0-9K]$/.test(run)) {
    return 'Formato inválido. Escríbelo sin puntos ni guion (ej: 123456785).'
  }
  const cuerpo = run.slice(0, -1)
  const dv = run.slice(-1)
  if (dv !== calcularDigitoVerificador(cuerpo)) {
    return 'El RUN no es válido (dígito verificador incorrecto).'
  }
  return ''
}
