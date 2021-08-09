import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export interface Product {
  product: string;
  quantity: string;
  note: string;
}

@Schema()
export class Order extends Document {

  @Prop({ required: true })
  createdby: string;

  @Prop({ required: true })
  createdate: string;

  @Prop()
  receivedby: string;

  @Prop()
  receptiondate: string;

  @Prop()
  estimatedamount: string;

  @Prop()
  finalamount: string;

  @Prop()
  type: string;

  @Prop()
  supplier: string;

  @Prop()
  products: Product[]

  @Prop({ required: true })
  status: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
