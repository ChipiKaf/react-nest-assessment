import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SignUpDto } from './dtos/signup.dto';
import { AuthService } from './providers/auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Request, Response } from 'express';
import { User } from 'src/users/user.schema';
import { ConfigService } from '@nestjs/config';
import { BaseController } from './BaseController';

@Controller('auth')
export class AuthController extends BaseController {
  constructor(
    private readonly authService: AuthService,
    config: ConfigService,
  ) {
    super(config);
  }

  @ApiOperation({
    summary: 'Endpoint to sign users in',
  })
  @ApiResponse({
    status: 200,
    description: 'User successfully signed in',
  })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  public login(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const { user } = req;
    const token = this.authService.login(user as User);

    // Wrap token in httpOnly cookie to prevent XSS
    this.setAccessTokenCookie(res, token.access_token);

    return { message: 'Logged in successfully' };
  }

  @ApiOperation({
    summary: 'Endpoint to register user',
  })
  @Post('register')
  public async signUp(
    @Body() signUpDto: SignUpDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = await this.authService.signUp(signUpDto);

    // Wrap token in httpOnly cookie to prevent XSS
    this.setAccessTokenCookie(res, token.access_token);

    return { message: 'Signed up successfully' };
  }
}
