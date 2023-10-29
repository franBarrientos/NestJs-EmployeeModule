import { EmployeeRepository } from "../repositories/employee.repository.interface";
import { EmployeeDomainToDtoMapper } from "../mappers/employeeDomainToDto.mapper";
import { EmployeeDto } from "../dtos/employee.dto";
import { Injectable } from "@nestjs/common";
import { IException } from "../exceptions/exception.interface";

@Injectable()
export class GetByIdEmployeeUseCase {
  constructor(
    private employeeRepository: EmployeeRepository,
    private employeeMapper: EmployeeDomainToDtoMapper,
    private exceptionsService: IException,
  ) {}

  async execute(id: number): Promise<EmployeeDto> {
    try {
      const employeeDomains = await this.employeeRepository.findById(id);
      return this.employeeMapper.mapToDto(employeeDomains);
    } catch (e) {
      this.exceptionsService.badRequestException(
        {
          message: `Employee ${id} not found`,
          code_error: 404,
        },
        "GetByIdEmployeeUseCase",
      );
    }
  }
}
