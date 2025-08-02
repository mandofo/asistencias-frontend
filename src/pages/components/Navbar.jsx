import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">Asistencia App</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Alumnos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/grupos">Grupos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/usuario-grupo">Usuario-Grupo</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/asistencias">Asistencias</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
