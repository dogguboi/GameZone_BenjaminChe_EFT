import { useState } from 'react'

/**
 * Formulario para agregar un videojuego nuevo al catalogo.
 * Valida los datos antes de avisarle al componente padre.
 *
 * Props que recibe:
 * @param {Function} onAgregar - funcion del padre que agrega el videojuego
 */
function GameForm({ onAgregar }) {

  // Valores iniciales del formulario
  const valoresIniciales = {
    nombre: '',
    categoria: 'juegos',
    plataforma: '',
    precio: '',
    descripcion: '',
    imagen: 'img/zelda.png'
  }

  // ESTADO: datos escritos en el formulario
  const [datos, setDatos] = useState(valoresIniciales)

  // ESTADO: errores de validacion
  const [errores, setErrores] = useState({})

  // ESTADO: mensaje de confirmacion
  const [agregado, setAgregado] = useState('')

  /**
   * Guarda en el estado lo que el usuario escribe.
   */
  function manejarCambio(evento) {
    const { name, value } = evento.target
    setDatos({ ...datos, [name]: value })
  }

  /**
   * Revisa los datos del formulario.
   * @returns {Object} errores encontrados
   */
  function validar() {
    const nuevosErrores = {}

    if (datos.nombre.trim().length < 3) {
      nuevosErrores.nombre = 'Escribe un nombre de al menos 3 caracteres.'
    }

    if (datos.plataforma.trim() === '') {
      nuevosErrores.plataforma = 'Indica la plataforma del videojuego.'
    }

    // El precio debe ser un numero mayor que cero
    if (datos.precio === '' || Number(datos.precio) <= 0) {
      nuevosErrores.precio = 'El precio debe ser un numero mayor que cero.'
    }

    if (datos.descripcion.trim().length < 10) {
      nuevosErrores.descripcion = 'La descripcion debe tener al menos 10 caracteres.'
    }

    return nuevosErrores
  }

  /**
   * Envia el videojuego nuevo al componente padre si los datos son validos.
   */
  function manejarEnvio(evento) {
    evento.preventDefault()

    const nuevosErrores = validar()
    setErrores(nuevosErrores)

    if (Object.keys(nuevosErrores).length === 0) {
      // El precio se convierte a numero antes de guardarlo
      onAgregar({ ...datos, precio: Number(datos.precio) })
      setAgregado(datos.nombre + ' se agrego al catalogo.')
      setDatos(valoresIniciales)
    } else {
      setAgregado('')
    }
  }

  return (
    <form className="formulario esquinas-pixel" onSubmit={manejarEnvio} noValidate>

      {/* RENDERIZADO CONDICIONAL: confirmacion despues de agregar */}
      {agregado && <div className="aviso-exito mb-3">{agregado}</div>}

      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="nombreJuego" className="form-label">Nombre del videojuego</label>
          <input
            type="text"
            id="nombreJuego"
            name="nombre"
            className={errores.nombre ? 'form-control campo-error' : 'form-control'}
            value={datos.nombre}
            onChange={manejarCambio}
            placeholder="Hollow Knight Silksong"
          />
          {errores.nombre && <p className="texto-error">{errores.nombre}</p>}
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="plataforma" className="form-label">Plataforma</label>
          <input
            type="text"
            id="plataforma"
            name="plataforma"
            className={errores.plataforma ? 'form-control campo-error' : 'form-control'}
            value={datos.plataforma}
            onChange={manejarCambio}
            placeholder="Nintendo Switch"
          />
          {errores.plataforma && <p className="texto-error">{errores.plataforma}</p>}
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="categoria" className="form-label">Categoria</label>
          <select
            id="categoria"
            name="categoria"
            className="form-select"
            value={datos.categoria}
            onChange={manejarCambio}
          >
            <option value="juegos">Juegos</option>
            <option value="consolas">Consolas</option>
            <option value="accesorios">Accesorios</option>
          </select>
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="precio" className="form-label">Precio en pesos</label>
          <input
            type="number"
            id="precio"
            name="precio"
            className={errores.precio ? 'form-control campo-error' : 'form-control'}
            value={datos.precio}
            onChange={manejarCambio}
            placeholder="29990"
          />
          {errores.precio && <p className="texto-error">{errores.precio}</p>}
        </div>

        <div className="col-12 mb-3">
          <label htmlFor="descripcion" className="form-label">Descripcion</label>
          <textarea
            id="descripcion"
            name="descripcion"
            rows="3"
            className={errores.descripcion ? 'form-control campo-error' : 'form-control'}
            value={datos.descripcion}
            onChange={manejarCambio}
            placeholder="Breve descripcion del videojuego"
          ></textarea>
          {errores.descripcion && <p className="texto-error">{errores.descripcion}</p>}
        </div>

        <div className="col-12 mb-3">
          <label htmlFor="imagen" className="form-label">Imagen</label>
          <select
            id="imagen"
            name="imagen"
            className="form-select"
            value={datos.imagen}
            onChange={manejarCambio}
          >
            <option value="img/zelda.png">Portada violeta</option>
            <option value="img/godofwar.png">Portada turquesa</option>
            <option value="img/forza.png">Portada rosa</option>
          </select>
        </div>
      </div>

      <button type="submit" className="btn btn-rosado">Agregar al catalogo</button>
    </form>
  )
}

export default GameForm
