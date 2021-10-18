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

import { SaleService } from './sales.service';
import { CreateSaleDto, UpdateSaleDto } from './dto/sale.dto';
import { Sale } from './entities/sale.entity';
import { Public } from 'src/auth/decorators/public.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('Sales')
@UseGuards(JwtAuthGuard)
@Controller('sales')
export class SaleController {
  constructor(private readonly saleService: SaleService) {}

  @Post()
  public async postSale(
    @Body() data: CreateSaleDto
  ): Promise<Sale> {
    return this.saleService.createSale(data);
  }

  @Get()
  public async getAllSales(): Promise<Sale[]> {
    return this.saleService.findAllSale();
  }

  @Get(':id')
  @Public()
  public async getOneSale(
    @Param('id') id: string
  ): Promise<Sale> {
    return this.saleService.findOneSale(id);
  }

  @Put(':id')
  public async putSale(
    @Param('id') id: string,
    @Body() data: UpdateSaleDto,
  ): Promise<Sale> {
    return this.saleService.updateSale(id, data);
  }

  @Delete(':id')
  public async deleteSale(
    @Param('id') id: string
  ) {
    return this.saleService.removeSale(id);
  }
}
