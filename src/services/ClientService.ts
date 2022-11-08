import { axiosInstace } from "../core/axiosInstance";
import { Client } from "../types/client";

export const ClientService = {
  getById: (id: any,  token: string | null ) => {
    return axiosInstace.get(`/clientes/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  },

  list: (token: string | null) => {
    return axiosInstace.get("/clientes", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  },

  delete: (id?: any, token?: string | null) => {
    return axiosInstace.delete(`/clientes/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  },

  create: (client: Client, token: string | null) => {
    return axiosInstace.post("/clientes", client, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  },

  update: (id: any, client: Client, token: string | null) => {
    return axiosInstace.put(`/clientes/${id}`, client, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
