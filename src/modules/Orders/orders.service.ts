import { Injectable } from '@nestjs/common';

import { OrderRepository } from './orders.repository';
import { CreateOrderDto, UpdateOrderDto } from './dto/order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
  ) {}

  public async createOrder(data: CreateOrderDto): Promise<Order> {
    return this.orderRepository.createOrder(data);
  }

  public async findAllOrder(): Promise<Order[]> {
    return this.orderRepository.findAllOrder();
  }

  public async findOneOrder(id: string): Promise<Order> {
    return this.orderRepository.findOneOrder(id);
  }

  public async updateOrder(
    id: string,
    documentUpdate: UpdateOrderDto,
  ): Promise<Order> {
    return await this.orderRepository.updateOrder(id, documentUpdate);
  }

  public async removeOrder(id: string): Promise<Order> {
    return await this.orderRepository.removeOrder(id);
  }
}
