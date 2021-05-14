import { Module } from '@nestjs/common';
import { UserController } from './users.controller';
import { UserRepository } from './users.repository';
import { UserService } from './users.service';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService, UserRepository],
})
export class UsersModule {}
