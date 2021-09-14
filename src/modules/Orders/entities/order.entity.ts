import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { User } from '../../Users/entities/user.entity';
import { Supplier } from '../../Suppliers/entities/supplier.entity'
import { OrderProduct } from './orderproduct.entity';

export interface Product {
  product: Types.ObjectId;
  quantity: string;
  note: string;
}

@Schema()
export class Order extends Document {

  @Prop({ required: true, type: Types.ObjectId, ref: User.name })
  createdby: User | Types.ObjectId;

  @Prop({ required: true })
  createdate: string;

  @Prop({ type: Types.ObjectId, ref: User.name })
  receivedby: User | Types.ObjectId;

  @Prop()
  receptiondate: string;

  @Prop()
  estimatedamount: string;

  @Prop()
  finalamount: string;

  @Prop()
  type: string;

  @Prop()
  ndocument: string;

  @Prop({ type: Types.ObjectId, ref: Supplier.name })
  supplier: Supplier | Types.ObjectId;

  @Prop()
  products: [OrderProduct]

  @Prop({ required: true })
  status: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
