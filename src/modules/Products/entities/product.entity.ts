import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Category } from './categories.entity';

@Schema()
export class Product extends Document {
  @Prop({ required: true })
  barcode: number;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  stock: number;

  @Prop()
  pricebuy: number;

  @Prop()
  pricesell: number;

  @Prop()
  date: Date;

  @Prop()
  description: string;

  @Prop({ required: true })
  state: boolean;

  @Prop({ type: Types.ObjectId, ref: Category.name })
  category: Category | Types.ObjectId;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
