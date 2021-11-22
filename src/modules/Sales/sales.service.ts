import { Injectable } from '@nestjs/common';

import { SaleRepository } from './sales.repository';
import { CreateSaleDto, UpdateSaleDto } from './dto/sale.dto';
import { Sale } from './entities/sale.entity';

@Injectable()
export class SaleService {
  constructor(
    private readonly saleRepository: SaleRepository,
  ) {}

  public async createSale(data: CreateSaleDto): Promise<Sale> {
    return this.saleRepository.createSale(data);
  }

  public async findAllSale(): Promise<Sale[]> {
    return this.saleRepository.findAllSale();
  }

  public async findOneSale(id: string): Promise<Sale> {
    return this.saleRepository.findOneSale(id);
  }

  public async findNameSale(name: string): Promise<Sale[]> {
    return this.saleRepository.findNameSale(name);
  }

  public async updateSale(
    id: string,
    documentUpdate: UpdateSaleDto,
  ): Promise<Sale> {
    return await this.saleRepository.updateSale(id, documentUpdate);
  }

  public async removeSale(id: string): Promise<Sale> {
    return await this.saleRepository.removeSale(id);
  }
}
