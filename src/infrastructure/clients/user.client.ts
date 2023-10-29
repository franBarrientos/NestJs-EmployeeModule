import { UserClientInterface } from "../../application/clients/user.client.interface";
import { UserDTO } from "../../application/clients/dtos/user.dto";
import { Inject, Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { DiscoveryService } from "nestjs-eureka/dist/discovery/discovery.service";
import { ServiceDto } from "nestjs-eureka/dist/interfaces/service";
import { AxiosResponse } from "axios";
import { HandleClientHttpExceptionInterface } from "../exceptions/handleClientHttpException.interface";
import { UserAddDto } from "../../application/clients/dtos/userAdd.dto";

@Injectable()
export class UserClient implements UserClientInterface {
  constructor(
    private readonly eurekaService: DiscoveryService,
    private readonly httpService: HttpService,
    @Inject(HandleClientHttpExceptionInterface)
    private readonly handleClientHttpException: HandleClientHttpExceptionInterface,
  ) {}

  getBaseUrl(): string {
    const userService: ServiceDto = this.eurekaService.resolveHostname("users");
    return `http://${userService.host}:${userService.port}`;
  }

  findById(id: number): Promise<UserDTO> {
    const userUrlService = `${this.getBaseUrl()}/api/v1/users/${id}`;

    return this.httpService
      .get(userUrlService)
      .toPromise()
      .then((r: AxiosResponse) => r.data.body)
      .catch((e) =>
        this.handleClientHttpException.handleAxiosError(
          e,
          "UserClient Class - findById",
        ),
      );
  }

  createOne(user: UserAddDto): Promise<UserDTO> {
    const userUrlServiceAdd = `${this.getBaseUrl()}/api/v1/auth/register`;
    return this.httpService
      .post(userUrlServiceAdd, {
        firstName: user.firstName,
        lastName: user.lastName,
        password: user.password,
        email: user.email,
        city: user.city,
        age: user.age,
        province: user.province,
      })
      .toPromise()
      .then((r: AxiosResponse) => r.data.body.user)
      .catch((e) =>
        this.handleClientHttpException.handleAxiosError(
          e,
          "UserClient Class - createOne",
        ),
      );
  }
}
