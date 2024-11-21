import { Image, RecipeStep } from '@entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeStepController } from './recipe-step.controller';
import { RecipeStepService } from './recipe-step.service';

@Module({
  imports: [TypeOrmModule.forFeature([RecipeStep, Image])],
  controllers: [RecipeStepController],
  providers: [RecipeStepService],
  exports: [],
})
export class RecipeStepModule {}
