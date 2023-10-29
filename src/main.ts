import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { PortConfigService } from "./infrastructure/config/port.config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const server = await app.listen(0);
  const assignedPort = server.address().port;
  console.log(`Server is running on port ${assignedPort}`);
  app.get(PortConfigService).setPort(assignedPort);
}

bootstrap();
