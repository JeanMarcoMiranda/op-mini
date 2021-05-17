import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Db } from 'mongodb';
import { Model } from 'mongoose';

import { CreateUserDto, UpdateUserDto } from './dtos/user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(
    /* @Inject('MONGO_CONNECTION') private readonly database: Db, */
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}


  public async saveUser(user: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }


  public async getAllUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }
  

  public async getOneUser(id: string): Promise<User> {
    const user = this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
  

  public async editUser(
    id: string,
    updateDocument: UpdateUserDto,
  ): Promise<User> {
    // $set: - indicates to update only the values provided instead of the entire document
    // new:true - indicates to the function to return the document updated instead of the values provided
    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      { $set: updateDocument },
      { new: true },
    );

    if (!updatedUser) {
      throw new NotFoundException(`User not found`);
    }

    return updatedUser;
  }


  public async removeUser(id: string): Promise<User> {
    return this.userModel.findByIdAndDelete(id)
  }
}
