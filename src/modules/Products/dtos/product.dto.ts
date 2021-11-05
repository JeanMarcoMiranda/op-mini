import { IsDate, IsNotEmpty, IsString, IsBoolean, IsMongoId} from 'class-validator'
import { ApiProperty, PartialType } from '@nestjs/swagger'

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  readonly barcode: string

  @IsString()
  @IsNotEmpty()
  readonly name: string

  @IsString()
  @IsNotEmpty()
  readonly stock: string

  @IsString()
  @IsNotEmpty()
  readonly pricebuy: string

  @IsString()
  readonly lastpricebuy: string

  @IsString()
  readonly lastpricesell: string

  @IsString()
  @IsNotEmpty()
  readonly pricesell: string

  @IsString()
  @IsNotEmpty()
  readonly date: string

  @IsString()
  readonly description: string

  @IsBoolean()
  @IsNotEmpty()
  readonly active: boolean

  @IsMongoId()
  @IsNotEmpty()
  readonly category: string

  @IsString()
  @IsNotEmpty()
  readonly company: string
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
