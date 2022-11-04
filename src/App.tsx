import React, { useContext } from 'react';
import logo from './logo.svg';
import './App.css';
import {Link, Route, Routes, useNavigate} from 'react-router-dom';
import { Cadastro } from './pages/Cadastro';
import { Login } from './pages/Login';
import { RequireAuth } from './contexts/Auth/RequireAuth';
import { AuthContext } from './contexts/Auth/AuthContext';

function App() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = async () => {
    await auth.logout();
    navigate('/login');
  }
  console.log(auth.user);
  return (
    <div className="App">
      <header>
        <h1>PHILIPS</h1>
        {auth.user && <button onClick={handleLogout}>Sair</button>}
      </header>
      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/cadastro" element={<RequireAuth><Cadastro /></RequireAuth>}/>
      </Routes>
    </div>
  );
}

export default App;
