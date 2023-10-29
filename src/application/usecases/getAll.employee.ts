import { EmployeeRepository } from "../repositories/employee.repository.interface";
import { EmployeeDomainToDtoMapper } from "../mappers/employeeDomainToDto.mapper";
import { EmployeeDto } from "../dtos/employee.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class GetAllEmployeesUseCase {
  constructor(
    private employeeRepository: EmployeeRepository,
    private employeeMapper: EmployeeDomainToDtoMapper,
  ) {}

  async execute(): Promise<EmployeeDto[]> {
    const employeeDomains = this.employeeRepository.findAll();

    const userDtoPromises: Promise<EmployeeDto>[] = await employeeDomains.then(
      (ss) => ss.map((employee) => this.employeeMapper.mapToDto(employee)),
    );

    return Promise.all(userDtoPromises);
  }
}
