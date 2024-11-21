import { Module } from '@nestjs/common';
import { IngredientController } from './ingredient.controller';
import { IngredientService } from './ingredient.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image, Ingredient } from '@entities';

@Module({
  imports: [TypeOrmModule.forFeature([Ingredient, Image])],
  controllers: [IngredientController],
  providers: [IngredientService],
  exports: [],
})
export class IngredientModule {}
