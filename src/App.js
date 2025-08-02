import logo from './logo.svg';
import './App.css';
import AlumnosPage from './pages/AlumnosPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/alumnos" />} />
        <Route path="/alumnos" element={<AlumnosPage />} />
      </Routes>
    </Router>
  );
}

export default App;
