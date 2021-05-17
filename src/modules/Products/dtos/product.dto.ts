import { IsDate, IsNumber, IsNotEmpty, IsString, IsBoolean, IsMongoId} from 'class-validator'
import { ApiProperty, PartialType } from '@nestjs/swagger'

export class CreateProductDto {
  @IsNumber()
  @IsNotEmpty()
  readonly barcode: number

  @IsString()
  @IsNotEmpty()
  readonly name: string
  
  @IsNumber()
  @IsNotEmpty()
  readonly stock: number

  @IsNumber()
  @IsNotEmpty()
  readonly pricebuy: number
  
  @IsNumber()
  @IsNotEmpty()
  readonly pricesell: number

  @IsDate()
  @IsNotEmpty()
  readonly date: Date

  @IsString()
  @IsNotEmpty()
  readonly description: string
  
  @IsBoolean()
  @IsNotEmpty()
  readonly state: boolean

  @IsMongoId()
  @IsNotEmpty()
  readonly category: string

}

export class UpdateProductDto extends PartialType(CreateProductDto) {}