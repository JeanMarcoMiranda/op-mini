import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateCashDto, UpdateCashDto } from './dto/cash.dto';
import { Cash } from './entities/cash.entity';

@Injectable()
export class CashRepository {
  constructor(
    @InjectModel(Cash.name) private cashModel: Model<Cash>,
  ) {}


  public async createCash(supplier: CreateCashDto): Promise<Cash> {
    const createProduct = new this.cashModel(supplier);
    return createProduct.save()
  }


  public async findAllCash(): Promise<Cash[]> {
    return this.cashModel.find().exec();
  }


  public async findOneCash(id: string): Promise<Cash> {
    const supplier = this.cashModel.findById(id).exec();
    if (!supplier) {
      throw new NotFoundException('Supplier not found');
    }
    return supplier;
  }


  public async updateCash(
    id: string,
    updateDocument: UpdateCashDto,
  ): Promise<Cash> {
    const updateSupplier = await this.cashModel.findByIdAndUpdate(
      id,
      { $set: updateDocument },
      { new: true },
    );

    if (!updateSupplier) {
      throw new NotFoundException('Supplier no found');
    }

    return updateSupplier;
  }


  public async removeCash(id: string): Promise<Cash> {
    return this.cashModel.findByIdAndDelete(id);
  }
}
