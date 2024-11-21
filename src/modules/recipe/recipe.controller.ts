import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { GetUser } from '@decorators';
import { Recipe, User } from '@entities';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { SearchRecipeDto } from './dto/search-recipe.dto';
import { FormDataRequest } from 'nestjs-form-data';
import { UpdateRecipeDto } from './dto';
import { CheckExistsPipe } from '@pipes';

@Controller('recipes')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Post('/')
  @FormDataRequest()
  async createRecipe(
    @GetUser() user: User,
    @Body() createRecipeDto: CreateRecipeDto,
  ) {
    return await this.recipeService.create(user, createRecipeDto);
  }

  @Get()
  async findAll(@Query() searchDto: SearchRecipeDto) {
    try {
      return await this.recipeService.findAll(searchDto);
    } catch (err) {
      console.log(err);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.recipeService.findOne(id);
  }

  @Put(':id')
  @FormDataRequest()
  async updateRecipe(
    @GetUser() user: User,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRecipeDto: UpdateRecipeDto,
  ) {
    return await this.recipeService.update(user, id, updateRecipeDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe, CheckExistsPipe) recipe: Recipe) {
    return await this.recipeService.delete(recipe);
  }
}
