import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { LoggerModule } from '@app/common';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        HTTP_PORT: Joi.number().required(),
        TCP_PORT: Joi.number().required(),
        NOTIFICATIONS_SMTP_USER: Joi.string().required(),
        NOTIFICATIONS_CLIENT_ID: Joi.string().required(),
        NOTIFICATIONS_CLIENT_SECRET: Joi.string().required(),
        NOTIFICATIONS_REFRESH_TOKEN: Joi.string().required(),
      }),
      envFilePath: ['.env', '.env.test', '.env.local'],
    }),
    LoggerModule,
    NotificationsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
