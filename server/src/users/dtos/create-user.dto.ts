import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { MAX_NAME_LENGTH, MIN_NAME_LENGTH } from 'src/common/constants';
import { IsStrongPassword } from 'src/common/decorators/is-strong-password.decorator';
export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsStrongPassword() // Apply password checks
  password: string;

  // Only for extensibility
  @IsNotEmpty()
  @MinLength(MIN_NAME_LENGTH)
  @MaxLength(MAX_NAME_LENGTH)
  name: string;
}
