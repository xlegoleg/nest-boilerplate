import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { PostgresModule } from '@app/common/db/postgres';
import { LoggerModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        HTTP_PORT: Joi.number().required(),
        TCP_PORT: Joi.number().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION: Joi.string().required(),
        PG_HOST: Joi.string().allow(''),
        PG_PORT: Joi.string().allow(''),
        PG_NAME: Joi.string().allow(''),
        PG_USER: Joi.string().allow(''),
        PG_PASSWORD: Joi.string().allow(''),
      }),
      envFilePath: ['.env', '.env.test', '.env.local'],
    }),
    LoggerModule,
    PostgresModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
