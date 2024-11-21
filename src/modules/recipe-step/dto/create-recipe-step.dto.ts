import { IsNotEmpty, IsString } from 'class-validator';
import { HasMimeType, IsFile, MemoryStoredFile } from 'nestjs-form-data';

export class CreateRecipeStepDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsFile()
  @HasMimeType(['image/jpeg', 'image/png'])
  image: MemoryStoredFile;
}
