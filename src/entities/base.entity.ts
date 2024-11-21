import {
  Column,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  BaseEntity as TypeormBaseEntity,
} from 'typeorm';

export abstract class BaseEntity extends TypeormBaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Column({
    name: 'updated_by',
    type: 'bigint',
    nullable: false,
  })
  updated_by: number;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp',
    nullable: true,
  })
  deletedAt: Date;
}
