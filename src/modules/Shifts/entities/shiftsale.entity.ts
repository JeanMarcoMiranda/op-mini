import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { Sale } from 'src/modules/Sales/entities/sale.entity';
import { SaleProduct } from 'src/modules/Sales/entities/saleproduct.entity';


@Schema()
export class ShiftSale extends Document {

  @Prop({ required: true, type: Types.ObjectId, ref: Sale.name })
  sale: Sale | Types.ObjectId;

  @Prop()
  createdby: string;

  @Prop()
  client: string;

  @Prop()
  date: string;

  @Prop()
  methodpay: string;

  @Prop()
  status: string;
}

export const ShiftSaleSchema = SchemaFactory.createForClass(ShiftSale);
