import { EmployeeDomain } from "../../domain/employee.domain";

export interface EmployeeRepository {
  save(employee: EmployeeDomain): Promise<EmployeeDomain>;

  findById(id: number): Promise<EmployeeDomain>;

  findAll(): Promise<EmployeeDomain[]>;
}
