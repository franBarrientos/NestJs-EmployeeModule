import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { UserClient } from "./user.client";
import { EurekaModule } from "nestjs-eureka";
import { LoggerModule } from "../logger/logger.module";
import { ExceptionsModule } from "../exceptions/exceptions.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { EurekaConfigService } from "./eureka.config";

@Module({
  imports: [
    ConfigModule,
    HttpModule.register({
      timeout: 25000,
      maxRedirects: 5,
    }),
    EurekaModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService, EurekaConfigService],
      useFactory: (
        configService: ConfigService,
        eurekaConfigService: EurekaConfigService, // Inyecta el servicio de configuración de Eureka
      ) => eurekaConfigService.getEurekaConfig(), // Obtiene la configuración actualizada
    }), /*
      eureka: {
        host: "localhost",
        port: 8761,
        servicePath: "/eureka/apps",
        maxRetries: 10,
        requestRetryDelay: 10000,
      },
      service: {
        name: "nest-service",
        port: 0,
      },
    }),*/
    LoggerModule,
    ExceptionsModule,
  ],
  providers: [UserClient, EurekaConfigService],
  exports: [UserClient, EurekaConfigService],
})
export class ClientsModule {}
