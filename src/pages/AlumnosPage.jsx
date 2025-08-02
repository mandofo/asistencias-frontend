import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://148.230.84.158:8080/api/alumnos"; // Ajusta si es necesario

export default function AlumnosPage() {
  const [alumnos, setAlumnos] = useState([]);
  const [grupos, setGrupos] = useState([]);
  const [form, setForm] = useState({ nombre: "", matricula: "", grupoId: "" });

  useEffect(() => {
    fetchAlumnos();
    fetchGrupos();
  }, []);

  const fetchAlumnos = async () => {
    const res = await axios.get(API_URL);
    setAlumnos(res.data);
  };

  const fetchGrupos = async () => {
    const res = await axios.get("http://148.230.84.158:8080/api/grupos");
    setGrupos(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(API_URL, form);
    fetchAlumnos();
    setForm({ nombre: "", matricula: "", grupoId: "" });
  };

  return (
    <div className="container mt-4">
      <h2>Gestión de Alumnos</h2>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row">
          <div className="col">
            <input className="form-control" placeholder="Nombre" value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} required />
          </div>
          <div className="col">
            <input className="form-control" placeholder="Matrícula" value={form.matricula} onChange={e => setForm({ ...form, matricula: e.target.value })} required />
          </div>
          <div className="col">
            <select className="form-control" value={form.grupoId} onChange={e => setForm({ ...form, grupoId: e.target.value })} required>
              <option value="">Selecciona grupo</option>
              {grupos.map(g => (
                <option key={g.id} value={g.id}>{g.nombre} - {g.turno}</option>
              ))}
            </select>
          </div>
          <div className="col">
            <button className="btn btn-primary w-100">Guardar</button>
          </div>
        </div>
      </form>

      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Matrícula</th>
            <th>Grupo</th>
          </tr>
        </thead>
        <tbody>
          {alumnos.map(a => (
            <tr key={a.id}>
              <td>{a.nombre}</td>
              <td>{a.matricula}</td>
              <td>{grupos.find(g => g.id === a.grupoId)?.nombre || "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
