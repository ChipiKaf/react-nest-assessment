import { Injectable, ConsoleLogger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as winston from 'winston';

@Injectable()
export class AppLogger extends ConsoleLogger {
  private logger: winston.Logger;

  constructor(private configService: ConfigService) {
    super();
    this.logger = winston.createLogger({
      level: this.configService.get<string>('level'),
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'app.log' }),
      ],
    });
  }

  log(message: string, context?: string) {
    super.log(message, context);
  }

  error(message: string, trace?: string, context?: string) {
    super.error(message, trace, context);
  }

  warn(message: string, context?: string) {
    super.warn(message, context);
  }

  // Optionally, add methods for verbose, debug, etc.
}
