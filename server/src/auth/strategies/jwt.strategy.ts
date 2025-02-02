/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Request } from 'express';
import JwtConfig from 'src/auth/config/jwt.config';
import jwtConfig from 'src/auth/config/jwt.config';
import { ConfigType } from '@nestjs/config';

/**
 * Strategy to get the JWT token from an HttpOnly cookie
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(jwtConfig.KEY)
    private readonly jwtConfig: ConfigType<typeof JwtConfig>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request): string => {
          return req?.cookies?.access_token || '';
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: jwtConfig.secret || '',
    });
  }
  validate({ sub, email }: { sub: string; email: string }): unknown {
    return { userId: sub, email };
  }
}
