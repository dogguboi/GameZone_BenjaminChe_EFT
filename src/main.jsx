import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Bootstrap 5: estilos y JavaScript (necesario para el menu colapsable)
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// Estilos propios de GameZone (se cargan despues para personalizar Bootstrap)
import './index.css'

import App from './App.jsx'

// Montamos la aplicacion en el div con id "root" del index.html
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
