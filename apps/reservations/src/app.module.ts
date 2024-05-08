import { Module } from '@nestjs/common';
import { AUTH_SERVICE, LoggerModule, PAYMENTS_SERVICE } from '@app/common';
import { ReservationsModule } from './reservations/reservations.module';
import * as Joi from 'joi';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        HTTP_PORT: Joi.number().required(),
        AUTH_HOST: Joi.string().required(),
        AUTH_PORT: Joi.string().required(),
        PAYMENTS_HOST: Joi.string().required(),
        PAYMENTS_PORT: Joi.string().required(),
        MONGODB_URL: Joi.string().required(),
        CLICKHOUSE_URL: Joi.string().allow(''),
        CLICKHOUSE_NAME: Joi.string().allow(''),
        CLICKHOUSE_USER: Joi.string().allow(''),
        CLICKHOUSE_PASSWORD: Joi.string().allow(''),
        ELASTIC_NODE: Joi.string().allow(''),
        ELASTIC_USER: Joi.string().allow(''),
        ELASTIC_PASSWORD: Joi.string().allow(''),
      }),
      envFilePath: ['.env', '.env.test', '.env.local'],
    }),
    ClientsModule.registerAsync({
      isGlobal: true,
      clients: [
        {
          name: AUTH_SERVICE,
          useFactory: (configService: ConfigService) => ({
            transport: Transport.TCP,
            options: {
              host: configService.get('AUTH_HOST'),
              port: configService.get('AUTH_PORT'),
            },
          }),
          inject: [ConfigService],
        },
        {
          name: PAYMENTS_SERVICE,
          useFactory: (configService: ConfigService) => ({
            transport: Transport.TCP,
            options: {
              host: configService.get('PAYMENTS_HOST'),
              port: configService.get('PAYMENTS_PORT'),
            },
          }),
          inject: [ConfigService],
        },
      ],
    }),
    LoggerModule,
    ReservationsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
