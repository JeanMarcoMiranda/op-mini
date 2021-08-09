import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'

import { Order, OrderSchema } from './entities/order.entity';
import { OrderController } from './orders.controller';
import { OrderRepository } from './orders.repository';
import { OrderService } from './orders.service';

@Module({
  imports: [MongooseModule.forFeature([{
    name: Order.name,
    schema: OrderSchema,
  }])],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository],
  exports: [OrderService, OrderRepository],
})
export class OrdersModule {}
