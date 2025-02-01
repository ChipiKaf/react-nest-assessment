import {
  BadRequestException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { SignInDto } from '../dtos/signin.dto';
import { UsersService } from 'src/users/providers/users.service';
import { ErrorStrings } from 'src/common/error-strings';
import { HashingProvider } from './hashing.provider';

/**
 * Provider to handle all logic related to signing in
 */
@Injectable()
export class SignInProvider {
  constructor(
    private usersService: UsersService,
    private hashingProvider: HashingProvider,
  ) {}

  /**
   * Sign in business logic
   */
  public async signIn({ email, password }: SignInDto) {
    const user = await this.usersService.findUserByEmail(email);

    if (!user) throw new BadRequestException(ErrorStrings.USER_NOT_FOUND);

    let isCorrect = false;

    try {
      isCorrect = await this.hashingProvider.comparePassword(
        password,
        user.password,
      );
    } catch (error) {
      throw new RequestTimeoutException(error, {
        description: ErrorStrings.PROCESS_ERROR,
      });
    }

    if (!isCorrect) throw new BadRequestException(ErrorStrings.USER_NOT_FOUND);

    return { accessToken: 'Here is the access token' };
  }
}
