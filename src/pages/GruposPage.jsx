import React, { useEffect, useState } from 'react';
import axios from 'axios';

function GruposPage() {
  const [grupos, setGrupos] = useState([]);

  useEffect(() => {
    axios.get('http://148.230.84.158:8080/api/grupos')
      .then(response => {
        setGrupos(response.data);
      })
      .catch(error => {
        console.error('Error al cargar los grupos:', error);
      });
  }, []);

  return (
    <div className="container mt-4">
      <h2>Catálogo de Grupos</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
          </tr>
        </thead>
        <tbody>
          {grupos.map(grupo => (
            <tr key={grupo.id}>
              <td>{grupo.id}</td>
              <td>{grupo.nombre}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GruposPage;
