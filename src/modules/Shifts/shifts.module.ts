import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'

import { Order, OrderSchema } from '../Orders/entities/order.entity';
import { Sale, SaleSchema } from '../Sales/entities/sale.entity';

import { Shift, ShiftSchema } from './entities/shift.entity';
import { ShiftOrder, ShiftOrderSchema } from './entities/shiftorder.entity';
import { ShiftSale, ShiftSaleSchema } from './entities/shiftsale.entity';

import { ShiftController } from './shifts.controller';
import { ShiftRepository } from './shifts.repository';
import { ShiftService } from './shifts.service';


@Module({
  imports: [MongooseModule.forFeature([
    {
      name: Shift.name,
      schema: ShiftSchema,
    },
    /*{
      name: ShiftOrder.name,
      schema: ShiftOrderSchema,
    },
    {
      name: ShiftSale.name,
      schema: ShiftSaleSchema,
    },*/
  ])],
  controllers: [ShiftController],
  providers: [ShiftService, ShiftRepository],
  exports: [ShiftService, ShiftRepository],
})
export class ShiftsModule {}

