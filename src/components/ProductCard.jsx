import { formatearPrecio } from '../utils/formato.js'

/**
 * Tarjeta individual de un videojuego (card de Bootstrap 5).
 * Muestra imagen, nombre, precio y descripcion.
 *
 * Props que recibe:
 * @param {Object} juego - datos del videojuego
 * @param {boolean} enCarrito - indica si ya fue agregado al carrito
 * @param {Function} onAgregar - agrega el videojuego al carrito
 * @param {Function} onEliminar - elimina el videojuego del catalogo
 */
function ProductCard({ juego, enCarrito, onAgregar, onEliminar }) {
  return (
    <div className="col">
      <div className="card h-100 tarjeta-producto esquinas-pixel">

        {/* Boton para eliminar el videojuego del catalogo */}
        <button
          className="btn btn-eliminar-juego"
          onClick={() => onEliminar(juego.id)}
          aria-label={'Eliminar ' + juego.nombre + ' del catalogo'}
          title="Eliminar del catalogo"
        >
          X
        </button>

        <img
          src={juego.imagen}
          className="card-img-top esquinas-pixel-arriba"
          alt={juego.nombre}
        />

        <div className="card-body d-flex flex-column esquinas-pixel-abajo">
          <h3 className="card-title h6">{juego.nombre}</h3>
          <p className="mb-2"><span className="plataforma">{juego.plataforma}</span></p>
          <p className="descripcion">{juego.descripcion}</p>
          <p className="precio fw-bold mb-3 mt-auto">{formatearPrecio(juego.precio)}</p>

          {/* RENDERIZADO CONDICIONAL:
              el boton cambia de texto y de color si ya esta en el carrito */}
          <button
            className={enCarrito ? 'btn btn-en-carrito btn-sm' : 'btn btn-rosado btn-sm'}
            onClick={() => onAgregar(juego)}
          >
            {enCarrito ? 'En el carrito · Agregar otro' : 'Agregar al carrito'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
