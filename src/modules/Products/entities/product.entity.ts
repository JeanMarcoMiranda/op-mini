import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { Category } from './categories.entity';

@Schema()
export class Product extends Document {
  @Prop({ required: true })
  barcode: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  stock: string;

  @Prop()
  pricebuy: string;

  @Prop()
  pricesell: string;

  @Prop()
  date: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  active: boolean;

  @Prop({ type: Types.ObjectId, ref: Category.name })
  category: Category | Types.ObjectId;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
