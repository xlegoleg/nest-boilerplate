import { Injectable } from '@nestjs/common';
import { ClickHouseClient, createClient } from '@clickhouse/client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ClickhouseService {
  private readonly instance: ClickHouseClient;

  public get db() {
    return this.instance;
  }
  public constructor(private configService: ConfigService) {
    try {
      this.instance = createClient({
        url: this.configService.get('CLICKHOUSE_URL'),
        database: this.configService.get('CLICKHOUSE_NAME'),
        username: this.configService.get('CLICKHOUSE_USER'),
        password: this.configService.get('CLICKHOUSE_PASSWORD'),
      });
    } catch (e) {
      console.error(
        '[Clickhouse] - an error occurred while connecting to database',
        e,
      );
    }
  }
}
