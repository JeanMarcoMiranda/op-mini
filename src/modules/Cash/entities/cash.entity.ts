import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Cash extends Document {

  @Prop({ required: true })
  cash: string;
}

export const CashSchema = SchemaFactory.createForClass(Cash);
