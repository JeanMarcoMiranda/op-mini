import { User } from './entities/user.entity';
import { CreateUserData } from './dtos/user.dto';
import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { randomInt } from 'crypto';

@Injectable()
export class UserService {
  constructor(private readonly usersRespository: UserRepository) {}

  public async add(data: CreateUserData): Promise<User> {
    const id = randomInt(0, 100);
    const user = new User(
      id,
      data.name_user,
      data.password_user,
      data.state_user,
    );
    await this.usersRespository.saveUser(user);
    return user;
  }

  public async list(): Promise<User[]> {
    return await this.usersRespository.findAllUsers();
  }

  public async get(id: number): Promise<User> {
    return await this.usersRespository.get(id);
  }
}
