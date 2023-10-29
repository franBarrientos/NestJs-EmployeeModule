import { EmployeeDomain } from "../../domain/employee.domain";
import { EmployeeDto } from "../dtos/employee.dto";
import { UserClientInterface } from "../clients/user.client.interface";
import { UserDTO } from "../clients/dtos/user.dto";

export class EmployeeDomainToDtoMapper {
  constructor(private readonly userClient: UserClientInterface) {}

  public mapToDto(employee: EmployeeDomain): Promise<EmployeeDto> {
    return this.userClient.findById(employee.getUserId()).then((u: UserDTO) => {
      return {
        id: employee.getId(),
        user: u,
        startDate: employee.getStartDate(),
        salary: employee.getSalary(),
        jobTitle: employee.getJobTitle(),
      };
    });
  }

  public mapToDomain(dto: EmployeeDto): EmployeeDomain {
    return new EmployeeDomain(
      dto.id,
      dto.user.id,
      dto.startDate,
      dto.salary,
      dto.jobTitle,
    );
  }
}
