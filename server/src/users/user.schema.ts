import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
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
  })
  firstName?: string;
  @Prop({
    type: String,
    isRequired: false,
  })
  lastName?: string;
  @Prop({
    type: String,
    isRequired: true,
  })
  isVerified: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
