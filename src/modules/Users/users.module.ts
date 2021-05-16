import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'

import { UserController } from './users.controller';
import { UserRepository } from './users.repository';
import { UserService } from './users.service';
import {User, UserSchema} from './entities/user.entity'

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: User.name,
      schema: UserSchema
    }
  ])],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService, UserRepository],
})
export class UsersModule {}