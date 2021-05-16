import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger'

import { CreateUserDto, UpdateUserDto } from './dtos/user.dto';
import { User } from './entities/user.entity';
import { UserService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  public async createUser(@Body() data: CreateUserDto): Promise<User> {
    return this.userService.create(data);
  }

  @Get()
  public async getAllUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  public async getOneUser(
    @Param('id') id: string,
  ): Promise<User> {
    return this.userService.findOne(id);
  }

  @Put(':id')
  public async updateUser(
    @Param('id') id: string,
    @Body() data: UpdateUserDto
  ): Promise<User>{
    return this.userService.update(id, data)
  }

  @Delete(':id')
  public async deleteUser(
    @Param('id') id: string
  ) {
    return this.userService.delete(id)
  }
}
