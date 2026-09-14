/* ============================================================
   datos-regiones.js
   ------------------------------------------------------------
   Arreglo de regiones de Chile con sus comunas. La evaluación pide:
   "Mostrar las regiones que están en un arreglo de JS" y "al cambiar
   una región, también cambiaría la búsqueda de las comunas".

   Estructura: un arreglo de objetos, cada uno con:
     nombre  -> nombre de la región
     comunas -> arreglo de comunas de esa región

   No están TODAS las comunas de Chile (son cientos); es una muestra
   representativa e incluye la Región de Coquimbo, donde está la
   ferretería (La Serena). Puedes agregar más siguiendo el mismo formato.
   ============================================================ */

const REGIONES = [
  {
    nombre: "Región de Arica y Parinacota",
    comunas: ["Arica", "Camarones", "Putre", "General Lagos"]
  },
  {
    nombre: "Región de Tarapacá",
    comunas: ["Iquique", "Alto Hospicio", "Pozo Almonte", "Pica"]
  },
  {
    nombre: "Región de Antofagasta",
    comunas: ["Antofagasta", "Calama", "Tocopilla", "Mejillones", "Taltal"]
  },
  {
    nombre: "Región de Coquimbo",
    comunas: ["La Serena", "Coquimbo", "Ovalle", "Vicuña", "Illapel", "Andacollo", "Salamanca"]
  },
  {
    nombre: "Región de Valparaíso",
    comunas: ["Valparaíso", "Viña del Mar", "Quilpué", "Villa Alemana", "San Antonio", "Quillota", "Los Andes"]
  },
  {
    nombre: "Región Metropolitana de Santiago",
    comunas: ["Santiago", "Providencia", "Las Condes", "Maipú", "Puente Alto", "La Florida", "Ñuñoa", "Recoleta"]
  },
  {
    nombre: "Región del Libertador B. O'Higgins",
    comunas: ["Rancagua", "San Fernando", "Rengo", "Machalí", "Santa Cruz"]
  },
  {
    nombre: "Región del Maule",
    comunas: ["Talca", "Curicó", "Linares", "Longaví", "Constitución", "Cauquenes"]
  },
  {
    nombre: "Región de Ñuble",
    comunas: ["Chillán", "Chillán Viejo", "Bulnes", "Quirihue", "San Carlos"]
  },
  {
    nombre: "Región del Biobío",
    comunas: ["Concepción", "Talcahuano", "Los Ángeles", "Coronel", "Chiguayante", "San Pedro de la Paz"]
  },
  {
    nombre: "Región de La Araucanía",
    comunas: ["Temuco", "Padre Las Casas", "Villarrica", "Angol", "Pucón", "Victoria"]
  },
  {
    nombre: "Región de Los Ríos",
    comunas: ["Valdivia", "La Unión", "Río Bueno", "Panguipulli", "Los Lagos"]
  },
  {
    nombre: "Región de Los Lagos",
    comunas: ["Puerto Montt", "Osorno", "Castro", "Ancud", "Puerto Varas"]
  },
  {
    nombre: "Región de Aysén",
    comunas: ["Coyhaique", "Aysén", "Chile Chico", "Cochrane"]
  },
  {
    nombre: "Región de Magallanes",
    comunas: ["Punta Arenas", "Puerto Natales", "Porvenir", "Puerto Williams"]
  }
];
