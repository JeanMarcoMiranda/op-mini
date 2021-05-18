import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateRoleDto, UpdateRoleDto } from '../dtos/role.dto';
import { Role } from '../entities/role.entity';
import { RoleService } from '../services/role.service';

@ApiTags('Role')
@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  public async createUser(@Body() data: CreateRoleDto): Promise<Role> {
    return this.roleService.create(data);
  }

  @Get()
  public async getAllUsers(): Promise<Role[]> {
    return this.roleService.findAll();
  }

  @Get(':id')
  public async getOneUser(@Param('id') id: string): Promise<Role> {
    return this.roleService.findOne(id);
  }

  @Put(':id')
  public async updateUser(
    @Param('id') id: string,
    @Body() data: UpdateRoleDto,
  ): Promise<Role> {
    return this.roleService.update(id, data);
  }

  @Delete(':id')
  public async deleteUser(@Param('id') id: string) {
    return this.roleService.delete(id);
  }
}
