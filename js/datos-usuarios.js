/* ============================================================
   datos-usuarios.js
   ------------------------------------------------------------
   Archivo SIMPLE con los usuarios de prueba para poder iniciar
   sesión. En la Entrega 1 no hay backend ni base de datos, así que
   los usuarios viven aquí, en un arreglo de JavaScript.

   ⚠️ Esto es SOLO para la demo académica. En un sistema real las
   contraseñas NUNCA se guardan así (irían encriptadas en el backend).
   En las próximas entregas esto lo reemplaza Spring Boot + MySQL + JWT.

   Cada usuario tiene:
     correo     -> sirve como nombre de usuario para entrar
     password   -> contraseña (texto plano, solo para la demo)
     nombre     -> nombre para saludarlo
     rol        -> "administrador", "vendedor" o "cliente"
                   El rol decide a dónde se le redirige tras el login
                   y qué puede ver (control de acceso por roles / RBAC).
   ============================================================ */

const USUARIOS = [
  {
    correo: "admin@duoc.cl",
    password: "admin123",
    nombre: "Ana Administradora",
    rol: "administrador"
  },
  {
    correo: "vendedor@duoc.cl",
    password: "venta123",
    nombre: "Víctor Vendedor",
    rol: "vendedor"
  },
  {
    correo: "cliente@gmail.com",
    password: "cliente123",
    nombre: "Carla Cliente",
    rol: "cliente"
  }
];
