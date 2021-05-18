import { Injectable } from '@nestjs/common';

import { CreateRoleDto, UpdateRoleDto } from '../dtos/role.dto';
import { Role } from '../entities/role.entity';
import { RoleRepository } from '../respositories/role.repository';

@Injectable()
export class RoleService {
  constructor(private readonly usersRespository: RoleRepository) {}

  public async create(data: CreateRoleDto): Promise<Role> {
    return this.usersRespository.saveRole(data);
  }

  public async findAll(): Promise<Role[]> {
    return await this.usersRespository.getAllRoles();
  }

  public async findOne(id: string): Promise<Role> {
    return await this.usersRespository.getOneRole(id);
  }

  public async update(
    id: string,
    documentUpdate: UpdateRoleDto,
  ): Promise<Role> {
    return await this.usersRespository.editRole(id, documentUpdate);
  }

  public async delete(id: string): Promise<Role> {
    return await this.usersRespository.removeUser(id);
  }
}
