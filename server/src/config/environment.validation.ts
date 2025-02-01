import * as Joi from 'joi';
import { Environments } from 'src/common/environments';

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
});
