import { useState } from 'react'

/* ============================================================
   useFormulario  —  Hook propio para manejar formularios
   ------------------------------------------------------------
   Un "hook propio" es una función que empieza con "use" y usa otros
   hooks (aquí useState). Sirve para no repetir la misma lógica en
   Login, Registro, Contacto y los formularios del admin.

   Recibe:
     valoresIniciales -> { correo: '', password: '' , ... }
     validar          -> función que recibe los valores y devuelve
                         un objeto de errores { correo: 'mensaje', ... }

   Los ERRORES no se guardan en un estado aparte: se CALCULAN a partir
   de los valores en cada render. Así nunca quedan desactualizados.
   ============================================================ */
export function useFormulario(valoresIniciales, validar) {
  const [valores, setValores] = useState(valoresIniciales)
  // "tocados": qué campos ya editó el usuario (para no mostrar errores
  // en un formulario recién abierto).
  const [tocados, setTocados] = useState({})

  const errores = validar(valores)
  const esValido = Object.values(errores).every((mensaje) => !mensaje)

  /* Para el onChange de los inputs: usa el atributo "name" del input
     para saber qué campo cambió (validación en tiempo real). */
  function cambiar(evento) {
    const { name, value } = evento.target
    asignar(name, value)
  }

  /* Cambia un campo por código. marcarTocado = false sirve para limpiar
     un campo sin mostrarle error todavía (ej: la comuna al cambiar la región). */
  function asignar(campo, valor, marcarTocado = true) {
    setValores((actuales) => ({ ...actuales, [campo]: valor }))
    if (marcarTocado) {
      setTocados((actuales) => ({ ...actuales, [campo]: true }))
    }
  }

  /* Al enviar: marcamos todo como tocado para que se vean todos los errores. */
  function marcarTodos() {
    const todos = {}
    Object.keys(valoresIniciales).forEach((campo) => {
      todos[campo] = true
    })
    setTocados(todos)
  }

  function reiniciar() {
    setValores(valoresIniciales)
    setTocados({})
  }

  /* Clases de Bootstrap para un campo: rojo si tiene error, verde si está bien.
     Solo se colorea si el usuario ya lo tocó. */
  function claseDe(campo, base = 'form-control') {
    if (!tocados[campo]) return base
    return `${base} ${errores[campo] ? 'is-invalid' : 'is-valid'}`
  }

  return { valores, errores, tocados, esValido, cambiar, asignar, marcarTodos, reiniciar, claseDe }
}
