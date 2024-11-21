import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Image } from './image.entity';
import { Recipe } from './recipe.entity';

@Entity({
  name: 'recipe_steps',
})
export class RecipeStep extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  image_id: number;

  @Column()
  recipe_id: number;

  @ManyToOne(() => Image, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'image_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'image_id',
  })
  image: Image;

  @ManyToOne(() => Recipe, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'recipe_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'recipe_id',
  })
  recipe: Promise<Recipe>;
}
