import { Route, Routes} from 'react-router-dom';

import { Header } from './components/Header';
import { RequireAuth } from './contexts/Auth/RequireAuth';

import { Cadastro } from './pages/Cadastro';
import { Login } from './pages/Login';
import { Home } from './pages/Home';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/inicio" element={<RequireAuth><Home /></RequireAuth>}/>
        <Route path="/cadastro" element={<RequireAuth><Cadastro /></RequireAuth>}/>
      </Routes>
    </>
  );
}

export default App;
