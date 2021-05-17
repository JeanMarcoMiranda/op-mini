import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'

import { ProductController } from './controllers/products.controller';
import { ProductRepository } from './repositories/products.repository';
import { ProductService } from './services/products.service';
import { CategoryController } from './controllers/categories.controller';
import { CategoryRepository } from './repositories/categories.repository';
import { CategoryService } from './services/categories.service';

import { Product, ProductSchema } from './entities/product.entity'
import { Category, CategorySchema } from './entities/categories.entity'

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: Product.name,
      schema: ProductSchema,
    },
    {
      name: Category.name,
      schema: CategorySchema
    }
  ])],
  controllers: [ProductController, CategoryController],
  providers: [ProductService, ProductRepository, CategoryService, CategoryRepository],
  exports: [ProductService, ProductRepository, CategoryService, CategoryRepository],
})
export class ProductsModule {}
