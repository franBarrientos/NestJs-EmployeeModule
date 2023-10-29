import { UserDTO } from "./user.dto";

export type CustomerDTO = {
  id: number;

  dni: number;

  addres: string;

  phone: string;

  user: UserDTO;
};
