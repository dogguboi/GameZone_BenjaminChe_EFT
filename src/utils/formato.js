/**
 * Funciones de apoyo reutilizables en varios componentes.
 */

/**
 * Convierte un numero a formato de precio chileno. Ejemplo: 59990 -> $59.990
 * @param {number} valor - precio del producto
 * @returns {string} precio con formato
 */
export function formatearPrecio(valor) {
  return '$' + valor.toLocaleString('es-CL')
}
