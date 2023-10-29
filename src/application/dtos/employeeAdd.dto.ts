import { UserAddDto } from "../clients/dtos/userAdd.dto";

export type EmployeeAddDto = {
  user: UserAddDto | number;
  startDate: Date;
  salary: number;
  jobTitle: string;
};

export function isUserAddDto(user: UserAddDto | number): user is UserAddDto {
  return (
    user !== null &&
    typeof user === "object" &&
    "firstName" in user &&
    "lastName" in user &&
    "email" in user &&
    "password" in user
  );
}
