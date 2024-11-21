import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { RecipeStep } from './recipe-step.entity';
import { Image } from './image.entity';
import { Category } from './category.entity';

@Entity({
  name: 'recipes',
})
export class Recipe extends BaseEntity {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column({
    name: 'cooking_time',
  })
  cookingTime: number;

  @Column()
  image_id: number;

  @Column()
  category_id: number;

  @OneToMany(() => RecipeStep, (step) => step.recipe, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  steps: RecipeStep[];

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

  @ManyToOne(() => Category, {
    eager: true,
  })
  @JoinColumn({
    name: 'category_id',
    referencedColumnName: 'id',
  })
  category: Category;
}
