import {
  Body,
  Controller,
  Get,
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
import { JwtAuthGuard } from './guards/jwt-auth.guard';

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

  @UseGuards(JwtAuthGuard)
  @Get('me')
  public async me(@Req() req: AuthenticatedRequest) {
    return this.authService.checkAuth(req.user.email);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  public logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token', {
      httpOnly: true,
      secure: this.config.get('ENVIRONMENT') === 'PRODUCTION',
      sameSite: 'lax',
    });
    return { message: 'Logged out successfully' };
  }
}
