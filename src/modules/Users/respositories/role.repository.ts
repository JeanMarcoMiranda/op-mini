import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateRoleDto, UpdateRoleDto } from '../dtos/role.dto';
import { Role } from '../entities/role.entity';

@Injectable()
export class RoleRepository {
  constructor(@InjectModel(Role.name) private roleModel: Model<Role>) {}

  public async saveRole(role: CreateRoleDto): Promise<Role> {
    const createdUser = new this.roleModel(role);
    return await createdUser.save();
  }

  public async getAllRoles(): Promise<Role[]> {
    return await this.roleModel.find().exec();
  }

  public async getOneRole(id: string): Promise<Role> {
    const role = await this.roleModel.findById(id).exec();
    if (!role) {
      throw new NotFoundException('Role not found');
    }
    return role;
  }

  public async editRole(
    id: string,
    updateDocument: UpdateRoleDto,
  ): Promise<Role> {
    // $set: - indicates to update only the values provided instead of the entire document
    // new:true - indicates to the function to return the document updated instead of the values provided
    const updatedRole = await this.roleModel.findByIdAndUpdate(
      id,
      { $set: updateDocument },
      { new: true },
    );

    if (!updatedRole) {
      throw new NotFoundException(`Role not found`);
    }

    return updatedRole;
  }

  public async removeRole(id: string): Promise<Role> {
    return await this.roleModel.findByIdAndDelete(id);
  }
}
