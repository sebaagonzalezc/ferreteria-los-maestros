/* ============================================================
   validaciones.js  —  Validación de formularios con JavaScript
   ------------------------------------------------------------
   La evaluación pide validar los formularios con JS, con mensajes de
   error claros y validación "en tiempo real" (mientras el usuario
   escribe). Aquí están TODAS las validaciones, con las reglas exactas
   que aparecen en el documento de instrucciones.

   Cómo funciona en general:
     - Usamos las clases de Bootstrap: .is-invalid (rojo) y .is-valid
       (verde), más un <div class="invalid-feedback"> con el mensaje.
     - Cada campo tiene una función que devuelve true/false y pinta el
       estado. Se llama al escribir (tiempo real) y al enviar el form.
     - Al enviar, si TODO es válido, mostramos un mensaje de éxito.
       (No hay backend todavía, así que no se envía a ningún servidor.)
   ============================================================ */

/* ------------------------------------------------------------
   AYUDANTES GENERALES (se usan en todos los formularios)
   ------------------------------------------------------------ */

/* Marca un campo como inválido y muestra el mensaje debajo. */
function marcarError(input, mensaje) {
  input.classList.add("is-invalid");
  input.classList.remove("is-valid");
  // El mensaje va en el elemento .invalid-feedback que sigue al input.
  const feedback = input.parentElement.querySelector(".invalid-feedback");
  if (feedback) feedback.textContent = mensaje;
  return false;
}

/* Marca un campo como válido (verde). */
function marcarOk(input) {
  input.classList.add("is-valid");
  input.classList.remove("is-invalid");
  return true;
}

/* Valida un correo: requerido (según se indique), máx 100 y solo los
   dominios permitidos por el enunciado. */
function validarCorreoPermitido(input, requerido) {
  const valor = input.value.trim();

  if (requerido && valor === "") {
    return marcarError(input, "El correo es obligatorio.");
  }
  if (!requerido && valor === "") {
    return marcarOk(input);   // opcional y vacío = válido
  }
  if (valor.length > 100) {
    return marcarError(input, "Máximo 100 caracteres.");
  }
  // Expresión regular: algo@ y luego uno de los 3 dominios permitidos.
  const dominiosOk = /^[^@\s]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;
  if (!dominiosOk.test(valor)) {
    return marcarError(input, "Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com.");
  }
  return marcarOk(input);
}

/* Valida un campo de texto obligatorio con un largo máximo. */
function validarTextoRequerido(input, maximo, nombreCampo) {
  const valor = input.value.trim();
  if (valor === "") {
    return marcarError(input, nombreCampo + " es obligatorio.");
  }
  if (valor.length > maximo) {
    return marcarError(input, "Máximo " + maximo + " caracteres.");
  }
  return marcarOk(input);
}

/* ------------------------------------------------------------
   VALIDACIÓN DEL RUN (RUT chileno)
   Reglas del enunciado: requerido, sin puntos ni guion (ej 19011022K),
   mínimo 7 y máximo 9 caracteres, y debe ser un RUN VÁLIDO
   (el dígito verificador tiene que calzar).
   ------------------------------------------------------------ */
function validarRun(input) {
  const run = input.value.trim().toUpperCase();

  if (run === "") return marcarError(input, "El RUN es obligatorio.");
  if (run.length < 7) return marcarError(input, "El RUN debe tener al menos 7 caracteres.");
  if (run.length > 9) return marcarError(input, "El RUN no puede tener más de 9 caracteres.");

  // Debe ser: varios dígitos y un dígito verificador (número o K) al final.
  if (!/^[0-9]+[0-9K]$/.test(run)) {
    return marcarError(input, "Formato inválido. Escríbelo sin puntos ni guion (ej: 19011022K).");
  }

  const cuerpo = run.slice(0, -1);   // todo menos el último caracter
  const dv = run.slice(-1);          // el último caracter = dígito verificador

  // --- Cálculo del dígito verificador (algoritmo módulo 11) ---
  let suma = 0;
  let multiplicador = 2;
  // Recorremos el cuerpo de derecha a izquierda.
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo.charAt(i), 10) * multiplicador;
    multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
  }
  const resto = 11 - (suma % 11);
  let dvEsperado;
  if (resto === 11) dvEsperado = "0";
  else if (resto === 10) dvEsperado = "K";
  else dvEsperado = String(resto);

  if (dv !== dvEsperado) {
    return marcarError(input, "El RUN no es válido (dígito verificador incorrecto).");
  }
  return marcarOk(input);
}

