import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Image } from './image.entity';

@Entity({
  name: 'ingredients',
})
export class Ingredient extends BaseEntity {
  @Column()
  name: string;
  @Column()
  description: string;

  @Column({
    name: 'image_id',
  })
  image_id: number;

  @ManyToOne(() => Image, (image: Image) => image.id)
  @JoinColumn({
    foreignKeyConstraintName: 'image_id',
    referencedColumnName: 'id',
    name: 'image_id',
  })
  image: Promise<Image>;
}
