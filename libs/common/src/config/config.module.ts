import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  providers: [ConfigService],
  exports: [ConfigService],
  imports: [
    NestConfigModule.forRoot({
      validationSchema: Joi.object({
        MONGODB_URL: Joi.string().allow(''),
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
  ],
})
export class ConfigModule {}
