import { IsNumber, IsNotEmpty, IsString, IsBoolean } from 'class-validator'
import { ApiProperty, PartialType } from '@nestjs/swagger'

export class CreateSupplierDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  
  @IsNumber()
  @IsNotEmpty()
  readonly phone: number;

  @IsString()
  @IsNotEmpty()
  readonly email: string;
  
  @IsString()
  @IsNotEmpty()
  readonly doctype: string;

  @IsNumber()
  @IsNotEmpty()
  readonly number: number;

  @IsString()
  @IsNotEmpty()
  readonly address: string;
  
  @IsBoolean()
  @IsNotEmpty()
  readonly active: boolean;
}

export class UpdateSupplierDto extends PartialType(CreateSupplierDto) {}