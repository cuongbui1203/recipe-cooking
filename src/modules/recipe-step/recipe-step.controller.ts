import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { RecipeStepService } from './recipe-step.service';
import { FormDataRequest } from 'nestjs-form-data';
import { Recipe, RecipeStep, User } from '@entities';
import { CheckExistsPipe } from '@pipes';
import { GetUser } from '@decorators';
import { CreateRecipeStepDto, UpdateRecipeStepDto } from './dto';

@Controller('recipes/:recipeId/steps')
export class RecipeStepController {
  constructor(private readonly recipeStepService: RecipeStepService) {}

  @Post()
  @FormDataRequest()
  async createStep(
    @GetUser() user: User,
    @Param('recipeId', ParseIntPipe, CheckExistsPipe) recipe: Recipe,
    @Body() createRecipeStepDto: CreateRecipeStepDto,
  ) {
    return await this.recipeStepService.create(
      user,
      recipe,
      createRecipeStepDto,
    );
  }

  @Put(':id')
  @FormDataRequest()
  async updateStep(
    @GetUser() user: User,
    @Param('recipeId', ParseIntPipe, CheckExistsPipe) recipe: Recipe,
    @Param('id', ParseIntPipe, CheckExistsPipe) recipeStep: RecipeStep,
    @Body() updateRecipeStepDto: UpdateRecipeStepDto,
  ) {
    return await this.recipeStepService.update(
      user,
      recipe,
      recipeStep,
      updateRecipeStepDto,
    );
  }

  @Delete(':id')
  async deleteStep(
    @Param('recipeId', ParseIntPipe, CheckExistsPipe) recipe: Recipe,
    @Param('id', ParseIntPipe, CheckExistsPipe) recipeStep: RecipeStep,
  ) {
    return await this.recipeStepService.delete(recipe, recipeStep);
  }
}
