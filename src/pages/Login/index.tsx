import { Alert, Snackbar } from "@mui/material";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import './style.css';

export const Login = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [valid, isValid] = useState(false);

  const handleLogin = async () => {
    if (cpf && password) {
      isValid(false)
      auth.login(cpf, password).then(() => {
        navigate('/inicio')
      }).catch(() => {
        alert('CPF ou senha estão incorretos!');
      });
    } else {
      isValid(true)
    }
  }

  return (
    <div className="container">
      <div className="container-login">
        <div className="wrap-login">
          <form className="login-form">
            <span className="login-form-title">Bem Vindo!</span>

            <div className="wrap-input">
              <input
                className={cpf !== "" ? "has-val input" : "input"}
                type="text"
                value={cpf}
                onChange={e => setCpf(e.target.value)}
              />
              <span className="focus-input" data-placeholder="Login"></span>
            </div>

            <div className="wrap-input">
              <input
                className={password !== "" ? "has-val input" : "input"}
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <span className="focus-input" data-placeholder="Senha"></span>
            </div>

            {valid ? <Alert sx={{ marginBottom: '1rem' }} severity="error">Login e Senha precisam ser preenchidos</Alert> : ""}

            <div className="container-login-form-btn">
              <button className="login-form-btn" type="button" onClick={handleLogin}>Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
