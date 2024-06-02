import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  // _id: Types.ObjectId

  @Prop()
  email: string;

  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop()
  name: string;

  @Prop()
  birthday: string;

  @Prop()
  height: number;

  @Prop()
  weight: number;

  @Prop()
  interest: Array<string>;
}

export const UserSchema = SchemaFactory.createForClass(User);
