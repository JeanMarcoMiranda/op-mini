import { Injectable } from '@nestjs/common';

import { SupplierRepository } from './suppliers.repository';
import { CreateSupplierDto, UpdateSupplierDto } from './dto/supplier.dto';
import { Supplier } from './entities/supplier.entity';

@Injectable()
export class SupplierService {
  constructor(
    private readonly supplierRepository: SupplierRepository,
  ) {}

  public async createSupplier(data: CreateSupplierDto): Promise<Supplier> {
    return this.supplierRepository.createSupplier(data);
  }

  public async findAllSupplier(): Promise<Supplier[]> {
    return this.supplierRepository.findAllSupplier();
  }

  public async findOneSupplier(id: string): Promise<Supplier> {
    return this.supplierRepository.findOneSupplier(id);
  }

  public async findCompanySupplier(name: string): Promise<Supplier[]> {
    return this.supplierRepository.findCompanySupplier(name);
  }

  public async updateSupplier(
    id: string,
    documentUpdate: UpdateSupplierDto,
  ): Promise<Supplier> {
    return await this.supplierRepository.updateSupplier(id, documentUpdate);
  }

  public async removeSupplier(id: string): Promise<Supplier> {
    return await this.supplierRepository.removeSupplier(id);
  }
}
