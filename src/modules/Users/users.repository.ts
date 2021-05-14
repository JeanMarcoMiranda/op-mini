import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class UserRepository {
  private readonly users: User[] = [];

  public async saveUser(user: User): Promise<void> {
    this.users.push(user);
  }

  public async findAllUsers(): Promise<User[]> {
    return this.users;
  }

  public async get(id: number): Promise<User> {
    const user = this.users.find((user) => user.id_user === id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
