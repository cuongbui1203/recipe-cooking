import { Column, Entity } from 'typeorm';
import { BaseUserEntity } from './base-user.entity';
import { Exclude } from 'class-transformer';

@Entity({
  name: 'users',
})
export class User extends BaseUserEntity {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;
}
