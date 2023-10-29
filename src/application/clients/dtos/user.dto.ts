import { CustomerDTO } from "./customer.dto";

export type UserDTO = {
  id: number;

  firstName: string;

  lastName: string;

  email: string;

  city: string;

  age: number;

  province: string;

  customer: CustomerDTO;
};
