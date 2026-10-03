import ProductCard from './ProductCard.jsx'

/**
 * Muestra la grilla de videojuegos del catalogo.
 *
 * Props que recibe:
 * @param {Array} videojuegos - videojuegos a mostrar (ya filtrados)
 * @param {Array} carrito - videojuegos que estan en el carrito
 * @param {Function} onAgregar - agrega un videojuego al carrito
 * @param {Function} onEliminar - elimina un videojuego del catalogo
 */
function ProductList({ videojuegos, carrito, onAgregar, onEliminar }) {

  // RENDERIZADO CONDICIONAL: aviso cuando no hay coincidencias
  if (videojuegos.length === 0) {
    return (
      <div className="alert alert-warning" role="alert">
        No se encontraron videojuegos con esos criterios de busqueda.
      </div>
    )
  }

  return (
    <>
      <p className="texto-suave mb-3">{videojuegos.length} videojuegos disponibles</p>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-xl-3 g-3">
        {/* Recorremos la lista y creamos una tarjeta por videojuego.
            La prop key ayuda a React a identificar cada elemento. */}
        {videojuegos.map((juego) => (
          <ProductCard
            key={juego.id}
            juego={juego}
            enCarrito={carrito.some((item) => item.id === juego.id)}
            onAgregar={onAgregar}
            onEliminar={onEliminar}
          />
        ))}
      </div>
    </>
  )
}

export default ProductList
