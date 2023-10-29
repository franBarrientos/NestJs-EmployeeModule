import { Body, Controller, Get, Inject, Param, Post } from "@nestjs/common";
import { UsecasesProxyEmployeeModule } from "../../usecases-proxy/usecases-proxy.employee.module";
import { UseCaseProxy } from "../../usecases-proxy/usecases-proxy";
import { GetAllEmployeesUseCase } from "../../../application/usecases/getAll.employee";
import { IException } from "../../../application/exceptions/exception.interface";
import { GetByIdEmployeeUseCase } from "../../../application/usecases/getById.employee";
import { CreateOneEmployeeUseCase } from "../../../application/usecases/createOne.employee";
import { EmployeeAddDto } from "../../../application/dtos/employeeAdd.dto";

@Controller("/api/v1/employees")
export class EmployeeController {
  constructor(
    @Inject(UsecasesProxyEmployeeModule.GET_ALL_EMPLOYEES_USECASES)
    private readonly getAllEmployeesUseCaseProxy: UseCaseProxy<GetAllEmployeesUseCase>,
    @Inject(UsecasesProxyEmployeeModule.GET_BY_ID_EMPLOYEES_USECASES)
    private readonly getByIdEmployeeUseCaseUseCaseProxy: UseCaseProxy<GetByIdEmployeeUseCase>,
    @Inject(UsecasesProxyEmployeeModule.CREATE_ONE_EMPLOYEE_USECASES)
    private readonly createOneEmployeeUseCase: UseCaseProxy<CreateOneEmployeeUseCase>,
  ) {}

  @Get()
  findAll() {
    return this.getAllEmployeesUseCaseProxy.getInstance().execute();
  }

  @Get("/:id")
  findOne(@Param("id") id: number) {
    return this.getByIdEmployeeUseCaseUseCaseProxy.getInstance().execute(id);
  }

  @Post()
  createOne(@Body() employeeAdd: EmployeeAddDto) {
    return this.createOneEmployeeUseCase.getInstance().execute(employeeAdd);
  }
}
