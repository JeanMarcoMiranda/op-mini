import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { SupplierService } from './suppliers.service';
import { CreateSupplierDto, UpdateSupplierDto } from './dto/supplier.dto';
import { Supplier } from './entities/supplier.entity';

@ApiTags('Suppliers')
@Controller('suppliers')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  @Post()
  public async postSupplier(
    @Body() data: CreateSupplierDto
  ): Promise<Supplier> {
    return this.supplierService.createSupplier(data);
  }

  @Get()
  public async getAllSuppliers(): Promise<Supplier[]> {
    return this.supplierService.findAllSupplier();
  }

  @Get(':id')
  public async getOneSupplier(
    @Param('id') id: string
  ): Promise<Supplier> {
    return this.supplierService.findOneSupplier(id);
  }

  @Put(':id')
  public async putSupplier(
    @Param('id') id: string,
    @Body() data: UpdateSupplierDto,
  ): Promise<Supplier> {
    return this.supplierService.updateSupplier(id, data);
  }

  @Delete(':id')
  public async deleteSupplier(
    @Param('id') id: string
  ) {
    return this.supplierService.removeSupplier(id);
  }
}