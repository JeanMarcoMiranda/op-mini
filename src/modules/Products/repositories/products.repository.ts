import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Db } from 'mongodb';
import { Model } from 'mongoose';

import { CreateProductDto, UpdateProductDto } from '../dtos/product.dto';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductRepository {
  constructor(
    @Inject('MONGO_CONNECTION') private readonly database: Db,
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  public async saveProduct(product: CreateProductDto): Promise<Product> {
    const createProduct = new this.productModel(product);
    return createProduct.save();
  }

  public async getAllProducts(): Promise<Product[]> {
    return this.productModel.find().populate("category").exec();
  }

  public async getOneProduct(id: string): Promise<Product> {
    const product = this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  public async editProduct(
    id: string,
    updateDocument: UpdateProductDto,
  ): Promise<Product> {
    const updateProduct = await this.productModel.findByIdAndUpdate(
      id,
      { $set: updateDocument },
      { new: true },
    );

    if (!updateProduct) {
      throw new NotFoundException('Product no found');
    }

    return updateProduct;
  }

  public async removeProduct(id: string): Promise<Product> {
    return this.productModel.findByIdAndDelete(id);
  }
}
