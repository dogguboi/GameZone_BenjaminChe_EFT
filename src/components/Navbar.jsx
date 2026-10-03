/**
 * Barra de navegacion del sitio (componente de Bootstrap 5).
 * Permite moverse entre las secciones y muestra el total del carrito.
 *
 * Props que recibe:
 * @param {string} seccion - seccion visible actualmente
 * @param {Function} onCambiarSeccion - avisa al padre que cambio la seccion
 * @param {number} totalCarrito - cantidad de unidades en el carrito
 */
function Navbar({ seccion, onCambiarSeccion, totalCarrito }) {

  // Secciones del sitio
  const secciones = [
    { valor: 'inicio', nombre: 'Inicio' },
    { valor: 'administrar', nombre: 'Administrar' },
    { valor: 'contacto', nombre: 'Contacto' }
  ]

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-morado">
      <div className="container">
        <a
          className="navbar-brand fw-bold"
          href="#"
          onClick={() => onCambiarSeccion('inicio')}
        >
          Game<span>Zone</span>
        </a>

        {/* Boton hamburguesa para pantallas pequeñas */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#menuPrincipal"
          aria-controls="menuPrincipal"
          aria-expanded="false"
          aria-label="Abrir menu de navegacion"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="menuPrincipal">
          <ul className="navbar-nav me-auto">
            {secciones.map((item) => (
              <li className="nav-item" key={item.valor}>
                {/* RENDERIZADO CONDICIONAL: la seccion activa recibe otra clase */}
                <button
                  type="button"
                  className={seccion === item.valor ? 'nav-link activo' : 'nav-link'}
                  onClick={() => onCambiarSeccion(item.valor)}
                >
                  {item.nombre}
                </button>
              </li>
            ))}
          </ul>

          <span className="contador-carrito text-white">
            Carrito <span className="badge bg-cian text-dark">{totalCarrito}</span>
          </span>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
