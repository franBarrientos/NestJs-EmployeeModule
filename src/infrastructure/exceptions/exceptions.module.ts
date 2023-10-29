import { Module } from "@nestjs/common";
import { ExceptionsService } from "./exceptions.service";
import { IException } from "../../application/exceptions/exception.interface";
import { LoggerModule } from "../logger/logger.module";
import { AxiosHandleException } from "./axios.handleException";
import { HandleClientHttpExceptionInterface } from "./handleClientHttpException.interface";

@Module({
  imports: [LoggerModule],
  providers: [
    {
      useClass: ExceptionsService,
      provide: IException,
    },
    {
      useClass: AxiosHandleException,
      provide: HandleClientHttpExceptionInterface,
    },
  ],
  exports: [
    {
      useClass: ExceptionsService,
      provide: IException,
    },
    {
      useClass: AxiosHandleException,
      provide: HandleClientHttpExceptionInterface,
    },
  ],
})
export class ExceptionsModule {}
