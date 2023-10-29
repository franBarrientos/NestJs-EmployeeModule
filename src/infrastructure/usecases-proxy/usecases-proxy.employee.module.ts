import { RepositoriesModule } from "../DB/TypeORM/repositories/repositories.module";
import { DynamicModule, Module } from "@nestjs/common";
import { UseCaseProxy } from "./usecases-proxy";
import { GetAllEmployeesUseCase } from "../../application/usecases/getAll.employee";
import { EmployeeDboRepository } from "../DB/TypeORM/repositories/employeeDbo.repository";
import { EmployeeDomainToDtoMapper } from "../../application/mappers/employeeDomainToDto.mapper";
import { UserClient } from "../clients/user.client";
import { ClientsModule } from "../clients/clients.module";
import { ExceptionsModule } from "../exceptions/exceptions.module";
import { IException } from "../../application/exceptions/exception.interface";
import { GetByIdEmployeeUseCase } from "../../application/usecases/getById.employee";
import { CreateOneEmployeeUseCase } from "../../application/usecases/createOne.employee";

@Module({
  imports: [RepositoriesModule, ClientsModule, ExceptionsModule],
})
export class UsecasesProxyEmployeeModule {
  static GET_ALL_EMPLOYEES_USECASES = "getAllEmployeesUseCases";
  static GET_BY_ID_EMPLOYEES_USECASES = "getByIdEmployeesUseCases";
  static CREATE_ONE_EMPLOYEE_USECASES = "createOneEmployeeUseCases";

  static register(): DynamicModule {
    return {
      module: UsecasesProxyEmployeeModule,
      providers: [
        {
          provide: UsecasesProxyEmployeeModule.GET_ALL_EMPLOYEES_USECASES,
          inject: [EmployeeDboRepository, UserClient],
          useFactory: (
            employeeRepository: EmployeeDboRepository,
            userClient: UserClient,
          ) =>
            new UseCaseProxy(
              new GetAllEmployeesUseCase(
                employeeRepository,
                new EmployeeDomainToDtoMapper(userClient),
              ),
            ),
        },
        {
          provide: UsecasesProxyEmployeeModule.GET_BY_ID_EMPLOYEES_USECASES,
          inject: [EmployeeDboRepository, UserClient, IException],
          useFactory: (
            employeeRepository: EmployeeDboRepository,
            userClient: UserClient,
            exceptionsService: IException,
          ) =>
            new UseCaseProxy(
              new GetByIdEmployeeUseCase(
                employeeRepository,
                new EmployeeDomainToDtoMapper(userClient),
                exceptionsService,
              ),
            ),
        },
        {
          provide: UsecasesProxyEmployeeModule.CREATE_ONE_EMPLOYEE_USECASES,
          inject: [EmployeeDboRepository, UserClient],
          useFactory: (
            employeeRepository: EmployeeDboRepository,
            userClient: UserClient,
          ) =>
            new UseCaseProxy(
              new CreateOneEmployeeUseCase(
                employeeRepository,
                new EmployeeDomainToDtoMapper(userClient),
                userClient,
              ),
            ),
        },
      ],
      exports: [
        UsecasesProxyEmployeeModule.GET_ALL_EMPLOYEES_USECASES,
        UsecasesProxyEmployeeModule.GET_BY_ID_EMPLOYEES_USECASES,
        UsecasesProxyEmployeeModule.CREATE_ONE_EMPLOYEE_USECASES,
      ],
    };
  }
}
