import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { Role } from './role.entity';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  password: string;

  @Prop()
  isActive: boolean;

  @Prop({ required: true })
  documentType: string;

  @Prop({ required: true, unique: true })
  documentNumber: string;

  @Prop({ required: false })
  phone: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: false })
  currentAddress: string;

  @Prop({type: Types.ObjectId, ref: Role.name, required: true})
  role: Role | Types.ObjectId
}

export const UserSchema = SchemaFactory.createForClass(User);
