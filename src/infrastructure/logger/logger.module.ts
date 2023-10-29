import { Module } from "@nestjs/common";
import { LoggerService } from "./logger.service";
import { ILogger } from "../../application/logger/logger.interface";

@Module({
  providers: [
    {
      useClass: LoggerService,
      provide: ILogger,
    },
  ],
  exports: [
    {
      useClass: LoggerService,
      provide: ILogger,
    },
  ],
})
export class LoggerModule {}
