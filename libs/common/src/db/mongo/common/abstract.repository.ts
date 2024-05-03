import { AbstractSchema } from './abstract.schema';
import { FilterQuery, Model, Types, UpdateQuery } from 'mongoose';
import { Logger, NotFoundException } from '@nestjs/common';

export abstract class AbstractRepository<TDoc extends AbstractSchema> {
  protected abstract readonly logger: Logger;

  constructor(protected readonly model: Model<TDoc>) {}

  async create(document: Omit<TDoc, '_id'>): Promise<TDoc> {
    const createdDoc = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });
    return (await createdDoc.save()).toJSON() as unknown as TDoc;
  }

  async findOne(filterQuery: FilterQuery<TDoc>): Promise<TDoc> {
    const foundDoc = await this.model.findOne(filterQuery).lean<TDoc>(true);
    if (!foundDoc) {
      this.logger.warn('Document was not found with filter query', filterQuery);
      throw new NotFoundException('Document was not found');
    }
    return foundDoc;
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<TDoc>,
    updateQuery: UpdateQuery<TDoc>,
  ): Promise<TDoc> {
    const foundDoc = await this.model
      .findOneAndUpdate(filterQuery, updateQuery, {
        new: true,
      })
      .lean<TDoc>(true);
    if (!foundDoc) {
      this.logger.warn('Document was not found with filter query', filterQuery);
      throw new NotFoundException('Document was not found');
    }
    return foundDoc;
  }

  async findOneAndDelete(filterQuery: FilterQuery<TDoc>): Promise<TDoc> {
    return this.model.findOneAndUpdate(filterQuery).lean<TDoc>(true);
  }

  async find(filterQuery: FilterQuery<TDoc>): Promise<TDoc[]> {
    return this.model.find(filterQuery).lean<TDoc[]>(true);
  }
}
