import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractMongoSchema, MONGO_SCHEMA_OPTIONS } from '@app/common';

@Schema(MONGO_SCHEMA_OPTIONS)
export class ReservationModel extends AbstractMongoSchema {
  @Prop()
  timestamp: number;

  @Prop()
  startDate: Date;

  @Prop()
  endDate: Date;

  @Prop()
  userId: string;

  @Prop()
  invoiceId: string;
}

export const ReservationSchema = SchemaFactory.createForClass(ReservationModel);
