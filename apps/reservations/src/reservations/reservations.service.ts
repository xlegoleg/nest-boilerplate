import { Inject, Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationsRepository } from './reservations.repository';
import { PAYMENTS_SERVICE, UserDto } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly repository: ReservationsRepository,
    @Inject(PAYMENTS_SERVICE) private readonly paymentsService: ClientProxy,
  ) {}
  async create(
    createReservationDto: CreateReservationDto,
    { email, id: userId }: UserDto,
  ) {
    return this.paymentsService
      .send('create_charge', { charge: createReservationDto.charge, email })
      .pipe(
        map((v) => {
          return this.repository.create({
            ...createReservationDto,
            userId,
            timestamp: new Date().getTime(),
            invoiceId: v.id,
          });
        }),
      );
  }

  async findAll() {
    return this.repository.find({});
  }

  async findOne(id: string) {
    return this.repository.findOne({ id });
  }

  async update(id: string, updateReservationDto: UpdateReservationDto) {
    return this.repository.findOneAndUpdate({ id }, updateReservationDto);
  }

  async remove(id: string) {
    return this.repository.findOneAndDelete({ id });
  }
}
