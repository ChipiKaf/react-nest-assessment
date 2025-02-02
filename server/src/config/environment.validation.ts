import * as Joi from 'joi';
import { Environments } from 'src/common/environments.enum';

// Validate environment variables and set defaults
export default Joi.object({
  NODE_ENV: Joi.string()
    .valid(
      Environments.TEST,
      Environments.DEVELOPMENT,
      Environments.STAGING,
      Environments.PRODUCTION,
    )
    .default(Environments.DEVELOPMENT),
  DATABASE_CONNECTION_STRING: Joi.string(),
  DATABASE_NAME: Joi.string(),
  JWT_SECRET: Joi.string().default('my-secret-jwt-token'),
  JWT_TOKEN_AUDIENCE: Joi.string().default('localhost'),
  JWT_TOKEN_ISSUER: Joi.string().default('localhost'),
  JWT_ACCESS_TOKEN_TTL: Joi.string().default('3600'),
});
