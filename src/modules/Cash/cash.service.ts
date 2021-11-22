import { Injectable } from '@nestjs/common';

import { CashRepository } from './cash.repository';
import { CreateCashDto, UpdateCashDto } from './dto/cash.dto';
import { Cash } from './entities/cash.entity';

@Injectable()
export class CashService {
  constructor(
    private readonly cashRepository: CashRepository,
  ) {}

  public async createCash(data: CreateCashDto): Promise<Cash> {
    return this.cashRepository.createCash(data);
  }

  public async findAllCash(): Promise<Cash[]> {
    return this.cashRepository.findAllCash();
  }

  public async findOneCash(id: string): Promise<Cash> {
    return this.cashRepository.findOneCash(id);
  }

  public async updateCash(
    id: string,
    documentUpdate: UpdateCashDto,
  ): Promise<Cash> {
    return await this.cashRepository.updateCash(id, documentUpdate);
  }

  public async removeCash(id: string): Promise<Cash> {
    return await this.cashRepository.removeCash(id);
  }
}
