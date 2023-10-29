// port-config.service.ts

import { Injectable } from "@nestjs/common";

@Injectable()
export class PortConfigService {
  private port: number = 0;

  setPort(port: number): void {
    this.port = port;
  }

  getPort(): number {
    return this.port;
  }
}
