import { PrimaryGeneratedColumn } from 'typeorm';

export abstract class AbstractPostgresEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}