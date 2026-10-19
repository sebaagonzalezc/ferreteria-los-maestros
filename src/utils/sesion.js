/* Sesión del usuario guardada en localStorage
   (para que siga logeado aunque recargue la página).
   Se guarda solo { correo, nombre, rol }: nunca la contraseña. */

const CLAVE_SESION = 'flm_sesion'

export function leerSesion() {
  try {
    const dato = localStorage.getItem(CLAVE_SESION)
    return dato ? JSON.parse(dato) : null   // null = nadie ha iniciado sesión
  } catch {
    return null
  }
}

export function guardarSesion(usuario) {
  try {
    localStorage.setItem(CLAVE_SESION, JSON.stringify(usuario))
  } catch (error) {
    console.warn('No se pudo guardar la sesión:', error)
  }
}

export function borrarSesion() {
  try {
    localStorage.removeItem(CLAVE_SESION)
  } catch {
    // nada que borrar
  }
}
