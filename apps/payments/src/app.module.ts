import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { LoggerModule } from '@app/common';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        HTTP_PORT: Joi.number().required(),
        TCP_PORT: Joi.number().required(),
        STRIPE_KEY: Joi.string().required(),
      }),
      envFilePath: ['.env', '.env.test', '.env.local'],
    }),
    LoggerModule,
    PaymentsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
