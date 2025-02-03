/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// logging.interceptor.ts
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { AppLogger } from '../logger/app.logger';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: AppLogger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    if (context.getType() === 'http') {
      const request = context.switchToHttp().getRequest();
      const { method, url, params, query, body } = request;
      const now = Date.now();

      // Log the incoming request details
      this.logger.log(
        `Incoming request: ${method} ${url} - Params: ${JSON.stringify(
          params,
        )} - Query: ${JSON.stringify(query)} - Body: ${JSON.stringify(body)}`,
        'HTTP',
      );

      return next.handle().pipe(
        tap((data) => {
          const response = context.switchToHttp().getResponse();
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
          console.log(err.response.message);
          this.logger.error(
            `Error: ${method} ${url} - Status: ${statusCode} - Duration: ${duration}ms - Error: ${err.message} ${JSON.stringify(err.response?.message || {})}`,
            err.stack,
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
