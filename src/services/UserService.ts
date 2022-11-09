import { axiosInstace } from "../api/axiosInstance";

export const UserService = {
  login: async (cpf: string, password: string) => {
    const response = await axiosInstace.post('usuarios/login', { login: cpf, password });
    return response.data;
  },
}