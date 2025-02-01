import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import { User } from '../user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { ErrorStrings } from 'src/common/error-strings';
import { HashingProvider } from 'src/auth/providers/hashing.provider';
/**
 * Handles connecting to users Table and business logic pertaining to user
 */
@Injectable()
export class UsersService {
  constructor(
    /**
     * Config service
     */
    private readonly config: ConfigService,
    /**
     * Inject userModel
     */
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    /**
     * Inject hashing service provider
     */
    @Inject(forwardRef(() => HashingProvider))
    private readonly hashingProvider: HashingProvider,
  ) {}

  /**
   * Inserts a new user into the db
   */
  public async createUser(createUserDto: CreateUserDto) {
    const newUser = new this.userModel({
      ...createUserDto,
      password: await this.hashingProvider.hashPassword(createUserDto.password),
    });
    try {
      return await newUser.save();
    } catch (error) {
      if ((error as { code: number }).code === 11000) {
        // Duplicate entry
        throw new ConflictException(ErrorStrings.DUPLICATE_USER);
      }
      throw new RequestTimeoutException(ErrorStrings.PROCESS_ERROR, {
        description:
          String(error) /** @Todo : Do not return this one, instead log it */,
      });
    }
  }

  /**
   * Returns a user to whom the passed id belongs
   */
  public async findUserByEmail(email: string) {
    return await this.userModel.findOne({ email });
  }
}
