import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { Product } from 'src/modules/Products/entities/product.entity';

@Schema()
export class OrderProduct extends Document {

  @Prop({ required: true, type: Types.ObjectId, ref: Product.name })
  product: Product | Types.ObjectId;

  @Prop()
  quantity: string;

  @Prop()
  note: string;
}

export const OrderProductSchema = SchemaFactory.createForClass(OrderProduct);
