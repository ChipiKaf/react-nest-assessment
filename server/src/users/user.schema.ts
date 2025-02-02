import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { MAX_NAME_LENGTH, MIN_NAME_LENGTH } from 'src/common/constants';
@Schema()
export class User extends Document {
  @Prop({
    type: String,
    isRequired: true,
    unique: true,
  })
  email: string;
  @Prop({
    type: String,
    isRequired: true,
  })
  password: string;
  @Prop({
    type: String,
    isRequired: false,
    maxlength: MAX_NAME_LENGTH,
    minlength: MIN_NAME_LENGTH,
  })
  name?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
