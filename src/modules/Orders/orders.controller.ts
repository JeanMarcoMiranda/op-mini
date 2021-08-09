import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { OrderService } from './orders.service';
import { CreateOrderDto, UpdateOrderDto } from './dto/order.dto';
import { Order } from './entities/order.entity';

@ApiTags('Orders')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  public async postOrder(
    @Body() data: CreateOrderDto
  ): Promise<Order> {
    return this.orderService.createOrder(data);
  }

  @Get()
  public async getAllOrders(): Promise<Order[]> {
    return this.orderService.findAllOrder();
  }

  @Get(':id')
  public async getOneOrder(
    @Param('id') id: string
  ): Promise<Order> {
    return this.orderService.findOneOrder(id);
  }

  @Put(':id')
  public async putOrder(
    @Param('id') id: string,
    @Body() data: UpdateOrderDto,
  ): Promise<Order> {
    return this.orderService.updateOrder(id, data);
  }

  @Delete(':id')
  public async deleteOrder(
    @Param('id') id: string
  ) {
    return this.orderService.removeOrder(id);
  }
}
