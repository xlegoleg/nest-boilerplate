import { SchemaOptions } from '@nestjs/mongoose';

export const MONGO_SCHEMA_OPTIONS: SchemaOptions = {
  versionKey: false,
  id: true,
  toJSON: {
    virtuals: true,
    transform: function (_, ret: any) {
      delete ret._id;
      return ret;
    },
  },
};
