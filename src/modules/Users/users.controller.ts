import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CreateUserData } from './dtos/user.dto';
import { User } from './entities/user.entity';
import { UserService } from './users.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  public async createUser(@Body() data: CreateUserData): Promise<User> {
    return this.userService.add(data);
  }

  @Get()
  public async getAllUsers(): Promise<User[]> {
    return this.userService.list();
  }

  @Get(':id')
  public async getOneUser(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<User> {
    return this.userService.get(id);
  }
}
