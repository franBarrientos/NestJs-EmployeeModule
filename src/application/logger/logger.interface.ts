export interface ILogger {
  log(context: string, message: string): void;

  error(context: string, message: string, trace?: string): void;

  warn(context: string, message: string): void;
}

export const ILogger = Symbol("ILogger");