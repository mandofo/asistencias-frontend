import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, Button, Table } from 'react-bootstrap';

const AsistenciasPage = () => {
  const [grupos, setGrupos] = useState([]);
  const [alumnos, setAlumnos] = useState([]);
  const [grupoId, setGrupoId] = useState('');
  const [fecha, setFecha] = useState('');
  const [asistencias, setAsistencias] = useState([]);

  const API_BASE = 'http://148.230.84.158:8080';

  useEffect(() => {
    axios.get(`${API_BASE}/api/grupos`).then(res => setGrupos(res.data));
  }, []);

  const handleBuscar = async () => {
    const alumnosRes = await axios.get(`${API_BASE}/api/alumnos/grupo/${grupoId}`);
    const alumnosGrupo = alumnosRes.data;
    setAlumnos(alumnosGrupo);

    const asistenciasRes = await axios.get(`${API_BASE}/api/asistencias/grupo/${grupoId}/${fecha}`);
    const datos = asistenciasRes.data;

    const merged = alumnosGrupo.map(alumno => {
      const asistenciaExistente = datos.find(a => a.alumnoId === alumno.id);
      return {
        alumnoId: alumno.id,
        nombre: alumno.nombre,
        estado: asistenciaExistente ? asistenciaExistente.estado : 'PENDIENTE',
        registradoPor: asistenciaExistente?.registradoPor || 1,
        fecha,
      };
    });
    setAsistencias(merged);
  };

  const handleEstadoChange = (index, nuevoEstado) => {
    const updated = [...asistencias];
    updated[index].estado = nuevoEstado;
    setAsistencias(updated);
  };

  const handleGuardar = async () => {
    await axios.post(`${API_BASE}/grupo/asistencias`, asistencias);
    alert('Asistencias guardadas');
  };

  return (
    <div className="container mt-4">
      <h2>Registro de Asistencias</h2>
      <Form className="mb-3">
        <Form.Group>
          <Form.Label>Grupo</Form.Label>
          <Form.Select value={grupoId} onChange={e => setGrupoId(e.target.value)}>
            <option value="">Seleccione un grupo</option>
            {grupos.map(g => (
              <option key={g.id} value={g.id}>{g.nombre}</option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group>
          <Form.Label>Fecha</Form.Label>
          <Form.Control type="date" value={fecha} onChange={e => setFecha(e.target.value)} />
        </Form.Group>
        <Button variant="primary" onClick={handleBuscar} className="mt-3">Buscar</Button>
      </Form>

      {asistencias.length > 0 && (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Alumno</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {asistencias.map((asistencia, index) => (
                <tr key={asistencia.alumnoId}>
                  <td>{asistencia.nombre}</td>
                  <td>
                    <Form.Select
                      value={asistencia.estado}
                      onChange={e => handleEstadoChange(index, e.target.value)}>
                      <option value="PRESENTE">PRESENTE</option>
                      <option value="AUSENTE">AUSENTE</option>
                      <option value="JUSTIFICADO">JUSTIFICADO</option>
                    </Form.Select>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Button variant="success" onClick={handleGuardar}>Guardar</Button>
        </>
      )}
    </div>
  );
};

export default AsistenciasPage;
