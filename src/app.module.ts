import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { DbConfigModule } from "./infrastructure/DB/TypeORM/config/dbConfig.module";
import { ControllersModule } from "./infrastructure/Rest/Resources/controllers.module";
import { ClientsModule } from "./infrastructure/clients/clients.module";
import { PortConfigService } from "./infrastructure/config/port.config";
import { EurekaConfigService } from "./infrastructure/clients/eureka.config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DbConfigModule,
    ControllersModule,
    ClientsModule,
  ],
  providers: [PortConfigService, EurekaConfigService],
  exports: [PortConfigService, EurekaConfigService],
})
export class AppModule {}
