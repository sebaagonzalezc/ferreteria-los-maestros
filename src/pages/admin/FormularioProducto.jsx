import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { useFormulario } from '../../hooks/useFormulario.js'
import {
  actualizarProducto,
  buscarProducto,
  CATEGORIAS,
  crearProducto,
  UNIDADES,
} from '../../data/productos.js'
import {
  validarCodigoProducto,
  validarEntero,
  validarOpcional,
  validarPrecio,
  validarSeleccion,
  validarTexto,
} from '../../utils/validaciones.js'

/* Reglas del formulario (las mismas de la entrega 1, RF16). */
function validarProducto(v) {
  return {
    codigo: validarCodigoProducto(v.codigo),
    nombre: validarTexto(v.nombre, 100, 'El nombre'),
    descripcion: validarOpcional(v.descripcion, 500),
    precio: validarPrecio(v.precio),
    stock: validarEntero(v.stock, 'El stock'),
    stockMinimo: validarEntero(v.stockMinimo, 'El stock crítico', true),
    categoria: validarSeleccion(v.categoria, 'una categoría'),
  }
}

/* Convierte un producto en valores de formulario (los inputs trabajan con texto). */
function valoresDesde(producto) {
  return {
    codigo: producto?.codigo ?? '',
    nombre: producto?.nombre ?? '',
    descripcion: producto?.descripcion ?? '',
    marca: producto?.marca ?? '',
    subcategoria: producto?.subcategoria ?? '',
    unidad: producto?.unidad ?? 'Unidad',
    precio: producto ? String(producto.precio) : '',
    stock: producto ? String(producto.stock) : '',
    stockMinimo: producto ? String(producto.stockMinimo) : '',
    categoria: producto?.categoria ?? '',
    imagen: producto?.imagen ?? '',
  }
}

/* Un solo formulario para CREAR (/admin/productos/nuevo) y EDITAR
   (/admin/productos/:codigo/editar). Si la URL trae :codigo, es edición. */
