import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Db } from 'mongodb';
import { User } from './entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(@Inject('MONGO_CONNECTION') private readonly database: Db) {}
  private readonly users: User[] = [];

  public async saveUser(user: User): Promise<void> {
    this.users.push(user);
  }

  public async findAllUsers(): Promise<User[]> {
    const usersCollection = this.database.collection('users');
    return usersCollection.find().toArray();
  }

  public async get(id: number): Promise<User> {
    const user = this.users.find((user) => user.id_user === id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
