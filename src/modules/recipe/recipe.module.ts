import { Image, Recipe } from '@entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';

@Module({
  imports: [TypeOrmModule.forFeature([Recipe, Image])],
  controllers: [RecipeController],
  providers: [RecipeService],
  exports: [],
})
export class RecipeModule {}
