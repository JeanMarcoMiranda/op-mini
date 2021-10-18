import { IsNotEmpty, IsString, IsArray, IsMongoId, IsBoolean } from 'class-validator'
import { ApiProperty, PartialType } from '@nestjs/swagger'
import { Product } from '../entities/sale.entity';

export class CreateSaleDto {
  @IsMongoId()
  @IsNotEmpty()
  readonly createdby: string;

  @IsString()
  readonly client: string;

  @IsString()
  readonly date: string;

  @IsString()
  readonly cash: string;

  @IsString()
  readonly subtotal: string;

  @IsString()
  readonly change: string;

  @IsString()
  readonly methodpay: string;

  @IsString()
  readonly voucher: string;

  @IsString()
  readonly status: string;

  @IsArray()
  @IsNotEmpty()
  readonly products: Product[]

}

export class UpdateSaleDto extends PartialType(CreateSaleDto) {}
