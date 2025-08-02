import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AlumnosPage from './pages/AlumnosPage';
import GruposPage from './pages/GruposPage';
import UsuarioGrupoPage from './pages/UsuarioGrupoPage';
import AsistenciasPage from './pages/AsistenciasPage';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<AlumnosPage />} />
          <Route path="/grupos" element={<GruposPage />} />
          <Route path="/usuario-grupo" element={<UsuarioGrupoPage />} />
          <Route path="/asistencias" element={<AsistenciasPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
