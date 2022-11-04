import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/Auth/AuthContext";

export const Login = () => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const [cpf, setCpf] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        if (cpf && password) {
            auth.login(cpf, password).then(() => {
                navigate('/cadastro')
            }).catch (() => {
                alert('CPF ou senha estão incorretos!');
            });
            // const logado = await 
            // if(logado) {
            //     navigate('/cadastro')
            // } else {
            //     alert('CPF ou senha estão incorretos!');
            // }
        }
    }
    
    return (
        <div>
            <h2>Login</h2>
    
            <input 
                type="text"
                value={cpf}
                onChange={e => setCpf(e.target.value)}
                placeholder='Digite seu CPF'
            />

            <input 
                type="text"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder='Digite sua senha'
            />

            <button onClick={handleLogin}>Logar</button>
        </div>
    );
}
