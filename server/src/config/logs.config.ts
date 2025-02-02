import { registerAs } from '@nestjs/config';

export default registerAs('logs', () => ({
  level: process.env.LOG_LEVEL,
}));
