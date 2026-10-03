/**
 * Barra de filtros del catalogo: menu desplegable de categorias y buscador.
 *
 * Props que recibe:
 * @param {Array} categorias - categorias disponibles
 * @param {string} categoria - categoria seleccionada
 * @param {Function} onCambiarCategoria - avisa al padre la categoria elegida
 * @param {string} busqueda - texto buscado
 * @param {Function} onBuscar - avisa al padre el texto buscado
 */
function Filtros({ categorias, categoria, onCambiarCategoria, busqueda, onBuscar }) {
  return (
    <div className="barra-filtros row g-2 mb-3">

      <div className="col-sm-5">
        <label htmlFor="selectCategoria" className="form-label texto-suave mb-1">
          Filtrar por categoria
        </label>
        <select
          id="selectCategoria"
          className="form-select"
          value={categoria}
          onChange={(evento) => onCambiarCategoria(evento.target.value)}
        >
          {categorias.map((item) => (
            <option key={item} value={item}>
              {item === 'todas' ? 'Todas las categorias' : item}
            </option>
          ))}
        </select>
      </div>

      <div className="col-sm-7">
        <label htmlFor="inputBusqueda" className="form-label texto-suave mb-1">
          Buscar por nombre o plataforma
        </label>
        <input
          type="search"
          id="inputBusqueda"
          className="form-control"
          placeholder="Ejemplo: Zelda"
          value={busqueda}
          onChange={(evento) => onBuscar(evento.target.value)}
        />
      </div>

    </div>
  )
}

export default Filtros
