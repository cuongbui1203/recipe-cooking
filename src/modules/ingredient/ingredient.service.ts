import { Image, Ingredient, User } from '@entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { v4 as uuidv4 } from 'uuid';
import { storeFile } from '@utilities';

@Injectable()
export class IngredientService {
  constructor(
    @InjectRepository(Ingredient)
    private readonly ingredientRepository: Repository<Ingredient>,
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
  ) {}

  async create(user: User, createIngredientDto: CreateIngredientDto) {
    const ingredient = this.ingredientRepository.create();
    ingredient.name = createIngredientDto.name;
    ingredient.description = createIngredientDto.description;
    if (createIngredientDto.hasOwnProperty('image')) {
      const image = this.imageRepository.create();
      image.name = uuidv4();
      image.extension = createIngredientDto.image.extension;
      image.path = await storeFile(createIngredientDto.image, image.name);
      ingredient.image = Promise.resolve(image);
      await image.save();
    }
    ingredient.updated_by = user.id;
    await this.ingredientRepository.save(ingredient);

    return ingredient;
  }

  async findAll(): Promise<Ingredient[]> {
    return await this.ingredientRepository.find({ relations: ['image'] });
  }
}
