export interface HandleClientHttpExceptionInterface {
  handleAxiosError(e: any, context: string): void;
}

export const HandleClientHttpExceptionInterface = Symbol(
  "HandleClientHttpExceptionInterface",
);
