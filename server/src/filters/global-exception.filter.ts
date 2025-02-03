import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { DetailedInternalException } from 'src/errors/DetailedInternalError';
import { Request, Response } from 'express';
import { AppLogger } from 'src/logger/app.logger';

@Catch(HttpException)
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: AppLogger) {}
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();
    let errorResponse: any = {};

    if (exception instanceof DetailedInternalException) {
      this.logger.error(
        `Internal error on ${request.method} ${request.url}`,
        exception.internalError,
      );
      errorResponse = { message: exception.message };
    } else {
      errorResponse =
        typeof exceptionResponse === 'string'
          ? { message: exceptionResponse }
          : exceptionResponse;
    }

    response.status(status).json({
      ...errorResponse,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
