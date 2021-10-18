import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { Product, ProductSchema } from '../Products/entities/product.entity';

import { Sale, SaleSchema } from './entities/sale.entity';
import { SaleProduct, SaleProductSchema } from './entities/saleproduct.entity';

import { SaleController } from './sales.controller';
import { SaleRepository } from './sales.repository';
import { SaleService } from './sales.service';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: Sale.name,
      schema: SaleSchema,
    },
    {
      name: SaleProduct.name,
      schema: SaleProductSchema,
    },
    {
      name: Product.name,
      schema: ProductSchema,
    }
  ])],
  controllers: [SaleController],
  providers: [SaleService, SaleRepository],
  exports: [SaleService, SaleRepository],
})
export class SalesModule {}
