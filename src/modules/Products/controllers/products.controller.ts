import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  Req
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ProductService } from '../services/products.service';
import { CreateProductDto, UpdateProductDto } from '../dtos/product.dto';
import { Product } from '../entities/product.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Public } from 'src/auth/decorators/public.decorator';
import { Request } from 'express';

@ApiTags('Products')
@UseGuards(JwtAuthGuard)
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  public async postProduct(@Body() data: CreateProductDto): Promise<Product> {
    return this.productService.createProduct(data);
  }

  @Get()
  public async getAllProducts(): Promise<Product[]> {
    return this.productService.findAllProducts();
  }

  @Get(':id')
  @Public()
  public async getOneProduct(@Param('id') id: string): Promise<Product> {
    return this.productService.findOneProduct(id);
  }

  @Get('search/:name')
  @Public()
  public async getNameProduct(@Param('name') name: string): Promise<Product[]> {
    return this.productService.findNameProduct(name);
  }

  @Get('company/:companyId')
  @Public()
  public async getCompanyProducts(@Param('companyId') companyId: string): Promise<Product[]> {
    return this.productService.findCompanyProducts(companyId);
  }

  @Put(':id')
  public async putProduct(
    @Param('id') id: string,
    @Body() data: UpdateProductDto,
  ): Promise<Product> {
    return this.productService.updateProduct(id, data);
  }

  @Delete(':id')
  public async deleteProduct(@Param('id') id: string) {
    return this.productService.removeProduct(id);
  }
}
