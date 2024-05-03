import { SchemaTypes, Types } from 'mongoose';
import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export abstract class AbstractSchema {
  @Prop({ type: SchemaTypes.ObjectId })
  _id: Types.ObjectId;
}
