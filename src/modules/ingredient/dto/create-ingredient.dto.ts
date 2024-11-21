import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { HasMimeType, IsFile, MemoryStoredFile } from 'nestjs-form-data';

export class CreateIngredientDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsOptional()
  @IsFile()
  @HasMimeType(['image/jpeg', 'image/png'])
  image?: MemoryStoredFile;
}
