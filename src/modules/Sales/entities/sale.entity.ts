import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { User } from '../../Users/entities/user.entity';
import { SaleProduct } from './saleproduct.entity';

export interface Product {
  product: Types.ObjectId;
  quantity: string;
  price: string;
}

@Schema()
export class Sale extends Document {

  @Prop({ required: true, type: Types.ObjectId, ref: User.name })
  createdby: User | Types.ObjectId;

  @Prop()
  client: string;

  @Prop()
  date: string;

  @Prop()
  cash: string;

  @Prop()
  subtotal: string;

  @Prop()
  change: string;

  @Prop()
  methodpay: string;

  @Prop()
  voucher: string;

  @Prop()
  status: string;

  @Prop()
  products: [SaleProduct]
}

export const SaleSchema = SchemaFactory.createForClass(Sale);
