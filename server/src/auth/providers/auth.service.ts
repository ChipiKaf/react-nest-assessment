/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { SignUpDto } from '../dtos/signup.dto';
import { LoginDto } from '../dtos/login.dto';
import { ErrorStrings } from 'src/common/error-strings.enum';
import { HashingProvider } from './hashing.provider';
import { User } from 'src/users/user.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly hashingProvider: HashingProvider,
    private readonly jwtService: JwtService,
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
    console.log(email);
    const user = await this.usersService.findUserByEmail(email);

    if (!user) throw new UnauthorizedException(ErrorStrings.USER_NOT_FOUND);

    let isCorrect = false;

    try {
      isCorrect = await this.hashingProvider.comparePassword(
        userPassword,
        user.password,
      );
    } catch (error) {
      throw new RequestTimeoutException(error, {
        description: ErrorStrings.PROCESS_ERROR,
      });
    }

    if (!isCorrect)
      throw new UnauthorizedException(ErrorStrings.USER_NOT_FOUND);

    const { password, ...result } = user;
    return result; // Remove password from returned object
  }
}
