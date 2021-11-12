import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { Order } from 'src/modules/Orders/entities/order.entity';

@Schema()
export class ShiftOrder extends Document {

  @Prop({  required: true, type: Types.ObjectId, ref: Order.name })
  order: Order | Types.ObjectId;

  @Prop()
  createdby: string;

  @Prop()
  receivedby: string;

  @Prop()
  receptiondate: string;

  @Prop()
  finalamount: string;

  @Prop()
  supplier: string;

  @Prop()
  status: string;
}

export const ShiftOrderSchema = SchemaFactory.createForClass(ShiftOrder);
