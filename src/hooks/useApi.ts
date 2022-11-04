import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API
});

export const useApi = () => ({
    validateToken: async (token: string) => {
        // return {
        //     user: {id:2, name: 'Eduardo', cpf: '483.439.988-55'},
        // };
        const response = await api.post('/validate', {token});
        return response.data;
    },
    login: async (cpf: string, password: string) => {
        // return {
        //     user: {id:2, name: 'Eduardo', cpf: '483.439.988-55'},
        //     token: '123456789'
        // };
        const response = await api.post('usuarios/login', {login: cpf, senha: password});
        return response.data;
    },
    logout: async () => {
        // return {
        //     status: true 
        // };
        const response = await api.post('/logout');
        return response.data;
    }
});