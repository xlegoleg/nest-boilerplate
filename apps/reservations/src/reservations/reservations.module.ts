import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { MongoModule } from '@app/common';
import { ReservationsRepository } from './reservations.repository';
import { ReservationModel, ReservationSchema } from './models/reservation.model';

@Module({
  imports: [MongoModule, MongoModule.forFeature([{
    name: ReservationModel.name,
    schema: ReservationSchema,
  }])],
  controllers: [ReservationsController],
  providers: [ReservationsService, ReservationsRepository],
})
export class ReservationsModule {}
