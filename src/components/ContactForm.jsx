import { useState } from 'react'

/**
 * Formulario de contacto con validacion de los datos antes de enviarlos.
 * Valida que el nombre y el mensaje tengan largo suficiente y que el
 * correo tenga un formato valido.
 */
function ContactForm() {

  // ESTADO: valores escritos en cada campo del formulario
  const [datos, setDatos] = useState({ nombre: '', email: '', mensaje: '' })

  // ESTADO: mensajes de error por campo
  const [errores, setErrores] = useState({})

  // ESTADO: mensaje de exito despues de enviar
  const [enviado, setEnviado] = useState(false)

  /**
   * Guarda en el estado lo que el usuario escribe en cada campo.
   */
  function manejarCambio(evento) {
    const { name, value } = evento.target
    setDatos({ ...datos, [name]: value })
  }

  /**
   * Revisa los datos y devuelve un objeto con los errores encontrados.
   * Si el objeto queda vacio, el formulario es valido.
   * @returns {Object} errores por campo
   */
  function validar() {
    const nuevosErrores = {}

    // El nombre es obligatorio y debe tener al menos 3 letras
    if (datos.nombre.trim() === '') {
      nuevosErrores.nombre = 'El nombre es obligatorio.'
    } else if (datos.nombre.trim().length < 3) {
      nuevosErrores.nombre = 'El nombre debe tener al menos 3 caracteres.'
    }

    // El correo es obligatorio y debe tener formato valido
    const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (datos.email.trim() === '') {
      nuevosErrores.email = 'El correo electronico es obligatorio.'
    } else if (!formatoCorreo.test(datos.email.trim())) {
      nuevosErrores.email = 'Escribe un correo valido, por ejemplo nombre@correo.cl'
    }

    // El mensaje es obligatorio y debe tener al menos 10 caracteres
    if (datos.mensaje.trim() === '') {
      nuevosErrores.mensaje = 'El mensaje es obligatorio.'
    } else if (datos.mensaje.trim().length < 10) {
      nuevosErrores.mensaje = 'El mensaje debe tener al menos 10 caracteres.'
    }

    return nuevosErrores
  }

  /**
   * Se ejecuta al enviar el formulario.
   * preventDefault evita que la pagina se recargue.
   */
  function manejarEnvio(evento) {
    evento.preventDefault()

    const nuevosErrores = validar()
    setErrores(nuevosErrores)

    // Solo se envia si no hay errores
    if (Object.keys(nuevosErrores).length === 0) {
      setEnviado(true)
      setDatos({ nombre: '', email: '', mensaje: '' })
    } else {
      setEnviado(false)
    }
  }

  return (
    <form className="formulario esquinas-pixel" onSubmit={manejarEnvio} noValidate>

      {/* RENDERIZADO CONDICIONAL: mensaje de exito tras enviar */}
      {enviado && (
        <div className="aviso-exito mb-3">
          Mensaje enviado correctamente. Te responderemos pronto.
        </div>
      )}

      <div className="mb-3">
        <label htmlFor="nombre" className="form-label">Nombre</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          className={errores.nombre ? 'form-control campo-error' : 'form-control'}
          value={datos.nombre}
          onChange={manejarCambio}
          placeholder="Benjamin Perez"
        />
        {/* RENDERIZADO CONDICIONAL: error solo si existe */}
        {errores.nombre && <p className="texto-error">{errores.nombre}</p>}
      </div>

      <div className="mb-3">
        <label htmlFor="email" className="form-label">Correo electronico</label>
        <input
          type="email"
          id="email"
          name="email"
          className={errores.email ? 'form-control campo-error' : 'form-control'}
          value={datos.email}
          onChange={manejarCambio}
          placeholder="benjamin@correo.cl"
        />
        {errores.email && <p className="texto-error">{errores.email}</p>}
      </div>

      <div className="mb-3">
        <label htmlFor="mensaje" className="form-label">Mensaje</label>
        <textarea
          id="mensaje"
          name="mensaje"
          rows="5"
          className={errores.mensaje ? 'form-control campo-error' : 'form-control'}
          value={datos.mensaje}
          onChange={manejarCambio}
          placeholder="Cuentanos en que podemos ayudarte"
        ></textarea>
        {errores.mensaje && <p className="texto-error">{errores.mensaje}</p>}
      </div>

      <button type="submit" className="btn btn-rosado">Enviar mensaje</button>
    </form>
  )
}

export default ContactForm
