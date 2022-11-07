import { axiosInstace } from '../core/axiosInstance';

export const useApi = () => ({
    validateToken: async (token: string) => {
        // return {
        //     user: {id:2, name: 'Eduardo', cpf: '483.439.988-55'},
        // };
        const response = await axiosInstace.post('/validate', {token});
        return response.data;
    },
    login: async (cpf: string, password: string) => {
        // return {
        //     user: {id:2, name: 'Eduardo', cpf: '483.439.988-55'},
        //     token: '123456789'
        // };
        const response = await axiosInstace.post('usuarios/login', {login: cpf, password});
        return response.data;
    },
    logout: async () => {
        // return {
        //     status: true 
        // };
        const response = await axiosInstace.post('/logout');
        return response.data;
    },
});