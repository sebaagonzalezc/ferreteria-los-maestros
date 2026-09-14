# Especificación de Requisitos de Software (ERS) — Versión 1 (borrador)

**Proyecto:** Sistema web Ferretería Los Maestros
**Asignatura:** DSY1104 – Desarrollo FullStack II (DuocUC)
**Documento:** Propuesta previa (versión 1) — a completar y refinar con el equipo durante el semestre.

> Nota: este es un **borrador base** para la Entrega 1. Complétenlo con los nombres del equipo, ajustes de alcance y lo que pida el/la docente. Está inspirado en el estándar IEEE 830 pero simplificado.

---

## 1. Introducción

### 1.1 Propósito
Definir los requisitos del sistema web para la Ferretería Los Maestros, que permitirá a clientes consultar el catálogo con stock, realizar pedidos, y al personal gestionar el inventario y los usuarios. Este documento sirve de guía para el desarrollo a lo largo del semestre.

### 1.2 Alcance
El sistema completo contempla una **tienda web** pública, un **panel de administración** y, en etapas posteriores, un **backend** con base de datos. La **Entrega 1** cubre el frontend estático (HTML, CSS y JavaScript) con datos simulados y validaciones, publicado en GitHub Pages.

### 1.3 Definiciones y siglas
- **SPA:** Single Page Application.
- **RBAC:** control de acceso basado en roles.
- **EPP:** elementos de protección personal.
- **Stock crítico:** nivel de inventario en o bajo el mínimo de reposición.
- **RUN/RUT:** identificador nacional chileno.

### 1.4 Referencias
- Documento de contexto "Forma E — Ferretería Los Maestros".
- Anexo 1: Instrucciones de la Evaluación Parcial 1.
- Catálogo de productos (planilla Excel).

---

## 2. Descripción general

### 2.1 Perspectiva del producto
Ferretería Los Maestros es un negocio familiar en La Serena (Región de Coquimbo) con 22 años de trayectoria y más de 800 productos. Hoy el stock se consulta por teléfono y el inventario se lleva en Excel, lo que genera pérdidas de ventas, información desactualizada y errores en las cuentas corrientes. El sistema busca digitalizar estos procesos.

### 2.2 Funciones principales (visión general)
- Consulta de catálogo con stock en tiempo real.
- Carrito y flujo de pedido (retiro en tienda o despacho).
- Gestión de inventario con alerta de stock crítico.
- Gestión de usuarios y roles.
- Historial de compras por cliente y cuentas corrientes (etapas posteriores).

### 2.3 Usuarios y roles
- **Administrador:** acceso total; gestiona usuarios, roles y todo el sistema.
- **Vendedor/Empleado:** gestiona inventario y pedidos; no gestiona usuarios.
- **Cliente/Contratista:** consulta catálogo, hace pedidos y ve su historial; con cuenta corriente, ve su saldo.

### 2.4 Restricciones
- Catálogo de más de 800 referencias.
- Usuarios con nivel técnico básico (interfaz intuitiva).
- Contratistas acceden desde móviles con señal variable (diseño responsive).
- Datos de cuentas corrientes son confidenciales entre clientes.

### 2.5 Supuestos y dependencias
- La ferretería cuenta con WiFi estable.
- En etapas posteriores se usará React, Spring Boot, MySQL y despliegue en la nube.

---

## 3. Requisitos específicos

### 3.1 Requisitos funcionales (RF)

**Tienda pública**
- RF01: El sistema mostrará una página de inicio con navegación, banner y productos destacados.
- RF02: El sistema listará los productos con imagen, nombre y precio.
- RF03: El usuario podrá ver el detalle de un producto.
- RF04: El usuario podrá buscar y filtrar productos por categoría.
- RF05: El usuario podrá agregar productos a un carrito y este persistirá (localStorage en Entrega 1).
- RF06: El sistema permitirá registrarse e iniciar sesión con validaciones.
- RF07: El sistema ofrecerá páginas de Nosotros, Blogs (con detalles) y Contacto.

**Administración**
- RF08: El acceso al panel estará protegido por autenticación y rol.
- RF09: El administrador podrá listar, crear y editar productos.
- RF10: El administrador podrá listar, crear y editar usuarios y asignar roles.
- RF11: El sistema mostrará alerta de stock crítico.
- RF12: El vendedor tendrá acceso restringido (sin gestión de usuarios).

**Validaciones (reglas de negocio)**
- RF13: Correos permitidos solo `@duoc.cl`, `@profesor.duoc.cl`, `@gmail.com` (máx 100).
- RF14: Contraseña entre 4 y 10 caracteres.
- RF15: RUN válido (dígito verificador), sin puntos ni guion, 7 a 9 caracteres.
- RF16: Producto: código (texto, mín 3), precio ≥ 0, stock entero ≥ 0, categoría requerida.
- RF17: Región y comuna dependientes (al cambiar región cambian las comunas).

### 3.2 Requisitos no funcionales (RNF)
- RNF01: **Responsive** en móvil (≥360px), tablet (≥768px) y escritorio (≥1280px).
- RNF02: Interfaz intuitiva y consistente en todas las páginas.
- RNF03: Código organizado (CSS externo, JS separado por responsabilidad).
- RNF04: Control de versiones en GitHub con commits claros.
- RNF05: Publicación accesible vía GitHub Pages (Entrega 1).
- RNF06 (futuro): Seguridad con JWT y contraseñas encriptadas.
- RNF07 (futuro): Base de datos normalizada (mínimo 3FN).

---

## 4. Alcance de la Entrega 1

Frontend funcional con: todas las vistas de tienda y administrador, datos en arreglos JS, carrito con localStorage, validaciones completas de formularios, diseño responsive, y publicación en GitHub Pages. Sin backend ni base de datos (previstos para entregas posteriores).

---

## 5. Equipo de trabajo

| Integrante | Rol en el proyecto |
|------------|--------------------|
| _(completar)_ | _(completar)_ |
| _(completar)_ | _(completar)_ |
| _(completar)_ | _(completar)_ |
| _(completar)_ | _(completar)_ |
