import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { User } from '../../Users/entities/user.entity';

@Schema()
export class Activity extends Document {

  @Prop({ required: true })
  date: string;

  @Prop({ required: true })
  actamount: string;

  @Prop()
  curramount: string;

  @Prop({ required: true, type: Types.ObjectId, ref: User.name })
  createdby: User | Types.ObjectId;

  @Prop()
  name: string;

  @Prop()
  status: string;

  @Prop()
  activityid: string;
}

export const ActivitySchema = SchemaFactory.createForClass(Activity);
