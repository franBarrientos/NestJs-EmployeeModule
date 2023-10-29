import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from "@nestjs/common";
import { ILogger } from "../../application/logger/logger.interface";
import { HandleClientHttpExceptionInterface } from "./handleClientHttpException.interface";

@Injectable()
export class AxiosHandleException
  implements HandleClientHttpExceptionInterface
{
  constructor(
    @Inject(ILogger)
    private readonly logger: ILogger,
  ) {}

  handleAxiosError(e: any, context: string): void {
    if (e.response) {
      // The client was given an error response (5xx, 4xx)
      switch (e.response.status) {
        case 401: {
          this.logger.error(
            context,
            e.message + " - " + e.response.data?.message ?? "",
          );
          throw new UnauthorizedException({
            message: e.response.data?.message ?? "Unauthorized",
            code_error: 401,
          });
        }
        case 403: {
          this.logger.error(
            context,
            e.message + " - " + e.response.data?.message ?? "",
          );
          throw new ForbiddenException({
            message: e.response.data?.message ?? "Forbidden",
            code_error: 403,
          });
        }
        case 404: {
          this.logger.error(
            context,
            e.message + " - " + e.response.data?.message ?? "",
          );
          throw new BadRequestException({
            message: e.response.data?.message ?? "Not Found",
            code_error: 404,
          });
        }
        case 500: {
          this.logger.error(
            context,
            e.message + " - " + e.response.data?.message ?? "",
          );
          throw new InternalServerErrorException({
            message: e.response.data?.message ?? "Internal Server Error",
            code_error: 500,
          });
        }
      }
    } else if (e.request) {
      // The client never received a response, and the request was never left
      this.logger.error(
        context,
        e.message + " - " + "Connection Error or Server Unavailable",
      );
      throw new InternalServerErrorException({
        message:
          " Service Unavailable - Service is currently unavailable. Please try again later'",
        code_error: 503,
      });
    } else {
      // Anything else
      this.logger.error(
        context,
        e.message + " - " + "Internal Server Erro - Unknown Error",
      );
      throw new InternalServerErrorException({
        message: " Internal Server Error - Uknown error.",
        code_error: 500,
      });
    }
  }
}
