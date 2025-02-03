// logging.interceptor.ts
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { AppLogger } from '../logger/app.logger';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: AppLogger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    if (context.getType() === 'http') {
      const request = context.switchToHttp().getRequest<Request>();
      const { method, url, params, query } = request;
      const now = Date.now();

      // Log the incoming request details
      this.logger.log(
        `Incoming request: ${method} ${url} - Params: ${JSON.stringify(
          params,
        )} - Query: ${JSON.stringify(query)} - Body: ${JSON.stringify(request.body)}`,
        'HTTP',
      );

      return next.handle().pipe(
        tap(() => {
          const response = context.switchToHttp().getResponse<Response>();
          const statusCode = response.statusCode;
          const duration = Date.now() - now;
          // Log the outgoing response details
          this.logger.log(
            `Response: ${method} ${url} - Status: ${statusCode} - Duration: ${duration}ms`,
            'HTTP',
          );
        }),
        catchError((err) => {
          const response = context
            .switchToHttp()
            .getResponse<{ statusCode: number }>();
          const statusCode =
            err instanceof HttpException
              ? err.getStatus()
              : response.statusCode;
          const duration = Date.now() - now;

          const errMessage =
            typeof err === 'object' && err !== null && 'message' in err
              ? (err as { message: string }).message
              : 'Unknown error';

          const errResponseMessage =
            typeof err === 'object' &&
            err !== null &&
            'response' in err &&
            (err as { response?: { message?: unknown } }).response
              ? JSON.stringify(
                  (err as { response?: { message?: unknown } }).response
                    ?.message || {},
                )
              : '{}';

          // Log the error details
          this.logger.error(
            `Error: ${method} ${url} - Status: ${statusCode} - Duration: ${duration}ms - Error: ${errMessage} ${errResponseMessage}`,
            err instanceof Error ? err.stack : undefined,
            'HTTP',
          );
          throw err;
        }),
      );
    }

    // If not HTTP, just pass through
    return next.handle();
  }
}
