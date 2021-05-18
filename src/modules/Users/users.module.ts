import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserController } from './controllers/users.controller';
import { RoleController } from './controllers/role.controller';
import { UserRepository } from './respositories/users.repository';
import { RoleRepository } from './respositories/role.repository';
import { User, UserSchema } from './entities/user.entity';
import { Role, RoleSchema } from './entities/role.entity';
import { RoleService } from './services/role.service';
import { UserService } from './services/users.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Role.name,
        schema: RoleSchema,
      },
    ]),
  ],
  controllers: [UserController, RoleController],
  providers: [UserService, UserRepository, RoleService, RoleRepository],
  exports: [UserService, UserRepository, RoleService, RoleRepository],
})
export class UsersModule {}
