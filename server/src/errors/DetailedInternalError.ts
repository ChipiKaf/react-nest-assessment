import { HttpException, HttpStatus } from '@nestjs/common';

export class DetailedInternalException extends HttpException {
  public internalError: any;

  constructor(
    public readonly message: string,
    internalError: unknown,
  ) {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR);
    this.internalError = internalError;
  }
}
