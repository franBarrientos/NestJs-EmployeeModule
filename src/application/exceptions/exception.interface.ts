export interface IFormatExceptionMessage {
  message: string;
  code_error?: number;
}

export interface IException {
  badRequestException(data: IFormatExceptionMessage, context?: string): void;

  internalServerErrorException(data?: IFormatExceptionMessage, context?: string): void;

  forbiddenException(data?: IFormatExceptionMessage, context?: string): void;

  UnauthorizedException(data?: IFormatExceptionMessage, context?: string): void;
}

export const IException = Symbol("IException");
