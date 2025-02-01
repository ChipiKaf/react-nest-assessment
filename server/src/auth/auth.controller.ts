import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { SignInDto } from './dtos/signin.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SignUpDto } from './dtos/signup.dto';
import { AuthService } from './providers/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @ApiOperation({
    summary: 'Endpoint to sign users in',
  })
  @ApiResponse({
    status: 200,
    description: 'User successfully signed in',
  })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  public signIn(@Body() signInDto: SignInDto) {
    const user = this.authService.signIn(signInDto);
    return user;
  }

  @ApiOperation({
    summary: 'Endpoint to register user',
  })
  @Post('register')
  public signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }
}
