// base.controller.ts
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { Environments } from 'src/common/environments.enum';
import { COOKIE_MAX_AGE } from 'src/common/constants';
import { CookieOptions } from 'src/common/cookie-options.enum';
import { Keys } from 'src/common/environment-keys.enum';

/**
 * To handle logic that would be common to all controllers
 */
export abstract class BaseController {
  constructor(protected readonly config: ConfigService) {}

  protected setAccessTokenCookie(res: Response, token: string): void {
    res.cookie('access_token', token, {
      httpOnly: true,
      secure: this.config.get(Keys.ENVIRONMENT) === Environments.PRODUCTION,
      sameSite: CookieOptions.LAX,
      maxAge: COOKIE_MAX_AGE,
    });
  }
}
