import { IsExists } from '@validators';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class SearchRecipeDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsNumber()
  @IsExists({
    column: 'id',
    tableName: 'categories',
  })
  category_id?: number;
}
