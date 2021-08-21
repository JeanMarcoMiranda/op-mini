import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateProductDto, UpdateProductDto } from '../dtos/product.dto';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}


  public async createProduct(product: CreateProductDto): Promise<Product> {
    const createProduct = new this.productModel(product);
    return createProduct.save();
  }


  public async findAllProducts(): Promise<Product[]> {
    return this.productModel.find().populate("category").exec();
  }

  public async findOneProduct(id: string): Promise<Product> {
    const product = this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  public async findNameProduct(name:string): Promise<Product[]> {
    let regex = new RegExp(["^.*", name, ".*$"].join(""), "i");
    const product = await this.productModel.find({$or:[{"name": regex},{"barcode": regex}]}).populate("category").exec()
    return product
  }

  public async findCompanyProducts(name:string): Promise<Product[]> {
    const products = await this.productModel.find({company: name}).populate("category").exec()
    return products
  }

  public async updateProduct(
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
