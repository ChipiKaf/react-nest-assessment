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
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { BaseController } from './BaseController';
import { AuthenticatedRequest } from 'src/interfaces/authenticated-request.interface';

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
  public login(
    @Req() req: AuthenticatedRequest,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { user } = req;
    const token = this.authService.login(user);

    // Wrap token in httpOnly cookie to prevent XSS
    this.setAccessTokenCookie(res, token.access_token);

    const { email, name } = user;

    return { email, name };
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

    const { email, name } = signUpDto;

    return { email, name };
  }
}
