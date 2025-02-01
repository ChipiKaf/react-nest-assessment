import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';

/**
 * Handles connecting to users Table and business logic pertaining to user
 */
@Injectable()
export class UsersService {
  /**
   * Inserts a new user into the db
   */
  public createUser(createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return { id: 0 };
  }

  /**
   * Returns a user to whom the passed id belongs
   */
  public findUserByEmail(email: string) {
    return { id: 0, email };
  }
}
