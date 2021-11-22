import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '../Products/entities/product.entity';

import { CreateSaleDto, UpdateSaleDto } from './dto/sale.dto';
import { Sale } from './entities/sale.entity';

@Injectable()
export class SaleRepository {
  constructor(
    @InjectModel(Sale.name) private saleModel: Model<Sale>,
    @InjectModel(Product.name) private productmodel: Model<Product>,
  ) {}


  public async createSale(sale: CreateSaleDto): Promise<Sale> {
    const createSale = new this.saleModel(sale);
    return createSale.save()
  }


  public async findAllSale(): Promise<Sale[]> {
    const sales = this.saleModel.find()
      .populate('createdby', 'name')
      .populate({path:'products.product', model: this.productmodel, select: 'name pricesell'}).exec()
    return sales
  }

  public async findOneSale(id: string): Promise<Sale> {
    const sale = this.saleModel.findById(id)
      .populate('createdby', 'name')
      .populate({path:'products.product', model: this.productmodel, select: 'name pricesell'}).exec()
    if (!sale) {
      throw new NotFoundException('Sale not found');
    }
    return sale;
  }

  public async findNameSale(name:string): Promise<Sale[]> {
    let regex = new RegExp(["^.*", name, ".*$"].join(""), "i");
    const product = await this.saleModel.find()
      .populate({path: 'createdby', match: { name: regex }, select: 'name'})
      .populate({path:'products.product', model: this.productmodel, select: 'name pricesell'}).exec()

    let sale = product.filter(function(sal){
      if (sal.createdby) {
        return true
      } else {
        return false
      }
    })

    return sale
  }

  public async updateSale(
    id: string,
    updateDocument: UpdateSaleDto,
  ): Promise<Sale> {
    const updateSale = await this.saleModel.findByIdAndUpdate(
      id,
      { $set: updateDocument },
      { new: true },
    );

    if (!updateSale) {
      throw new NotFoundException('Sale no found');
    }

    return updateSale;
  }


  public async removeSale(id: string): Promise<Sale> {
    return this.saleModel.findByIdAndDelete(id);
  }
}
