import { Module } from "@nestjs/common";
import { EmployeeController } from "./employee.controller";
import { UsecasesProxyEmployeeModule } from "../../usecases-proxy/usecases-proxy.employee.module";
import { ExceptionsModule } from "../../exceptions/exceptions.module";

@Module({
  imports: [UsecasesProxyEmployeeModule.register(), ExceptionsModule],
  controllers: [EmployeeController],
})
export class ControllersModule {}
