import { useState } from 'react'
import CartTotal from './CartTotal.jsx'
import { formatearPrecio } from '../utils/formato.js'

/**
 * Carrito de compras: muestra los productos agregados, permite eliminarlos,
 * vaciar el carrito y finalizar la compra.
 *
 * Props que recibe:
 * @param {Array} carrito - productos agregados
 * @param {Function} onEliminar - elimina un producto del carrito
 * @param {Function} onVaciar - vacia todo el carrito
 */
function ShoppingCart({ carrito, onEliminar, onVaciar }) {

  // ESTADO LOCAL: guarda el mensaje de confirmacion despues de comprar.
  // Si esta vacio no se muestra nada (renderizado condicional).
  const [confirmacion, setConfirmacion] = useState('')

  // Sumamos las unidades para mostrarlas en el encabezado
  const unidades = carrito.reduce((suma, item) => suma + item.cantidad, 0)

  // Calculamos el total para usarlo en el mensaje de compra
  const total = carrito.reduce((suma, item) => suma + item.precio * item.cantidad, 0)

  /**
   * Finaliza la compra: guarda el mensaje de confirmacion y vacia el carrito.
   */
  function finalizarCompra() {
    setConfirmacion(
      'Compra realizada por ' + formatearPrecio(total) + '. Gracias por preferirnos.'
    )
    onVaciar()
  }

  /**
   * Vacia el carrito y ademas borra el mensaje de confirmacion anterior.
   */
  function vaciar() {
    setConfirmacion('')
    onVaciar()
  }

  return (
    <div className="card bloque-violeta carrito-fijo esquinas-pixel">
      <div className="card-header bg-morado text-white fw-bold esquinas-pixel-arriba">
        Carrito de compras
        <span className="badge bg-cian text-dark float-end">{unidades}</span>
      </div>

      <div className="card-body esquinas-pixel-abajo">

        {/* RENDERIZADO CONDICIONAL:
            el mensaje de compra exitosa solo aparece despues de comprar */}
        {confirmacion && (
          <div className="aviso-compra mb-3">
            {confirmacion}
          </div>
        )}

        {/* RENDERIZADO CONDICIONAL:
            si el carrito esta vacio mostramos un mensaje,
            si tiene productos mostramos la lista y los botones */}
        {carrito.length === 0 ? (
          <p className="text-white mb-0">
            Tu carrito esta vacio. Agrega productos desde el catalogo.
          </p>
        ) : (
          <>
            <ul className="list-group mb-3">
              {carrito.map((item) => (
                <li
                  key={item.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <span>
                    {item.nombre}{' '}
                    <span className="badge bg-morado">x{item.cantidad}</span>
                  </span>
                  <span>
                    {formatearPrecio(item.precio * item.cantidad)}
                    <button
                      className="btn btn-sm btn-quitar"
                      onClick={() => onEliminar(item.id)}
                      aria-label={'Quitar ' + item.nombre}
                    >
                      X
                    </button>
                  </span>
                </li>
              ))}
            </ul>

            {/* Componente hijo que calcula y muestra el total */}
            <div className="fila-total">
              <CartTotal carrito={carrito} />
            </div>

            <button className="btn btn-rosado w-100 mt-3" onClick={finalizarCompra}>
              Finalizar compra
            </button>

            <button className="btn btn-outline-light w-100 mt-2" onClick={vaciar}>
              Vaciar carrito
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default ShoppingCart
