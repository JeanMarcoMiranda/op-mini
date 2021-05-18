import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly password: string;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty()
  readonly isActive: boolean;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly documentType: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly documentNumber: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  readonly phone: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  readonly email: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  readonly currentAddress: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
