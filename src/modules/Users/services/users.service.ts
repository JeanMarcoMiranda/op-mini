import { Injectable } from '@nestjs/common';

import { UserRepository } from '../respositories/users.repository';
import { User } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly usersRespository: UserRepository,
  ) {}

  public async create(data: CreateUserDto) {
    return this.usersRespository.saveUser(data)
  }

  public async findAll(): Promise<User[]> {
    return await this.usersRespository.getAllUsers();
  }

  public async findOne(id: string): Promise<User> {
    return await this.usersRespository.getOneUser(id);
  }

  public async findByEmail(email: string): Promise<User> {
    return await this.usersRespository.getUserByEmail(email)
  }

  public async update(id: string, documentUpdate: UpdateUserDto): Promise<User> {
    return await this.usersRespository.editUser(id, documentUpdate)
  }

  public async delete(id: string): Promise<User> {
    return await this.usersRespository.removeUser(id)
  }
}
