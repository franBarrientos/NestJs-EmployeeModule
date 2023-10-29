import { EmployeeRepository } from "../../../../application/repositories/employee.repository.interface";
import { EmployeeDomain } from "../../../../domain/employee.domain";
import { EntityToDomainMapper } from "../mappers/entityToDomain.mapper";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EmployeeEntity } from "../entities/employe.entity";
import { Repository } from "typeorm";
import { FindOptionsWhere } from "typeorm/find-options/FindOptionsWhere";

@Injectable()
export class EmployeeDboRepository implements EmployeeRepository {
  constructor(
    @InjectRepository(EmployeeEntity)
    private readonly employeeRepository: Repository<EmployeeEntity>,
    private employeeMapper: EntityToDomainMapper,
  ) {}

  findAll(): Promise<EmployeeDomain[]> {
    return this.employeeRepository.find().then((employees) => {
      return employees.map(this.employeeMapper.mapToDomain);
    });
  }

  findById(id: number): Promise<EmployeeDomain> {
    return this.employeeRepository
      .findOneByOrFail({ id } as FindOptionsWhere<EmployeeEntity>)
      .then((employee) => {
        return this.employeeMapper.mapToDomain(employee);
      });
  }

  save(employee: EmployeeDomain): Promise<EmployeeDomain> {
    return this.employeeRepository.save(employee).then((employee) => {
      return this.employeeMapper.mapToDomain(employee);
    });
  }
}
