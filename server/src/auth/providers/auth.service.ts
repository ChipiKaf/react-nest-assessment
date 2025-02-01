import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { SignUpDto } from '../dtos/signup.dto';
import { SignInDto } from '../dtos/signin.dto';
import { SignInProvider } from './sign-in.provider';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly signInProvider: SignInProvider,
  ) {}

  public signUp(signUpDto: SignUpDto) {
    return this.usersService.createUser({ ...signUpDto, isVerified: false });
  }

  public signIn(signInDto: SignInDto) {
    return this.signInProvider.signIn(signInDto);
  }
}