/* ------------------------------------------------------------
   REGIONES Y COMUNAS (selects dependientes)
   Llena el select de regiones desde el arreglo REGIONES y hace que,
   al cambiar la región, se actualicen las comunas.
   ------------------------------------------------------------ */
function poblarRegionesComunas(idRegion, idComuna) {
  const selRegion = document.querySelector(idRegion);
  const selComuna = document.querySelector(idComuna);
  if (!selRegion || !selComuna) return;

  // Opción inicial de región.
  selRegion.innerHTML = '<option value="">-- Seleccione la región --</option>';
  REGIONES.forEach(function (r) {
    const op = document.createElement("option");
    op.value = r.nombre;
    op.textContent = r.nombre;
    selRegion.appendChild(op);
  });

  // Comuna parte vacía hasta que se elija una región.
  selComuna.innerHTML = '<option value="">-- Seleccione la comuna --</option>';

  // Cuando cambia la región, recargamos las comunas de esa región.
  selRegion.addEventListener("change", function () {
    selComuna.innerHTML = '<option value="">-- Seleccione la comuna --</option>';
    const region = REGIONES.find(function (r) { return r.nombre === selRegion.value; });
    if (region) {
      region.comunas.forEach(function (c) {
        const op = document.createElement("option");
        op.value = c;
        op.textContent = c;
        selComuna.appendChild(op);
      });
    }
  });
}

/* Muestra un mensaje de éxito en el contenedor #mensaje-form del formulario. */
function mostrarExito(form, texto) {
  let caja = form.querySelector(".mensaje-form");
  if (!caja) {
    caja = document.createElement("div");
    caja.className = "mensaje-form alert alert-success mt-3";
    form.appendChild(caja);
  }
  caja.className = "mensaje-form alert alert-success mt-3";
  caja.innerHTML = '<i class="bi bi-check-circle-fill"></i> ' + texto;
}

/* ============================================================
   AL CARGAR LA PÁGINA: conectamos cada formulario que exista.
   ============================================================ */
