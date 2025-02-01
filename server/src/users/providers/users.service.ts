import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';

@Injectable()
export class UsersService {
  public createUser(createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return { id: 0 };
  }

  public findUserByEmail(email: string) {
    return { id: 0, email };
  }
}
