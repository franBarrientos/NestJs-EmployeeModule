import { Module } from "@nestjs/common";
import { DbConfigModule } from "../config/dbConfig.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EmployeeEntity } from "../entities/employe.entity";
import { EmployeeDboRepository } from "./employeeDbo.repository";
import { MappersModule } from "../mappers/mappers.module";

@Module({
  imports: [
    DbConfigModule,
    TypeOrmModule.forFeature([EmployeeEntity]),
    MappersModule,
  ],
  exports: [EmployeeDboRepository],
  providers: [EmployeeDboRepository],
})
export class RepositoriesModule {}
