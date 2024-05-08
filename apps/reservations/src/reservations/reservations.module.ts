import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { MongoModule } from '@app/common';
import { ReservationsRepository } from './reservations.repository';
import {
  ReservationModel,
  ReservationSchema,
} from './models/reservation.model';
import { ClientsModule } from '@nestjs/microservices';

@Module({
  imports: [
    MongoModule.forFeature([
      {
        name: ReservationModel.name,
        schema: ReservationSchema,
      },
    ]),
    MongoModule,
    ClientsModule,
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService, ReservationsRepository],
})
export class ReservationsModule {}
