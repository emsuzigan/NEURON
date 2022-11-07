import { useContext } from 'react';

import { useNavigate} from 'react-router-dom';
import { Button } from '@mui/material';

import { AuthContext } from '../../contexts/Auth/AuthContext';
import './style.css';

export function Header() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    navigate('/');
    auth.logout();
  }

  return <header>
    <h1>PHILIPS</h1>
    {auth.user && <Button variant="contained" color='error' className='btnLogout' onClick={handleLogout}>Sair</Button>}
  </header>
}