document.addEventListener("DOMContentLoaded", function () {

  /* ---------- 1) LOGIN (login.html) ---------- */
  const formLogin = document.querySelector("#form-login");
  if (formLogin) {
    const correo = formLogin.querySelector("#login-correo");
    const pass = formLogin.querySelector("#login-password");

    // Contraseña: requerida, entre 4 y 10 caracteres.
    function validarPassLogin() {
      const v = pass.value;
      if (v === "") return marcarError(pass, "La contraseña es obligatoria.");
      if (v.length < 4 || v.length > 10) return marcarError(pass, "La contraseña debe tener entre 4 y 10 caracteres.");
      return marcarOk(pass);
    }

    // Validación en tiempo real.
    correo.addEventListener("input", function () { validarCorreoPermitido(correo, true); });
    pass.addEventListener("input", validarPassLogin);

    formLogin.addEventListener("submit", function (e) {
      e.preventDefault();   // evita que la página se recargue
      const okCorreo = validarCorreoPermitido(correo, true);
      const okPass = validarPassLogin();

      if (okCorreo && okPass) {
        // Buscar el usuario en el arreglo USUARIOS (datos-usuarios.js).
        const usuario = USUARIOS.find(function (u) {
          return u.correo === correo.value.trim() && u.password === pass.value;
        });

        if (!usuario) {
          mostrarError(formLogin, "Correo o contraseña incorrectos.");
          return;
        }

        // Guardamos la sesión y redirigimos según el rol.
        guardarSesion(usuario);
        if (usuario.rol === "administrador" || usuario.rol === "vendedor") {
          window.location.href = "admin/index.html";
        } else {
          window.location.href = "index.html";
        }
      }
    });
  }

  /* ---------- 2) REGISTRO DE USUARIO (registro.html) ---------- */
  const formRegistro = document.querySelector("#form-registro");
  if (formRegistro) {
    poblarRegionesComunas("#reg-region", "#reg-comuna");

    const run = formRegistro.querySelector("#reg-run");
    const nombre = formRegistro.querySelector("#reg-nombre");
    const apellidos = formRegistro.querySelector("#reg-apellidos");
    const correo = formRegistro.querySelector("#reg-correo");
    const pass = formRegistro.querySelector("#reg-password");
    const pass2 = formRegistro.querySelector("#reg-password2");
    const region = formRegistro.querySelector("#reg-region");
    const comuna = formRegistro.querySelector("#reg-comuna");
    const direccion = formRegistro.querySelector("#reg-direccion");

    function validarPass() {
      if (pass.value === "") return marcarError(pass, "La contraseña es obligatoria.");
      if (pass.value.length < 4 || pass.value.length > 10) return marcarError(pass, "Entre 4 y 10 caracteres.");
      return marcarOk(pass);
    }
    function validarPass2() {
      if (pass2.value === "") return marcarError(pass2, "Repite la contraseña.");
      if (pass2.value !== pass.value) return marcarError(pass2, "Las contraseñas no coinciden.");
      return marcarOk(pass2);
    }
    function validarSelect(sel, nombreCampo) {
      if (sel.value === "") return marcarError(sel, "Selecciona " + nombreCampo + ".");
      return marcarOk(sel);
    }

    // Tiempo real
    run.addEventListener("input", function () { validarRun(run); });
    nombre.addEventListener("input", function () { validarTextoRequerido(nombre, 50, "El nombre"); });
    apellidos.addEventListener("input", function () { validarTextoRequerido(apellidos, 100, "Los apellidos"); });
    correo.addEventListener("input", function () { validarCorreoPermitido(correo, true); });
    pass.addEventListener("input", validarPass);
    pass2.addEventListener("input", validarPass2);
    region.addEventListener("change", function () { validarSelect(region, "una región"); });
    comuna.addEventListener("change", function () { validarSelect(comuna, "una comuna"); });
    direccion.addEventListener("input", function () { validarTextoRequerido(direccion, 300, "La dirección"); });

    formRegistro.addEventListener("submit", function (e) {
      e.preventDefault();
      // Validamos TODO y juntamos los resultados.
      const resultados = [
        validarRun(run),
        validarTextoRequerido(nombre, 50, "El nombre"),
        validarTextoRequerido(apellidos, 100, "Los apellidos"),
        validarCorreoPermitido(correo, true),
        validarPass(),
        validarPass2(),
        validarSelect(region, "una región"),
        validarSelect(comuna, "una comuna"),
        validarTextoRequerido(direccion, 300, "La dirección")
      ];
      // .every comprueba que TODOS sean true.
      if (resultados.every(Boolean)) {
        mostrarExito(formRegistro, "¡Registro exitoso! Ya puedes iniciar sesión.");
        formRegistro.reset();
        formRegistro.querySelectorAll(".is-valid").forEach(function (el) { el.classList.remove("is-valid"); });
      }
    });
  }

  /* ---------- 3) CONTACTO (contacto.html) ---------- */
  const formContacto = document.querySelector("#form-contacto");
  if (formContacto) {
    const nombre = formContacto.querySelector("#con-nombre");
    const correo = formContacto.querySelector("#con-correo");
    const comentario = formContacto.querySelector("#con-comentario");

    function validarComentario() {
      const v = comentario.value.trim();
      if (v === "") return marcarError(comentario, "El comentario es obligatorio.");
      if (v.length > 500) return marcarError(comentario, "Máximo 500 caracteres.");
      return marcarOk(comentario);
    }

    nombre.addEventListener("input", function () { validarTextoRequerido(nombre, 100, "El nombre"); });
    correo.addEventListener("input", function () { validarCorreoPermitido(correo, true); });
    comentario.addEventListener("input", validarComentario);

    formContacto.addEventListener("submit", function (e) {
      e.preventDefault();
      const ok = [
        validarTextoRequerido(nombre, 100, "El nombre"),
        validarCorreoPermitido(correo, true),
        validarComentario()
      ].every(Boolean);
      if (ok) {
        mostrarExito(formContacto, "¡Mensaje enviado! Te responderemos pronto.");
        formContacto.reset();
        formContacto.querySelectorAll(".is-valid").forEach(function (el) { el.classList.remove("is-valid"); });
      }
    });
  }

  /* ---------- 4) PRODUCTO (admin: nuevo / editar) ---------- */
  const formProducto = document.querySelector("#form-producto");
  if (formProducto) {
    // Llenamos el select de categorías (desde datos-productos.js).
    const selCat = formProducto.querySelector("#prod-categoria");
    if (selCat && typeof CATEGORIAS !== "undefined") {
      CATEGORIAS.forEach(function (c) {
        const op = document.createElement("option");
        op.value = c; op.textContent = c;
        selCat.appendChild(op);
      });
    }

    const codigo = formProducto.querySelector("#prod-codigo");
    const nombre = formProducto.querySelector("#prod-nombre");
    const descripcion = formProducto.querySelector("#prod-descripcion");
    const precio = formProducto.querySelector("#prod-precio");
    const stock = formProducto.querySelector("#prod-stock");
    const stockCritico = formProducto.querySelector("#prod-stock-critico");

    // Código: requerido, texto, mínimo 3 caracteres.
    function validarCodigo() {
      const v = codigo.value.trim();
      if (v === "") return marcarError(codigo, "El código es obligatorio.");
      if (v.length < 3) return marcarError(codigo, "Mínimo 3 caracteres.");
      return marcarOk(codigo);
    }
    // Precio: requerido, min 0 (0 = FREE), acepta decimales.
    function validarPrecio() {
      const v = precio.value.trim();
      if (v === "") return marcarError(precio, "El precio es obligatorio.");
      const n = Number(v);
      if (isNaN(n)) return marcarError(precio, "Debe ser un número.");
      if (n < 0) return marcarError(precio, "El precio no puede ser negativo.");
      return marcarOk(precio);
    }
    // Stock: requerido, min 0, solo enteros.
    function validarStock() {
      const v = stock.value.trim();
      if (v === "") return marcarError(stock, "El stock es obligatorio.");
      const n = Number(v);
      if (!Number.isInteger(n)) return marcarError(stock, "Debe ser un número entero.");
      if (n < 0) return marcarError(stock, "No puede ser negativo.");
      return marcarOk(stock);
    }
    // Stock crítico: OPCIONAL, min 0, solo enteros.
    function validarStockCritico() {
      const v = stockCritico.value.trim();
      if (v === "") return marcarOk(stockCritico);   // opcional
      const n = Number(v);
      if (!Number.isInteger(n)) return marcarError(stockCritico, "Debe ser un número entero.");
      if (n < 0) return marcarError(stockCritico, "No puede ser negativo.");
      return marcarOk(stockCritico);
    }
    // Descripción: OPCIONAL, máx 500.
    function validarDescripcion() {
      if (descripcion.value.trim().length > 500) return marcarError(descripcion, "Máximo 500 caracteres.");
      return marcarOk(descripcion);
    }
    function validarCategoria() {
      if (selCat.value === "") return marcarError(selCat, "Selecciona una categoría.");
      return marcarOk(selCat);
    }

    // Tiempo real
    codigo.addEventListener("input", validarCodigo);
    nombre.addEventListener("input", function () { validarTextoRequerido(nombre, 100, "El nombre"); });
    descripcion.addEventListener("input", validarDescripcion);
    precio.addEventListener("input", validarPrecio);
    stock.addEventListener("input", validarStock);
    stockCritico.addEventListener("input", validarStockCritico);
    selCat.addEventListener("change", validarCategoria);

    formProducto.addEventListener("submit", function (e) {
      e.preventDefault();
      const ok = [
        validarCodigo(),
        validarTextoRequerido(nombre, 100, "El nombre"),
        validarDescripcion(),
        validarPrecio(),
        validarStock(),
        validarStockCritico(),
        validarCategoria()
      ].every(Boolean);
      if (ok) {
        mostrarExito(formProducto, "Producto guardado correctamente.");
      }
    });
  }

  /* ---------- 5) USUARIO (admin: nuevo / editar) ---------- */
  const formUsuario = document.querySelector("#form-usuario");
  if (formUsuario) {
    poblarRegionesComunas("#usr-region", "#usr-comuna");

    const run = formUsuario.querySelector("#usr-run");
    const nombre = formUsuario.querySelector("#usr-nombre");
    const apellidos = formUsuario.querySelector("#usr-apellidos");
    const correo = formUsuario.querySelector("#usr-correo");
    const tipo = formUsuario.querySelector("#usr-tipo");
    const region = formUsuario.querySelector("#usr-region");
    const comuna = formUsuario.querySelector("#usr-comuna");
    const direccion = formUsuario.querySelector("#usr-direccion");

    function validarSelect(sel, nombreCampo) {
      if (sel.value === "") return marcarError(sel, "Selecciona " + nombreCampo + ".");
      return marcarOk(sel);
    }

    run.addEventListener("input", function () { validarRun(run); });
    nombre.addEventListener("input", function () { validarTextoRequerido(nombre, 50, "El nombre"); });
    apellidos.addEventListener("input", function () { validarTextoRequerido(apellidos, 100, "Los apellidos"); });
    correo.addEventListener("input", function () { validarCorreoPermitido(correo, true); });
    tipo.addEventListener("change", function () { validarSelect(tipo, "un tipo de usuario"); });
    region.addEventListener("change", function () { validarSelect(region, "una región"); });
    comuna.addEventListener("change", function () { validarSelect(comuna, "una comuna"); });
    direccion.addEventListener("input", function () { validarTextoRequerido(direccion, 300, "La dirección"); });

    formUsuario.addEventListener("submit", function (e) {
      e.preventDefault();
      const ok = [
        validarRun(run),
        validarTextoRequerido(nombre, 50, "El nombre"),
        validarTextoRequerido(apellidos, 100, "Los apellidos"),
        validarCorreoPermitido(correo, true),
        validarSelect(tipo, "un tipo de usuario"),
        validarSelect(region, "una región"),
        validarSelect(comuna, "una comuna"),
        validarTextoRequerido(direccion, 300, "La dirección")
      ].every(Boolean);
      if (ok) {
        mostrarExito(formUsuario, "Usuario guardado correctamente.");
      }
    });
  }
});

/* Muestra un mensaje de ERROR (rojo) al final de un formulario. */
function mostrarError(form, texto) {
  let caja = form.querySelector(".mensaje-form");
  if (!caja) {
    caja = document.createElement("div");
    caja.className = "mensaje-form alert alert-danger mt-3";
    form.appendChild(caja);
  }
  caja.className = "mensaje-form alert alert-danger mt-3";
  caja.innerHTML = '<i class="bi bi-exclamation-triangle-fill"></i> ' + texto;
}
