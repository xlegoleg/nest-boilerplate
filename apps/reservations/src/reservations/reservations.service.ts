import { Inject, Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationsRepository } from './reservations.repository';
import { PAYMENTS_SERVICE } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly repository: ReservationsRepository,
    @Inject(PAYMENTS_SERVICE) private readonly paymentsService: ClientProxy,
  ) {}
  create(createReservationDto: CreateReservationDto, userId: string) {
    return this.repository.create({
      ...createReservationDto,
      userId,
      timestamp: new Date().getTime(),
    });
  }

  findAll() {
    return this.repository.find({});
  }

  findOne(id: string) {
    return this.repository.findOne({ id });
  }

  update(id: string, updateReservationDto: UpdateReservationDto) {
    return this.repository.findOneAndUpdate({ id }, updateReservationDto);
  }

  remove(id: string) {
    return this.repository.findOneAndDelete({ id });
  }
}
