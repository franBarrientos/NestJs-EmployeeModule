import { EmployeeDomainToDtoMapper } from "../mappers/employeeDomainToDto.mapper";
import { EmployeeRepository } from "../repositories/employee.repository.interface";
import { UserClientInterface } from "../clients/user.client.interface";
import { EmployeeAddDto, isUserAddDto } from "../dtos/employeeAdd.dto";
import { EmployeeDto } from "../dtos/employee.dto";
import { EmployeeDomain } from "../../domain/employee.domain";

export class CreateOneEmployeeUseCase {
  constructor(
    private readonly employeeRepository: EmployeeRepository,
    private employeeMapper: EmployeeDomainToDtoMapper,
    private userClient: UserClientInterface,
  ) {}

  async execute(employee: EmployeeAddDto): Promise<EmployeeDto> {
    let employeeUserId: number;

    if (isUserAddDto(employee.user)) {
      employeeUserId = (await this.userClient.createOne(employee.user)).id;
    }

    if (typeof employee.user === "number") {
      employeeUserId = (await this.userClient.findById(employee.user)).id;
    }

    const employeeDomain = new EmployeeDomain(
      null,
      employeeUserId,
      employee.startDate,
      employee.salary,
      employee.jobTitle,
    );

    return this.employeeRepository
      .save(employeeDomain)
      .then((employeeSaved) => {
        return this.employeeMapper.mapToDto(employeeSaved);
      });
  }
}
