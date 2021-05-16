import { IsNotEmpty, IsString} from 'class-validator'
import { ApiProperty, PartialType } from '@nestjs/swagger'

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly name_user: string

  @IsString()
  @IsNotEmpty()
  readonly password_user: string

  @IsString()
  @IsNotEmpty()
  readonly state_user: string
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}