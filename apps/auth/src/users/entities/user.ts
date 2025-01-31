import { AbstractPostgresEntity } from '@app/common/db/postgres';
import { Column, Entity } from 'typeorm';

@Entity()
export class User extends AbstractPostgresEntity {
  @Column({
    length: 50,
  })
  name: string;

  @Column({
    length: 50,
  })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'varchar',
    length: 50,
    array: true,
    nullable: true,
  })
  roles: string[];
}
