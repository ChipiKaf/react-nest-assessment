import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './providers/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [UsersService],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    forwardRef(() => AuthModule), // Circular dependency
  ],
  exports: [UsersService],
})
export class UsersModule {}
