import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Supplier } from 'src/modules/Suppliers/entities/supplier.entity';

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
  lastpricebuy: string;

  @Prop()
  pricesell: string;

  @Prop()
  mesureUnit: string

  @Prop()
  lastpricesell: string;

  @Prop()
  date: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  active: boolean;

  @Prop({ type: Types.ObjectId, ref: Category.name })
  category: Category | Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: Supplier.name })
  company: Supplier | Types.ObjectId;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
