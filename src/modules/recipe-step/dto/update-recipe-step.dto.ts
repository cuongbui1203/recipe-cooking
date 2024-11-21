import { CreateRecipeDto } from '@modules/recipe/dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateRecipeStepDto extends PartialType(CreateRecipeDto) {}
