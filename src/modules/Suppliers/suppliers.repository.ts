import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateSupplierDto, UpdateSupplierDto } from './dto/supplier.dto';
import { Supplier } from './entities/supplier.entity';

@Injectable()
export class SupplierRepository {
  constructor(
    @InjectModel(Supplier.name) private supplierModel: Model<Supplier>,
  ) {}


  public async createSupplier(supplier: CreateSupplierDto): Promise<Supplier> {
    const createProduct = new this.supplierModel(supplier);
    return createProduct.save()
  }


  public async findAllSupplier(): Promise<Supplier[]> {
    return this.supplierModel.find().exec();
  }


  public async findOneSupplier(id: string): Promise<Supplier> {
    const supplier = this.supplierModel.findById(id).exec();
    if (!supplier) {
      throw new NotFoundException('Supplier not found');
    }
    return supplier;
  }


  public async updateSupplier(
    id: string,
    updateDocument: UpdateSupplierDto,
  ): Promise<Supplier> {
    const updateSupplier = await this.supplierModel.findByIdAndUpdate(
      id,
      { $set: updateDocument },
      { new: true },
    );

    if (!updateSupplier) {
      throw new NotFoundException('Supplier no found');
    }

    return updateSupplier;
  }

  
  public async removeSupplier(id: string): Promise<Supplier> {
    return this.supplierModel.findByIdAndDelete(id);
  }
}
