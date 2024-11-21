import { Image, Recipe, RecipeStep, User } from '@entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';
import { deleteFile, storeFile } from '@utilities';
import { CreateRecipeStepDto, UpdateRecipeStepDto } from './dto';

@Injectable()
export class RecipeStepService {
  constructor(
    @InjectRepository(RecipeStep)
    private readonly recipeStepRepository: Repository<RecipeStep>,
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
  ) {}

  async create(
    user: User,
    recipe: Recipe,
    createRecipeStepDto: CreateRecipeStepDto,
  ) {
    const recipeStep = this.recipeStepRepository.create();
    recipeStep.name = createRecipeStepDto.name;
    recipeStep.description = createRecipeStepDto.description;
    recipeStep.recipe_id = recipe.id;
    if (createRecipeStepDto.image) {
      const image = this.imageRepository.create();
      image.name = v4();
      image.extension = createRecipeStepDto.image.extension;
      image.path = await storeFile(createRecipeStepDto.image, image.name);
      await image.save();
      recipeStep.image_id = image.id;
    }
    recipeStep.updated_by = user.id;
    await this.recipeStepRepository.save(recipeStep);
    await recipe.reload();

    return {
      success: true,
      message: 'Recipe step created successfully',
      recipe,
    };
  }

  async update(
    user: User,
    recipe: Recipe,
    recipeStep: RecipeStep,
    updateRecipeStepDto: UpdateRecipeStepDto,
  ) {
    if (updateRecipeStepDto.name) recipeStep.name = updateRecipeStepDto.name;
    if (updateRecipeStepDto.description)
      recipeStep.description = updateRecipeStepDto.description;
    if (updateRecipeStepDto.image) {
      if (recipeStep.image.id) {
        deleteFile(recipeStep.image.path);
      }
      const image = this.imageRepository.create();
      image.name = v4();
      image.extension = updateRecipeStepDto.image.extension;
      image.path = await storeFile(updateRecipeStepDto.image, image.name);
      await image.save();
      recipeStep.image_id = image.id;
    }
    recipeStep.updated_by = user.id;
    await this.recipeStepRepository.save(recipeStep);
    await recipe.reload();

    return {
      success: true,
      message: 'Recipe step updated successfully',
      recipe,
    };
  }

  async delete(recipe: Recipe, recipeStep: RecipeStep) {
    if (recipeStep.image.id) {
      deleteFile(recipeStep.image.path);
    }
    await this.recipeStepRepository.delete({
      id: recipeStep.id,
    });

    await recipe.reload();

    return {
      success: true,
      message: 'Recipe step deleted successfully',
      recipe,
    };
  }
}
