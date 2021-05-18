import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  @IsNotEmpty()
  active: boolean;
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
