import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'images',
})
export class Image extends BaseEntity {
  @Column()
  name: string;

  @Column()
  extension: string;

  @Column()
  path: string;

  @PrimaryGeneratedColumn()
  id: number;
}
