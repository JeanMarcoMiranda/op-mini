import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Order } from 'src/modules/Orders/entities/order.entity';
import { Sale } from 'src/modules/Sales/entities/sale.entity';

import { User } from '../../Users/entities/user.entity';
import { ShiftOrder } from './shiftorder.entity';
import { ShiftSale } from './shiftsale.entity';

@Schema()
export class Shift extends Document {

  @Prop({ required: true, type: Types.ObjectId, ref: User.name })
  user: User | Types.ObjectId;

  @Prop()
  start: string

  @Prop()
  end: string;

  @Prop({ type: Types.ObjectId, ref: Order.name })
  orders: Order[] | Types.ObjectId[];
  //orders: [ShiftOrder]

  @Prop({ type: Types.ObjectId, ref: Sale.name })
  sales: Sale[] | Types.ObjectId[];
  //sales: [ShiftSale]

  @Prop()
  startAmount: string;

  @Prop()
  endAmount: string;

  @Prop()
  expectedAmount: string;

  @Prop({ required: true })
  status: string;

}

export const ShiftSchema = SchemaFactory.createForClass(Shift);
