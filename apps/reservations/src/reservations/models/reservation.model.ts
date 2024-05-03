import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractSchema } from '@app/common';

@Schema({ versionKey: false })
export class ReservationModel extends AbstractSchema {
  @Prop()
  timestamp: number;
  @Prop()
  startDate: Date;
  @Prop()
  endDate: Date;
  @Prop()
  userId: string;
  @Prop()
  placeId: string;
  @Prop()
  invoiceId: string;
}

export const ReservationSchema = SchemaFactory.createForClass(ReservationModel)
