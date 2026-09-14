# Ferretería Los Maestros — Entrega 1 (Frontend)

Proyecto académico **DSY1104 – Desarrollo FullStack II** (DuocUC).
Tienda web + panel de administración construidos con **HTML5, CSS externo (Bootstrap 5) y JavaScript** puro. Sin backend todavía: los datos viven en arreglos de JavaScript y el carrito usa `localStorage`.

## Cómo ver el sitio

Abre `index.html` en el navegador (doble clic) o publícalo en GitHub Pages.
La página de inicio del **administrador** está en `admin/index.html` (requiere iniciar sesión).

### Usuarios de prueba (para el login)

| Rol           | Correo               | Contraseña   |
|---------------|----------------------|--------------|
| Administrador | admin@duoc.cl        | admin123     |
| Vendedor      | vendedor@duoc.cl     | venta123     |
| Cliente       | cliente@gmail.com    | cliente123   |

## Estructura

```
/
├── index.html              Home de la tienda
├── productos.html          Listado de productos (buscador + filtro)
├── detalle-producto.html   Detalle (lee ?codigo= de la URL)
├── carrito.html            Carrito de compras (localStorage)
├── registro.html           Registro de usuario (validado)
├── login.html              Inicio de sesión (validado)
├── nosotros.html           Sobre la empresa
├── blogs.html              Listado de blogs
├── blog-1.html / blog-2.html  Detalles de blog
├── contacto.html           Formulario de contacto (validado)
├── admin/                  Panel de administración (protegido por login)
│   ├── index.html          Dashboard
│   ├── productos.html      Mantenedor de productos (listado)
│   ├── producto-nuevo.html / producto-editar.html
│   ├── usuarios.html       Mantenedor de usuarios (listado)
│   └── usuario-nuevo.html / usuario-editar.html
├── css/
│   ├── estilos.css         Estilos de la tienda
│   └── admin.css           Estilos del panel admin
├── css/vendor/             Bootstrap y Bootstrap Icons (locales, no CDN)
├── js/vendor/              Bootstrap JS (local, no CDN)
└── js/
    ├── datos-productos.js  Arreglo con el catálogo (del Excel real)
    ├── datos-usuarios.js   Usuarios de prueba para el login
    ├── datos-regiones.js   Regiones y comunas de Chile
    ├── comun.js            Utilidades compartidas + sesión
    ├── carrito.js          Carrito con localStorage
    ├── tienda.js           Render de productos y filtros
    ├── detalle.js          Render del detalle de producto
    ├── validaciones.js     Validación de todos los formularios (incl. RUN)
    └── admin.js            Lógica del panel admin
```

## Equipo

Estudiantes DSY1104. Ver `dev_notes.md` para el estado del desarrollo y pendientes.
