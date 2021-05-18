import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'

import { Supplier, SupplierSchema } from './entities/supplier.entity';
import { SupplierController } from './suppliers.controller';
import { SupplierRepository } from './suppliers.repository';
import { SupplierService } from './suppliers.service';

@Module({
  imports: [MongooseModule.forFeature([{
    name: Supplier.name,
    schema: SupplierSchema,
  }])],
  controllers: [SupplierController],
  providers: [SupplierService, SupplierRepository],
  exports: [SupplierService, SupplierRepository],
})
export class SuppliersModule {}