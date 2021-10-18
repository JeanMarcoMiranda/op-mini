import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { Product } from 'src/modules/Products/entities/product.entity';

@Schema()
export class SaleProduct extends Document {

  @Prop({ required: true, type: Types.ObjectId, ref: Product.name })
  product: Product | Types.ObjectId;

  @Prop()
  quantity: string;

  @Prop()
  price: string;
}

export const SaleProductSchema = SchemaFactory.createForClass(SaleProduct);
