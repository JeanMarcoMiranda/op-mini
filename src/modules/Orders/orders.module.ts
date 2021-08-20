import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { Product, ProductSchema } from '../Products/entities/product.entity';

import { Order, OrderSchema } from './entities/order.entity';
import { OrderProduct, OrderProductSchema } from './entities/orderproduct.entity';

import { OrderController } from './orders.controller';
import { OrderRepository } from './orders.repository';
import { OrderService } from './orders.service';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: Order.name,
      schema: OrderSchema,
    },
    {
      name: OrderProduct.name,
      schema: OrderProductSchema,
    },
    {
      name: Product.name,
      schema: ProductSchema,
    }
  ])],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository],
  exports: [OrderService, OrderRepository],
})
export class OrdersModule {}
