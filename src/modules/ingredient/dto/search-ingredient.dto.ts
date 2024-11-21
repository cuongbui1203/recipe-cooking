import { IsString } from 'class-validator';

export class SearchIngredient {
  @IsString()
  name: string;
}
