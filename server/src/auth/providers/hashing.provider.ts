import { Injectable } from '@nestjs/common';

/**
 * Abstract class for hashing implementation. Can easily be swapped out with a different implementation
 */
@Injectable()
export abstract class HashingProvider {
  abstract hashPassword(password: string | Buffer): Promise<string>;

  abstract comparePassword(
    password: string | Buffer,
    encryptedPassword: string,
  ): Promise<boolean>;
}
