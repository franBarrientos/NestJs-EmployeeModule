import {
  IException,
  IFormatExceptionMessage,
} from "../../application/exceptions/exception.interface";
import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from "@nestjs/common";
import { ILogger } from "../../application/logger/logger.interface";

@Injectable()
export class ExceptionsService implements IException {
  constructor(
    @Inject(ILogger)
    private readonly logger: ILogger,
  ) {}

  badRequestException(data: IFormatExceptionMessage, context?: string): void {
    this.logger.error(context ?? "Bad Request", data.message);
    throw new BadRequestException(data);
  }

  internalServerErrorException(
    data?: IFormatExceptionMessage,
    context?: string,
  ): void {
    this.logger.error(context ?? "Internal Server Error", data.message);
    throw new InternalServerErrorException(data);
  }

  forbiddenException(data?: IFormatExceptionMessage, context?: string): void {
    this.logger.error(context ?? "Forbidden", data.message);
    throw new ForbiddenException(data);
  }

  UnauthorizedException(
    data?: IFormatExceptionMessage,
    context?: string,
  ): void {
    this.logger.error(context ?? "Unauthorized", data.message);
    throw new UnauthorizedException(data);
  }
}
