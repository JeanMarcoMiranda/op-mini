import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '../Products/entities/product.entity';

import { CreateOrderDto, UpdateOrderDto } from './dto/order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    @InjectModel(Product.name) private productmodel: Model<Product>,
  ) {}


  public async createOrder(order: CreateOrderDto): Promise<Order> {
    const createOrder = new this.orderModel(order);
    return createOrder.save()
  }


  public async findAllOrder(): Promise<Order[]> {
    const orders = this.orderModel.find()
      .populate('createdby', 'name')
      .populate('receivedby', 'name')
      .populate({path:'supplier', select:'name'})
      .populate({path:'products.product', model: this.productmodel, select: 'name'}).exec()
    return orders
  }

  public async findOneOrder(id: string): Promise<Order> {
    const order = this.orderModel.findById(id)
      .populate('createdby', 'name')
      .populate('receivedby', 'name')
      .populate({path:'supplier', select:'name'})
      .populate({path:'products.product', model: this.productmodel, select: 'name'}).exec()
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }

  public async updateOrder(
    id: string,
    updateDocument: UpdateOrderDto,
  ): Promise<Order> {
    const updateOrder = await this.orderModel.findByIdAndUpdate(
      id,
      { $set: updateDocument },
      { new: true },
    );

    if (!updateOrder) {
      throw new NotFoundException('Order no found');
    }

    return updateOrder;
  }


  public async removeOrder(id: string): Promise<Order> {
    return this.orderModel.findByIdAndDelete(id);
  }
}
