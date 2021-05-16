import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UserRepository } from './users.repository';
import { User } from './entities/user.entity';
import { CreateUserDto, UpdateUserDto } from './dtos/user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly usersRespository: UserRepository,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  public async create(data: CreateUserDto): Promise<User> {
    return this.usersRespository.saveUser(data)
  }

  public async findAll(): Promise<User[]> {
    return await this.usersRespository.getAllUsers();
  }

  public async findOne(id: string): Promise<User> {
    return await this.usersRespository.getOneUser(id);
  }

  public async update(id: string, documentUpdate: UpdateUserDto): Promise<User> {
    return await this.usersRespository.editUser(id, documentUpdate)
  }

  public async delete(id: string): Promise<User> {
    return await this.usersRespository.removeUser(id)
  }
}
