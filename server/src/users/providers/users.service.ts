import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import { User } from '../user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { ErrorStrings } from 'src/common/error-strings.enum';
import { HashingProvider } from 'src/auth/providers/hashing.provider';
import { DetailedInternalException } from 'src/errors/DetailedInternalError';
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
      throw new DetailedInternalException(ErrorStrings.PROCESS_ERROR, error);
    }
  }

  /**
   * Returns a user to whom the passed id belongs
   */
  public async findUserByEmail(email: string) {
    return await this.userModel.findOne({ email });
  }
}
