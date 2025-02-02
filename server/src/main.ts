import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import * as mongoose from 'mongoose';
import { AppLogger } from './logger/app.logger';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { GlobalExceptionFilter } from './filters/global-exception.filter';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configurations
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  const logger = app.get(AppLogger);
  app.useLogger(logger);
  logger.log('Manual test log: logger is working', 'Bootstrap');
  /**
   * Middleware
   */
  app.use(cookieParser());

  /**
   * Interceptors
   */
  app.useGlobalInterceptors(new LoggingInterceptor(logger));

  /**
   * Filters
   */
  app.useGlobalFilters(new GlobalExceptionFilter(logger));

  /**
   * Swagger configuration
   */
  const config = new DocumentBuilder()
    .setTitle('Tech assessment APIs')
    .setDescription('Use the base API URL as http://localhost:3000')
    .setVersion('1.0')
    .addServer('http://localhost:3000')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
