import { IsUnique } from '@validators';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsEmail()
  @IsUnique({
    column: 'email',
    tableName: 'users',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(8)
  password: string;
}
