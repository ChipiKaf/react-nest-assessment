import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { SignInDto } from './dtos/signin.dto';
import { UsersService } from 'src/users/providers/users.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly usersService: UsersService) {}
  @ApiOperation({
    summary: 'Endpoint to sign users in',
  })
  @ApiResponse({
    status: 200,
    description: 'User successfully signed in',
  })
  @Post()
  @HttpCode(HttpStatus.OK)
  public signIn(@Body() signInDto: SignInDto) {
    console.log(signInDto);
    const user = this.usersService.findUserByEmail(signInDto.email);
    console.log(user);
    return 'temp-token';
  }
}
