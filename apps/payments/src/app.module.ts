import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { LoggerModule, NOTIFICATIONS_SERVICE } from '@app/common';
import { PaymentsModule } from './payments/payments.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        HTTP_PORT: Joi.number().required(),
        TCP_PORT: Joi.number().required(),
        STRIPE_KEY: Joi.string().required(),
        NOTIFICATIONS_HOST: Joi.string().required(),
        NOTIFICATIONS_PORT: Joi.number().required(),
      }),
      envFilePath: ['.env', '.env.test', '.env.local'],
    }),
    ClientsModule.registerAsync({
      isGlobal: true,
      clients: [
        {
          name: NOTIFICATIONS_SERVICE,
          useFactory: (configService: ConfigService) => ({
            transport: Transport.TCP,
            options: {
              host: configService.get('NOTIFICATIONS_HOST'),
              port: configService.get('NOTIFICATIONS_PORT'),
            },
          }),
          inject: [ConfigService],
        },
      ],
    }),
    LoggerModule,
    PaymentsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
