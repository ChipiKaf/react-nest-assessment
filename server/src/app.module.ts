import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import environmentValidation from './config/environment.validation';
import { MongooseModule } from '@nestjs/mongoose';
import { AppLogger } from './logger/app.logger';
import logsConfig from './config/logs.config';
import { LoggerModule } from './logger/logger.module';

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    UsersModule,
    AuthModule,
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: !ENV ? '.env' : `.env${ENV}`,
      load: [appConfig, databaseConfig, logsConfig],
      validationSchema: environmentValidation,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('database.connectionString'),
        dbName: configService.get('database.name'),
        timeoutMS: 3000,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
