import { IsNotEmpty, IsString, IsArray, IsMongoId, IsBoolean } from 'class-validator'
import { ApiProperty, PartialType } from '@nestjs/swagger'
import { Product } from '../entities/order.entity';

export class CreateOrderDto {
  @IsMongoId()
  @IsNotEmpty()
  readonly createdby: string;

  @IsString()
  @IsNotEmpty()
  readonly createdate: string;

  @IsMongoId()
  @IsNotEmpty()
  readonly receivedby: string;

  @IsString()
  readonly receptiondate: string;

  @IsString()
  @IsNotEmpty()
  readonly estimatedamount: string;

  @IsString()
  readonly finalamount: string;

  @IsString()
  readonly ndocument: string;

  @IsString()
  @IsNotEmpty()
  readonly type: string;

  @IsMongoId()
  @IsNotEmpty()
  readonly supplier: string;

  @IsArray()
  @IsNotEmpty()
  readonly products: Product[]

  @IsString()
  @IsNotEmpty()
  readonly status: string;
}

export class UpdateOrderDto extends PartialType(CreateOrderDto) {}
