import { Module } from '@nestjs/common';
import { ConfigModule, LoggerModule } from '@app/common';
import { ReservationsModule } from './reservations/reservations.module';

@Module({
  imports: [LoggerModule, ConfigModule, ReservationsModule],
})
export class AppModule {}
