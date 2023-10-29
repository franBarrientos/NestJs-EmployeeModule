import { Injectable } from "@nestjs/common";
import { EmployeeDomain } from "../../../../domain/employee.domain";
import { EmployeeEntity } from "../entities/employe.entity";

@Injectable()
export class EntityToDomainMapper {
  public mapToDomain(entity: EmployeeEntity): EmployeeDomain {
    return new EmployeeDomain(
      entity.getId(),
      entity.getUserId(),
      entity.getStartDate(),
      entity.getSalary(),
      entity.getJobTitle(),
    );
  }
}
