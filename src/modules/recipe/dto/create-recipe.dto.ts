import { IsExists } from '@validators';
import {
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';
import { HasMimeType, IsFile, MemoryStoredFile } from 'nestjs-form-data';

export class CreateRecipeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumberString()
  @IsNotEmpty()
  cookingTime: number;

  @IsOptional()
  @IsFile()
  @HasMimeType(['image/jpeg', 'image/png'])
  image?: MemoryStoredFile;

  @IsNumber()
  @IsExists({
    tableName: 'categories',
    column: 'id',
  })
  category_id: number;
}