export function FormularioProducto() {
  const { codigo } = useParams()
  const navegar = useNavigate()
  const esEdicion = Boolean(codigo)
  const productoOriginal = esEdicion ? buscarProducto(codigo) : undefined

  const form = useFormulario(valoresDesde(productoOriginal), validarProducto)
  const [error, setError] = useState('')

  if (esEdicion && !productoOriginal) {
    return (
      <div className="alert alert-warning">
        Producto no encontrado. <Link to="/admin/productos">Volver al listado</Link>.
      </div>
    )
  }

  function enviar(evento) {
    evento.preventDefault()
    form.marcarTodos()
    if (!form.esValido) return

    const v = form.valores
    const datos = {
      codigo: v.codigo.trim().toUpperCase(),
      nombre: v.nombre.trim(),
      descripcion: v.descripcion.trim(),
      marca: v.marca.trim(),
      subcategoria: v.subcategoria.trim(),
      unidad: v.unidad,
      precio: Number(v.precio),
      stock: Number(v.stock),
      stockMinimo: v.stockMinimo.trim() === '' ? 0 : Number(v.stockMinimo),
      categoria: v.categoria,
      imagen: v.imagen.trim(),
    }

    try {
      if (esEdicion) {
        actualizarProducto(codigo, datos)
      } else {
        crearProducto(datos)
      }
      navegar('/admin/productos', { state: { mensaje: `Producto "${datos.nombre}" guardado correctamente.` } })
    } catch (e) {
      setError(e.message)
    }
  }

  return (
    <>
      <div className="admin-topbar">
        <h1>{esEdicion ? 'Editar producto' : 'Nuevo producto'}</h1>
        <Link to="/admin/productos" className="btn btn-outline-secondary btn-sm">
          <i className="bi bi-arrow-left"></i> Volver
        </Link>
      </div>

      <div className="card shadow-sm">
        <div className="card-body p-4">
          <form noValidate onSubmit={enviar}>
            <div className="row g-3">
              <div className="col-md-4">
                <label htmlFor="prod-codigo" className="form-label">Código <span className="text-danger">*</span></label>
                <input type="text" id="prod-codigo" name="codigo" className={form.claseDe('codigo')}
                  placeholder="Ej: MC011 (mín. 3 caracteres)" disabled={esEdicion}
                  value={form.valores.codigo} onChange={form.cambiar} />
                <div className="invalid-feedback">{form.errorDe('codigo')}</div>
              </div>

              <div className="col-md-8">
                <label htmlFor="prod-nombre" className="form-label">Nombre <span className="text-danger">*</span></label>
                <input type="text" id="prod-nombre" name="nombre" className={form.claseDe('nombre')} maxLength={100}
                  value={form.valores.nombre} onChange={form.cambiar} />
                <div className="invalid-feedback">{form.errorDe('nombre')}</div>
              </div>

              <div className="col-12">
                <label htmlFor="prod-descripcion" className="form-label">Descripción (opcional)</label>
                <textarea id="prod-descripcion" name="descripcion" className={form.claseDe('descripcion')} rows={2} maxLength={500}
                  value={form.valores.descripcion} onChange={form.cambiar}></textarea>
                <div className="invalid-feedback">{form.errorDe('descripcion')}</div>
              </div>

              <div className="col-md-4">
                <label htmlFor="prod-categoria" className="form-label">Categoría <span className="text-danger">*</span></label>
                <select id="prod-categoria" name="categoria" className={form.claseDe('categoria', 'form-select')}
                  value={form.valores.categoria} onChange={form.cambiar}>
                  <option value="">-- Seleccione una categoría --</option>
                  {CATEGORIAS.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
                <div className="invalid-feedback">{form.errorDe('categoria')}</div>
              </div>

              <div className="col-md-4">
                <label htmlFor="prod-subcategoria" className="form-label">Subcategoría (opcional)</label>
                <input type="text" id="prod-subcategoria" name="subcategoria" className="form-control"
                  value={form.valores.subcategoria} onChange={form.cambiar} />
              </div>

              <div className="col-md-4">
                <label htmlFor="prod-marca" className="form-label">Marca (opcional)</label>
                <input type="text" id="prod-marca" name="marca" className="form-control"
                  value={form.valores.marca} onChange={form.cambiar} />
              </div>

              <div className="col-md-3">
                <label htmlFor="prod-precio" className="form-label">Precio <span className="text-danger">*</span></label>
                <input type="number" id="prod-precio" name="precio" className={form.claseDe('precio')} min={0} step="0.01"
                  placeholder="0 = gratis" value={form.valores.precio} onChange={form.cambiar} />
                <div className="invalid-feedback">{form.errorDe('precio')}</div>
              </div>

              <div className="col-md-3">
                <label htmlFor="prod-stock" className="form-label">Stock <span className="text-danger">*</span></label>
                <input type="number" id="prod-stock" name="stock" className={form.claseDe('stock')} min={0} step={1}
                  value={form.valores.stock} onChange={form.cambiar} />
                <div className="invalid-feedback">{form.errorDe('stock')}</div>
              </div>

              <div className="col-md-3">
                <label htmlFor="prod-stock-minimo" className="form-label">Stock crítico (opcional)</label>
                <input type="number" id="prod-stock-minimo" name="stockMinimo" className={form.claseDe('stockMinimo')} min={0} step={1}
                  value={form.valores.stockMinimo} onChange={form.cambiar} />
                <div className="invalid-feedback">{form.errorDe('stockMinimo')}</div>
              </div>

              <div className="col-md-3">
                <label htmlFor="prod-unidad" className="form-label">Unidad de venta</label>
                <select id="prod-unidad" name="unidad" className="form-select"
                  value={form.valores.unidad} onChange={form.cambiar}>
                  {UNIDADES.map((u) => <option key={u} value={u}>{u}</option>)}
                </select>
              </div>

              <div className="col-12">
                <label htmlFor="prod-imagen" className="form-label">Ruta de la imagen (opcional)</label>
                <input type="text" id="prod-imagen" name="imagen" className="form-control"
                  placeholder="Ej: /img/martillo.jpg (vacío = se muestra un ícono)"
                  value={form.valores.imagen} onChange={form.cambiar} />
              </div>
            </div>

            <button type="submit" className="btn btn-marca mt-4">
              <i className="bi bi-save"></i> Guardar producto
            </button>

            {error && <div className="alert alert-danger mt-3 mb-0" role="alert">{error}</div>}
          </form>
        </div>
      </div>
    </>
  )
}
