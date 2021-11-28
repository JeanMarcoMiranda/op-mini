import { IsNotEmpty, IsString, IsBoolean, IsMongoId } from 'class-validator'
import { ApiProperty, PartialType } from '@nestjs/swagger'

export class CreateActivityDto {
  @IsString()
  @IsNotEmpty()
  readonly date: string;

  @IsString()
  readonly actamount: string;

  @IsString()
  readonly curramount: string;//

  @IsMongoId()
  @IsNotEmpty()
  readonly createdby: string;

  @IsString()
  readonly name: string;

  @IsString()
  readonly status: string;//s

  @IsString()
  readonly activityid: string;
}

export class UpdateActivityDto extends PartialType(CreateActivityDto) {}
