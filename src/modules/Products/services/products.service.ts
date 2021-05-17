import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ProductRepository } from '../repositories/products.repository';
import { Product } from '../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from '../dtos/product.dto';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  public async create(data: CreateProductDto): Promise<Product> {
    return this.productRepository.saveProduct(data);
  }

  public async findAll(): Promise<Product[]> {
    return this.productRepository.getAllProducts();
  }

  public async findOne(id: string): Promise<Product> {
    return this.productRepository.getOneProduct(id);
  }

  public async update(
    id: string,
    documentUpdate: UpdateProductDto,
  ): Promise<Product> {
    return await this.productRepository.editProduct(id, documentUpdate);
  }

  public async delete(id: string): Promise<Product> {
    return await this.productRepository.removeProduct(id);
  }
}
