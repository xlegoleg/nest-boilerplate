import { AbstractMongoRepository } from '@app/common';
import { ReservationModel } from './models/reservation.model';
import { Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export class ReservationsRepository extends AbstractMongoRepository<ReservationModel> {
  protected readonly logger = new Logger(ReservationsRepository.name);

  constructor(
    @InjectModel(ReservationModel.name)
    reservationModel: Model<ReservationModel>,
  ) {
    super(reservationModel);
  }
}
