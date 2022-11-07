import React, { useContext } from 'react';
import './App.css';
import { Route, Routes, useNavigate} from 'react-router-dom';
import { Cadastro } from './pages/Cadastro';
import { Login } from './pages/Login';
import { RequireAuth } from './contexts/Auth/RequireAuth';
import { AuthContext } from './contexts/Auth/AuthContext';
import { Home } from './pages/Home';

function App() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    navigate('/login');
  }

  return (
    <div className="App">
      <header>
        <h1>PHILIPS</h1>
        {auth.user && <button onClick={handleLogout}>Sair</button>}
      </header>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/inicio" element={<RequireAuth><Home /></RequireAuth>}/>
        <Route path="/cadastro" element={<RequireAuth><Cadastro /></RequireAuth>}/>
      </Routes>
    </div>
  );
}

export default App;
