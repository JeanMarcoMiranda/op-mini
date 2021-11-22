import { IsNotEmpty, IsString, IsBoolean, IsMongoId, IsArray } from 'class-validator'
import { ApiProperty, PartialType } from '@nestjs/swagger'
import { Order } from 'src/modules/Orders/entities/order.entity';
import { Sale } from 'src/modules/Sales/entities/sale.entity';

export class CreateShiftDto {
  @IsMongoId()
  @IsNotEmpty()
  readonly user: string;

  @IsString()
  readonly start: string;

  @IsString()
  readonly end: string;

  @IsArray()
  readonly orders: Order[]

  @IsArray()
  readonly sales: Sale[]

  @IsString()
  readonly startAmount: string;

  @IsString()
  readonly endAmount: string;

  @IsString()
  readonly expectedAmount: string;

  @IsString()
  @IsNotEmpty()
  readonly status: string;
}

export class UpdateShiftDto extends PartialType(CreateShiftDto) {}
