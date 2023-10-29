import { UserDTO } from "../clients/dtos/user.dto";

export type EmployeeDto = {
  id: number;
  user: UserDTO;
  startDate: Date;
  salary: number;
  jobTitle: string;
};
