import { applyDecorators } from '@nestjs/common';
import { IsNotEmpty, Matches, MinLength } from 'class-validator';
import { MIN_PASSWORD_LENGTH } from '../constants';
import { ErrorStrings } from '../error-strings.enum';

/**
 * Check if password meets the desired strength requirements
 */
export function IsStrongPassword() {
  return applyDecorators(
    IsNotEmpty(),
    MinLength(MIN_PASSWORD_LENGTH),
    Matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
      {
        message: ErrorStrings.PASSWORD_MISMATCH,
      },
    ),
  );
}
