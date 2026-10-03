import { useState, useEffect } from 'react'

// Componentes propios
import Navbar from './components/Navbar.jsx'
import Filtros from './components/Filtros.jsx'
import ProductList from './components/ProductList.jsx'
import ShoppingCart from './components/ShoppingCart.jsx'
import GameForm from './components/GameForm.jsx'
import ContactForm from './components/ContactForm.jsx'
import Footer from './components/Footer.jsx'

// Objeto de JavaScript con el catalogo (respaldo si falla la carga externa)
import { catalogoLocal } from './data/videojuegos.js'

/**
 * Componente principal de la aplicacion.
 * Aqui vive el estado general del sitio y desde aqui se reparte
 * hacia los componentes hijos mediante props.
 */
function App() {

  /* ---------- ESTADOS (useState) ---------- */

  // Seccion visible del sitio: inicio, administrar o contacto
  const [seccion, setSeccion] = useState('inicio')

  // Lista de videojuegos del catalogo
  const [videojuegos, setVideojuegos] = useState([])

  // Videojuegos agregados al carrito
  const [carrito, setCarrito] = useState([])

  // Texto escrito en el buscador
  const [busqueda, setBusqueda] = useState('')

  // Categoria seleccionada en el menu desplegable
  const [categoria, setCategoria] = useState('todas')

  // Indica si los datos todavia se estan cargando
  const [cargando, setCargando] = useState(true)

  // Aviso que se muestra si hubo que usar el catalogo de respaldo
  const [aviso, setAviso] = useState('')


  /* ---------- EFECTO (useEffect) ---------- */

  /**
   * Se ejecuta una sola vez al montar el componente.
   * Carga los videojuegos desde el archivo externo videojuegos.json.
   * Si la carga falla, usa el objeto de JavaScript local como respaldo.
   */
  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}videojuegos.json`)
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error('No se pudo leer el archivo (codigo ' + respuesta.status + ')')
        }
        return respuesta.json()
      })
      .then((datos) => {
        setVideojuegos(datos.videojuegos)
        setCargando(false)
      })
      .catch((error) => {
        // Validacion de errores: la tienda sigue funcionando con los datos locales
        setVideojuegos(catalogoLocal)
        setAviso('No se pudo cargar el catalogo en linea, se muestran los datos guardados en el sitio.')
        setCargando(false)
        console.error('Error al cargar el catalogo:', error)
      })
  }, [])


  /* ---------- FUNCIONES DEL CATALOGO ---------- */

  /**
   * Agrega un videojuego nuevo a la lista del catalogo.
   * @param {Object} juego - datos del videojuego ingresados en el formulario
   */
  function agregarVideojuego(juego) {
    // Calculamos un id nuevo a partir del mayor existente
    const nuevoId = videojuegos.length === 0
      ? 1
      : Math.max(...videojuegos.map((item) => item.id)) + 1

    setVideojuegos([...videojuegos, { ...juego, id: nuevoId }])
  }

  /**
   * Elimina un videojuego del catalogo y tambien del carrito si estaba agregado.
   * @param {number} id - identificador del videojuego
   */
  function eliminarVideojuego(id) {
    setVideojuegos(videojuegos.filter((juego) => juego.id !== id))
    setCarrito(carrito.filter((item) => item.id !== id))
  }


  /* ---------- FUNCIONES DEL CARRITO ---------- */

  /**
   * Agrega un videojuego al carrito. Si ya existe, aumenta su cantidad.
   * @param {Object} juego - videojuego seleccionado
   */
  function agregarAlCarrito(juego) {
    const existe = carrito.find((item) => item.id === juego.id)

    if (existe) {
      setCarrito(
        carrito.map((item) =>
          item.id === juego.id ? { ...item, cantidad: item.cantidad + 1 } : item
        )
      )
    } else {
      setCarrito([...carrito, { ...juego, cantidad: 1 }])
    }
  }

  /**
   * Elimina un videojuego del carrito.
   * @param {number} id - identificador del videojuego
   */
  function eliminarDelCarrito(id) {
    setCarrito(carrito.filter((item) => item.id !== id))
  }

  /**
   * Vacia por completo el carrito.
   */
  function vaciarCarrito() {
    setCarrito([])
  }


  /* ---------- FILTRADO DEL CATALOGO ---------- */

  // Lista de categorias disponibles, sin repetir
  const categorias = ['todas', ...new Set(videojuegos.map((juego) => juego.categoria))]

  // Videojuegos que cumplen con la categoria y la busqueda activas
  const listaFiltrada = videojuegos
    .filter((juego) => categoria === 'todas' || juego.categoria === categoria)
    .filter((juego) => {
      const texto = busqueda.toLowerCase().trim()
      return (
        juego.nombre.toLowerCase().includes(texto) ||
        juego.plataforma.toLowerCase().includes(texto)
      )
    })


  /* ---------- INTERFAZ ---------- */

  return (
    <>
      <Navbar
        seccion={seccion}
        onCambiarSeccion={setSeccion}
        totalCarrito={carrito.reduce((suma, item) => suma + item.cantidad, 0)}
      />

      <main className="container my-4">

        {/* RENDERIZADO CONDICIONAL: seccion de inicio con el catalogo */}
        {seccion === 'inicio' && (
          <div className="row">
            <section className="col-lg-8">
              <h2 className="h5 titulo-seccion mb-3">Catalogo de videojuegos</h2>

              {/* Aviso si se esta usando el catalogo de respaldo */}
              {aviso && (
                <div className="alert alert-warning" role="alert">{aviso}</div>
              )}

              {/* Mientras carga mostramos el indicador */}
              {cargando ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-info" role="status">
                    <span className="visually-hidden">Cargando</span>
                  </div>
                  <p className="texto-suave mt-3">Cargando videojuegos...</p>
                </div>
              ) : (
                <>
                  <Filtros
                    categorias={categorias}
                    categoria={categoria}
                    onCambiarCategoria={setCategoria}
                    busqueda={busqueda}
                    onBuscar={setBusqueda}
                  />

                  <ProductList
                    videojuegos={listaFiltrada}
                    carrito={carrito}
                    onAgregar={agregarAlCarrito}
                    onEliminar={eliminarVideojuego}
                  />
                </>
              )}
            </section>

            <aside className="col-lg-4 mt-4 mt-lg-0">
              <ShoppingCart
                carrito={carrito}
                onEliminar={eliminarDelCarrito}
                onVaciar={vaciarCarrito}
              />
            </aside>
          </div>
        )}

        {/* RENDERIZADO CONDICIONAL: seccion para administrar el catalogo */}
        {seccion === 'administrar' && (
          <section className="row justify-content-center">
            <div className="col-lg-8">
              <h2 className="h5 titulo-seccion mb-3">Administrar catalogo</h2>
              <p className="texto-suave">
                Agrega un videojuego nuevo a la tienda. Para eliminar uno existente
                usa el boton con la X en su tarjeta, dentro del catalogo.
              </p>
              <GameForm onAgregar={agregarVideojuego} />
            </div>
          </section>
        )}

        {/* RENDERIZADO CONDICIONAL: seccion de contacto */}
        {seccion === 'contacto' && (
          <section className="row justify-content-center">
            <div className="col-lg-8">
              <h2 className="h5 titulo-seccion mb-3">Contacto</h2>
              <p className="texto-suave">
                Escribenos tus dudas sobre pedidos, stock o garantias y te
                responderemos dentro de 24 horas habiles.
              </p>
              <ContactForm />
            </div>
          </section>
        )}

      </main>

      <Footer />
    </>
  )
}

export default App
