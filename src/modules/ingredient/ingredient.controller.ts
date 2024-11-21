import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import { FormDataRequest } from 'nestjs-form-data';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { GetUser } from '@decorators';
import { User } from '@entities';

@Controller('ingredients')
export class IngredientController {
  constructor(private readonly ingredientService: IngredientService) {}

  @Post()
  @FormDataRequest()
  async store(
    @GetUser() user: User,
    @Body() createIngredientDto: CreateIngredientDto,
  ) {
    return await this.ingredientService.create(user, createIngredientDto);
  }

  @Get()
  async index() {
    return await this.ingredientService.findAll();
  }

  @Get()
  async search(@Query() search: any) {}
}
