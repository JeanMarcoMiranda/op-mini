import { IsNotEmpty, IsString } from 'class-validator'
import { PartialType } from '@nestjs/swagger'

export class CreateCashDto {
  @IsString()
  @IsNotEmpty()
  readonly cash: string;
}

export class UpdateCashDto extends PartialType(CreateCashDto) {}
