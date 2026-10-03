/**
 * Pie de pagina del sitio con la informacion de la tienda.
 */
function Footer() {
  return (
    <footer className="bg-morado text-white pt-4">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-3">
            <h3 className="h6 text-cian">GameZone</h3>
            <p className="mb-0">
              Tienda de videojuegos, consolas y accesorios con despacho a todo Chile.
            </p>
          </div>
          <div className="col-md-4 mb-3">
            <h3 className="h6 text-cian">Contacto</h3>
            <p className="mb-0">
              Av. Principal 123, Santiago<br />
              +56 9 1234 5678<br />
              contacto@gamezone.cl
            </p>
          </div>
          <div className="col-md-4 mb-3">
            <h3 className="h6 text-cian">Siguenos</h3>
            <ul className="list-unstyled mb-0">
              <li><a className="link-cian" href="#">Facebook</a></li>
              <li><a className="link-cian" href="#">Instagram</a></li>
              <li><a className="link-cian" href="#">YouTube</a></li>
            </ul>
          </div>
        </div>
        <p className="text-center border-top border-info py-3 mb-0 small">
          &copy; 2026 GameZone - Tienda de Videojuegos
        </p>
      </div>
    </footer>
  )
}

export default Footer
