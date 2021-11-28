import { Injectable } from '@nestjs/common';

import { ProductRepository } from '../repositories/products.repository';
import { CreateProductDto, UpdateProductDto } from '../dtos/product.dto';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
  ) {}

  public async createProduct(data: CreateProductDto): Promise<Product> {
    return this.productRepository.createProduct(data);
  }

  public async findAllProducts(): Promise<Product[]> {
    return this.productRepository.findAllProducts();
  }

  public async findOneProduct(id: string): Promise<Product> {
    return this.productRepository.findOneProduct(id);
  }

  public async findNameProduct(name: string): Promise<Product[]> {
    return this.productRepository.findNameProduct(name);
  }

  public async findCompanyProducts(companyId: string): Promise<Product[]> {
    return this.productRepository.findCompanyProducts(companyId);
  }

  public async updateProduct(
    id: string,
    documentUpdate: UpdateProductDto,
  ): Promise<Product> {
    return await this.productRepository.updateProduct(id, documentUpdate);
  }

  public async removeProduct(id: string): Promise<Product> {
    return await this.productRepository.removeProduct(id);
  }
}
