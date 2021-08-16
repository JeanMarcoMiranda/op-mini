import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Supplier extends Document {

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  phone: string;

  @Prop()
  company: string;

  @Prop()
  doctype: string;

  @Prop()
  docnum: string;

  @Prop()
  visitday: string;

  @Prop({ required: true })
  active: boolean;
}

export const SupplierSchema = SchemaFactory.createForClass(Supplier);
