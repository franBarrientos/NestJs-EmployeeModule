// eureka-config.service.ts
import { Injectable } from "@nestjs/common";
import { PortConfigService } from "../config/port.config";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class EurekaConfigService {
  constructor(
    private configService: ConfigService,
    private portConfigService: PortConfigService,
  ) {}

  getEurekaConfig() {
    const assignedPort = this.portConfigService.getPort();
    return {
      eureka: {
        host: this.configService.get("EUREKA_HOST"),
        port: this.configService.get("EUREKA_PORT"),
        servicePath: "/eureka/apps",
        ipAddr: "127.0.0.1",
      },
      service: {
        name: this.configService.get("EUREKA_SERVICE_NAME"),
        port: assignedPort,
      },
    };
  }
}
