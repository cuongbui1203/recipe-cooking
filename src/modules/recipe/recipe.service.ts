import { Image, Recipe, User } from '@entities';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Like, Not, Repository } from 'typeorm';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { SearchRecipeDto } from './dto/search-recipe.dto';
import { v4 as uuidv4, v4 } from 'uuid';
import { deleteFile, storeFile } from '@utilities';
import { UpdateRecipeDto } from './dto';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(Recipe)
    private readonly recipeRepository: Repository<Recipe>,
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
  ) {}

  async findAll(searchDto: SearchRecipeDto): Promise<Recipe[]> {
    if (
      !searchDto.hasOwnProperty('name') &&
      !searchDto.hasOwnProperty('category_id')
    ) {
      return await this.recipeRepository.find();
    }

    return await this.recipeRepository.find({
      where: {
        title: Like(`%${searchDto.name ?? ''}%`),
        category_id: searchDto.category_id ?? Not(IsNull()),
      },
    });
  }

  async findOne(id: number): Promise<Recipe | undefined> {
    return await this.recipeRepository.findOneById(id);
  }

  async create(user: User, createRecipeDto: CreateRecipeDto): Promise<Recipe> {
    const recipe = this.recipeRepository.create();

    recipe.title = createRecipeDto.name;
    recipe.description = createRecipeDto.description;
    recipe.cookingTime = createRecipeDto.cookingTime;
    recipe.updated_by = user.id;
    recipe.category_id = createRecipeDto.category_id;
    if (createRecipeDto.image) {
      const image = this.imageRepository.create();
      image.name = uuidv4();
      image.extension = createRecipeDto.image.extension;
      image.path = await storeFile(createRecipeDto.image, image.name);
      await image.save();
      recipe.image_id = image.id;
      recipe.image = image;
    }

    return await this.recipeRepository.save(recipe);
  }

  async update(
    user: User,
    id: number,
    updateRecipeDto: UpdateRecipeDto,
  ): Promise<Recipe> {
    const recipe = await this.recipeRepository.findOneBy({ id });
    if (!recipe) {
      throw new NotFoundException('Recipe not found');
    }

    if (updateRecipeDto.name) recipe.title = updateRecipeDto.name;
    if (updateRecipeDto.description)
      recipe.description = updateRecipeDto.description;
    if (updateRecipeDto.cookingTime)
      recipe.cookingTime = updateRecipeDto.cookingTime;

    if (updateRecipeDto.image) {
      if (recipe.image.id) {
        deleteFile(recipe.image.path);
      }
      const image = this.imageRepository.create();
      image.name = v4();
      image.extension = updateRecipeDto.image.extension;
      image.path = await storeFile(updateRecipeDto.image, image.name);
      await image.save();
      recipe.image_id = image.id;
    }
    if (updateRecipeDto.category_id) {
      recipe.category_id = updateRecipeDto.category_id;
    }
    recipe.updated_by = user.id;
    await this.recipeRepository.save(recipe);

    return recipe;
  }

  async delete(recipe: Recipe) {
    deleteFile(recipe.image?.path);
    await this.imageRepository.remove(recipe.image);
    await this.recipeRepository.remove(recipe);
    return {
      message: 'Recipe deleted successfully',
    };
  }
}
