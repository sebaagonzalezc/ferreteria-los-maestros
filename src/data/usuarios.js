/* ============================================================
   usuarios.js  —  Usuarios simulados (como una base de datos)
   ------------------------------------------------------------
   Tiene los usuarios de prueba de la entrega 1 y además guarda en
   localStorage los que se registran, para que después puedan
   iniciar sesión. Incluye CRUD para el panel de administración.

   ⚠️ SOLO DEMO ACADÉMICA: las contraseñas van en texto plano.
   En un sistema real irían encriptadas en el backend (Spring Boot).
   ============================================================ */

const CLAVE_USUARIOS = 'flm_usuarios'

export const USUARIOS_INICIALES = [
  { run: '111111111', nombre: 'Ana', apellidos: 'Administradora', correo: 'admin@duoc.cl', password: 'admin123', rol: 'administrador', region: 'Región de Coquimbo', comuna: 'La Serena', direccion: 'Av. Francisco de Aguirre 100' },
  { run: '222222222', nombre: 'Víctor', apellidos: 'Vendedor', correo: 'vendedor@duoc.cl', password: 'venta123', rol: 'vendedor', region: 'Región de Coquimbo', comuna: 'La Serena', direccion: 'Calle Balmaceda 200' },
  { run: '333333333', nombre: 'Carla', apellidos: 'Cliente', correo: 'cliente@gmail.com', password: 'cliente123', rol: 'cliente', region: 'Región de Coquimbo', comuna: 'Coquimbo', direccion: 'Pasaje Los Pinos 300' },
]

function leer() {
  try {
    const dato = localStorage.getItem(CLAVE_USUARIOS)
    return dato ? JSON.parse(dato) : [...USUARIOS_INICIALES]
  } catch {
    return [...USUARIOS_INICIALES]
  }
}

function guardar(lista) {
  try {
    localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(lista))
  } catch (error) {
    console.warn('No se pudieron guardar los usuarios:', error)
  }
}

/* LEER */
export function listarUsuarios() {
  return leer()
}

export function buscarUsuarioPorCorreo(correo) {
  const buscado = correo.trim().toLowerCase()
  return leer().find((u) => u.correo.toLowerCase() === buscado)
}

/* CREAR: el correo no se puede repetir. */
export function crearUsuario(usuario) {
  if (buscarUsuarioPorCorreo(usuario.correo)) {
    throw new Error('Ya existe una cuenta con ese correo.')
  }
  guardar([...leer(), usuario])
  return usuario
}

/* ACTUALIZAR (por correo, que identifica al usuario). */
export function actualizarUsuario(correo, cambios) {
  const lista = leer().map((u) => (u.correo === correo ? { ...u, ...cambios, correo } : u))
  guardar(lista)
  return lista.find((u) => u.correo === correo)
}

/* ELIMINAR */
export function eliminarUsuario(correo) {
  guardar(leer().filter((u) => u.correo !== correo))
}

export function reiniciarUsuarios() {
  try {
    localStorage.removeItem(CLAVE_USUARIOS)
  } catch {
    // nada que borrar
  }
}

/* LOGIN: devuelve los datos públicos del usuario (sin contraseña) o null. */
export function autenticar(correo, password) {
  const usuario = buscarUsuarioPorCorreo(correo)
  if (!usuario || usuario.password !== password) return null
  return { correo: usuario.correo, nombre: usuario.nombre, rol: usuario.rol }
}
