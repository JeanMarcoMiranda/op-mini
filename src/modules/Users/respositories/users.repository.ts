import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(
    /* @Inject('MONGO_CONNECTION') private readonly database: Db, */
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  public async saveUser(user: CreateUserDto) {
    const createdUser = new this.userModel(user);
    const hashPassword = await bcrypt.hash(createdUser.password, 10);
    createdUser.password = hashPassword;
    const savedModel = await createdUser.save();

    const { password, ...model } = savedModel.toJSON();
    return model;
  }

  public async getAllUsers(): Promise<User[]> {
    return this.userModel.find().populate('role').exec();
  }

  public async getOneUser(id: string): Promise<User> {
    const user = this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  public async getUserByEmail(email: string): Promise<User> {
    return this.userModel.findOne({email}).exec()
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
    return this.userModel.findByIdAndDelete(id);
  }
}
