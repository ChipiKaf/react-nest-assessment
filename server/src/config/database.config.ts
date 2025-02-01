import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  connectionString: process.env.DATABASE_CONNECTION_STRING,
  name: process.env.DATABASE_NAME,
}));
