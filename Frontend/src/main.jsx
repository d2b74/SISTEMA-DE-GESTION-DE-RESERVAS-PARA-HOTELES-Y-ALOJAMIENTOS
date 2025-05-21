import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';           // ojo al nombre y extensión
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';                  // estilos globales

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
