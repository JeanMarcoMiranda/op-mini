import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CashService } from './cash.service';
import { CreateCashDto, UpdateCashDto } from './dto/cash.dto';
import { Cash } from './entities/cash.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('Cash')
@UseGuards(JwtAuthGuard)
@Controller('cash')
export class CashController {
  constructor(private readonly cashService: CashService) {}

  @Post()
  public async postCash(
    @Body() data: CreateCashDto
  ): Promise<Cash> {
    return this.cashService.createCash(data);
  }

  @Get()
  public async getAllCash(): Promise<Cash[]> {
    return this.cashService.findAllCash();
  }

  @Get(':id')
  public async getOneCash(
    @Param('id') id: string
  ): Promise<Cash> {
    return this.cashService.findOneCash(id);
  }

  @Put(':id')
  public async putCash(
    @Param('id') id: string,
    @Body() data: UpdateCashDto,
  ): Promise<Cash> {
    return this.cashService.updateCash(id, data);
  }

  @Delete(':id')
  public async deleteCash(
    @Param('id') id: string
  ) {
    return this.cashService.removeCash(id);
  }
}
