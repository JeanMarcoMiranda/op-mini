import { IsNotEmpty, IsString, IsBoolean } from 'class-validator'
import { ApiProperty, PartialType } from '@nestjs/swagger'

export class CreateSupplierDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly phone: string;

  @IsString()
  @IsNotEmpty()
  readonly company: string;//

  @IsString()
  @IsNotEmpty()
  readonly doctype: string;

  @IsString()
  @IsNotEmpty()
  readonly docnum: string;

  @IsString()
  @IsNotEmpty()
  readonly visitday: string;//

  @IsBoolean()
  @IsNotEmpty()
  readonly active: boolean;
}

export class UpdateSupplierDto extends PartialType(CreateSupplierDto) {}
