import { formatearPrecio } from '../utils/formato.js'

/**
 * Calcula y muestra el total a pagar del carrito.
 *
 * Props que recibe:
 * @param {Array} carrito - productos agregados
 */
function CartTotal({ carrito }) {

  // Sumamos precio por cantidad de cada producto con reduce
  const total = carrito.reduce((suma, item) => suma + item.precio * item.cantidad, 0)

  return (
    <p className="fs-5 fw-bold text-white mb-0">
      Total: <span className="text-cian">{formatearPrecio(total)}</span>
    </p>
  )
}

export default CartTotal
