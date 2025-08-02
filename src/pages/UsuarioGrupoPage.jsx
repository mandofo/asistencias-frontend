// src/pages/UsuarioGrupoPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UsuarioGrupoPage = () => {
  const [usuariosGrupos, setUsuariosGrupos] = useState([]);

  useEffect(() => {
    axios.get('http://148.230.84.158:8080/usuario_grupo/lista')
      .then(response => setUsuariosGrupos(response.data))
      .catch(error => console.error('Error al obtener los datos:', error));
  }, []);

  return (
    <div className="container mt-4">
      <h2>Relación Usuario-Grupo</h2>
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>ID Usuario</th>
            <th>ID Grupo</th>
          </tr>
        </thead>
        <tbody>
          {usuariosGrupos.map(rel => (
            <tr key={rel.id}>
              <td>{rel.id}</td>
              <td>{rel.usuarioId}</td>
              <td>{rel.grupoId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsuarioGrupoPage;
