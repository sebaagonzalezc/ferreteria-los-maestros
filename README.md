# Ferretería Los Maestros — Entrega 2 (React + Vite)

Proyecto académico **DSY1104 – Desarrollo FullStack II** (DuocUC).
Tienda web y panel de administración migrados de HTML/CSS/JS a **React 19 + Vite**, con **React Router**, **Bootstrap 5** y pruebas con **Vitest + Testing Library**. Todavía no hay backend: los datos están en archivos JavaScript con CRUD y se guardan en `localStorage`.

- **Sitio publicado:** _(link de Vercel)_
- **Versión anterior (Entrega 1, HTML):** commit `f2177b8`

## Cómo correrlo

```bash
npm install
npm run dev            # servidor de desarrollo (http://localhost:5173)
npm test               # 71 tests
npm run test:coverage  # informe de cobertura en coverage/index.html
npm run build          # versión de producción en dist/
```

### Usuarios de prueba

| Rol | Correo | Contraseña | Qué puede hacer |
|---|---|---|---|
| Administrador | admin@duoc.cl | admin123 | Panel completo: productos y usuarios |
| Vendedor | vendedor@duoc.cl | venta123 | Panel sin gestión de usuarios |
| Cliente | cliente@gmail.com | cliente123 | Solo la tienda |

Cupones del carrito: `MAESTRO10` (10 %) y `BIENVENIDO` (5 %).

## Rutas

| Ruta | Página |
|---|---|
| `/` | Inicio |
| `/productos` | Catálogo con buscador y filtro por categoría |
| `/producto/:codigo` | Detalle del producto |
| `/carrito` | Carrito con cupones |
| `/login`, `/registro` | Inicio de sesión y registro |
| `/nosotros`, `/blogs`, `/blogs/1`, `/blogs/2`, `/contacto` | Páginas informativas |
| `/admin` | Dashboard (solo administrador y vendedor) |
| `/admin/productos`, `/admin/productos/nuevo`, `/admin/productos/:codigo/editar` | CRUD de productos |
| `/admin/usuarios`, `/admin/usuarios/nuevo`, `/admin/usuarios/:correo/editar` | CRUD de usuarios (solo administrador) |

## Estructura

```
src/
├── components/   Componentes reutilizables (Header, Footer, TarjetaProducto, GrillaProductos, Aviso...)
├── pages/        Una página por ruta de la tienda
│   └── admin/    Panel de administración (layout con menú lateral, dashboard, CRUD)
├── data/         productos.js y usuarios.js (CRUD + localStorage), regiones.js
├── utils/        Funciones puras: carrito, formato, validaciones (RUN, correo...), sesión
├── hooks/        useFormulario: valores, errores y campos tocados de los formularios
├── tests/        16 archivos de prueba (Vitest + Testing Library)
├── App.jsx       Estado global (carrito, sesión, avisos) y rutas
└── main.jsx      Punto de entrada
public/img/       Imágenes de los productos
vercel.json       Redirige todas las rutas a index.html (necesario en una SPA)
```
