import { Address } from "./address";

export type Client = {
  id?: number,
  name: string,
  lastName: string,
  cpf: string,
  birthDate: null | string,
  adresses: Address[];
}