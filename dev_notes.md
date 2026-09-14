# dev_notes — Notas de desarrollo

Cosas por saber, decisiones tomadas y pendientes. Ir actualizando con el equipo.

## Estado actual (Entrega 1 — frontend)

- [x] Tienda pública: home, productos, detalle, carrito, registro, login, nosotros, blogs (+2), contacto.
- [x] Admin: dashboard, mantenedor de productos (listado + nuevo + editar), mantenedor de usuarios (listado + nuevo + editar).
- [x] CSS externo y responsive (Bootstrap 5 + estilos propios).
- [x] Validaciones JS de todos los formularios con las reglas del enunciado.
- [x] Carrito con `localStorage` (agregar, cambiar cantidad, eliminar, cupón, total).
- [x] Login por roles (admin/vendedor/cliente) y protección de las vistas admin.

## Decisiones importantes

- **Sin backend todavía.** Los productos, usuarios y regiones están en arreglos JS
  (`js/datos-*.js`). En próximas entregas esto lo reemplaza Spring Boot + MySQL.
- **El "guardar" de los formularios del admin solo valida y muestra éxito.** No
  persiste (no hay BD). Es lo esperado para la Entrega 1.
- **Contraseñas en texto plano** en `datos-usuarios.js`: es solo para la demo.
  NUNCA se hace en producción; luego irá con JWT + hash en el backend.
- **Imágenes de producto:** usamos un ícono de Bootstrap por categoría como
  placeholder, para no depender de archivos de imagen. Se pueden reemplazar por
  fotos reales agregando un campo `imagen` a cada producto.

## Validación del RUN (importante para probar)

El validador calcula el **dígito verificador real** (módulo 11). Por eso, para
probar hay que usar RUTs válidos, sin puntos ni guion. Ejemplos válidos:

- `123456785`
- `51266633`
- `90684809`

(El "19011022K" que aparece como ejemplo en el enunciado es solo formato; su DV
real es 2, no K, así que ese sería rechazado — es correcto que lo rechace.)

## Cupones de descuento (carrito)

- `MAESTRO10` → 10%
- `BIENVENIDO` → 5%

## Pendientes / por cambiar

- [ ] Reemplazar íconos por imágenes reales de productos (opcional).
- [ ] Agregar más comunas por región si se necesita (ver `datos-regiones.js`).
- [ ] La vista de vendedor oculta "Usuarios"; falta la vista de "órdenes/pedidos"
      (mencionada en el enunciado) — queda para una próxima iteración.
- [ ] Página de carrito: el botón "Pagar" es una demo (muestra alerta y vacía).
- [ ] Documento ERS v1: completar con el equipo (hay un borrador aparte).
- [ ] Definir integrantes reales en `nosotros.html` (ahora son genéricos).

## Ideas para próximas entregas (según Forma E)

- Frontend en **React (SPA)**.
- Backend **Spring Boot** con microservicios y API REST/JSON.
- **MySQL** (mínimo 3FN).
- Autenticación con **JWT** y roles.
- Mapa con **Leaflet** (ubicación de la ferretería / zona de despacho).
- Flujo de pedidos y cuentas corrientes.
- Despliegue en **AWS** con **Docker**.

## Correcciones (14-sep-2026)

- **Bootstrap ahora es LOCAL** (`css/vendor/`, `js/vendor/`) en vez de CDN. El CDN
  (jsdelivr) estaba siendo bloqueado por la red/VPN → el CSS no cargaba y el sitio
  se veía descuadrado. Local funciona siempre, incluso offline.
- **Bug corregido en tienda.js**: a `tarjetaProductoHTML` le faltaba el `</div>` que
  cierra la columna, por lo que las tarjetas se anidaban unas dentro de otras y se
  estiraban gigantes. Ahora cierran las 4 etiquetas (mt-auto, card-body, card, col).
- Las imágenes de tarjeta/blog usan **altura fija** (no `aspect-ratio`) para evitar
  que se estiren dentro de tarjetas con `height:100%`.
