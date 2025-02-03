/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { SignUpDto } from '../dtos/signup.dto';
import { LoginDto } from '../dtos/login.dto';
import { ErrorStrings } from 'src/common/error-strings.enum';
import { HashingProvider } from './hashing.provider';
import { User } from 'src/users/user.schema';
import { JwtService } from '@nestjs/jwt';
import { DetailedInternalException } from 'src/errors/DetailedInternalError';
import { AppLogger } from 'src/logger/app.logger';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly hashingProvider: HashingProvider,
    private readonly jwtService: JwtService,
    private readonly logger: AppLogger,
  ) {}

  public async signUp(signUpDto: SignUpDto) {
    const user = await this.usersService.createUser(signUpDto);

    // Sign user in immediately
    return this.login(user);
  }

  public login(user: User) {
    const payload = { sub: user._id, email: user.email };

    return {
      access_token: this.jwtService.sign(payload, { expiresIn: '15m' }),
    };
  }

  /**
   * Validate the user credentials
   */
  public async validate({ email, password: userPassword }: LoginDto) {
    const user = await this.usersService.findUserByEmail(email);

    if (!user) {
      this.logger.error(ErrorStrings.USER_NOT_FOUND + '. Email not registered');
      throw new UnauthorizedException(ErrorStrings.USER_NOT_FOUND);
    }

    let isCorrect = false;

    try {
      isCorrect = await this.hashingProvider.comparePassword(
        userPassword,
        user.password,
      );
    } catch (error) {
      this.logger.error(String(error));
      throw new InternalServerErrorException(ErrorStrings.PROCESS_ERROR);
    }

    if (!isCorrect) {
      this.logger.error(ErrorStrings.USER_NOT_FOUND + '. Password not correct');
      throw new UnauthorizedException(ErrorStrings.USER_NOT_FOUND);
    }

    const { password, ...result } = user;
    return result; // Remove password from returned object
  }
}
