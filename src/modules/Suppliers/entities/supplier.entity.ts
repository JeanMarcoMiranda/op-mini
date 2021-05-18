import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Supplier extends Document {

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  phone: number;

  @Prop()
  email: string;

  @Prop()
  doctype: string;

  @Prop()
  docnum: number;

  @Prop()
  address: string;

  @Prop({ required: true })
  active: boolean;
}

export const SupplierSchema = SchemaFactory.createForClass(Supplier);
