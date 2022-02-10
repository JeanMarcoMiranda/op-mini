import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '../../modules/Users/services/users.service';
import { RoleService } from '../../modules/Users/services/role.service';
import { User } from '../../modules/Users/entities/user.entity';
import { PayloadToken } from '../models/token.model';
import { Role } from 'src/modules/Users/entities/role.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private roleService: RoleService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const { password, ...rta } = user.toJSON();
        return rta;
      }
    }

    return null;
  }

  async generateJwt(user: User) {
    const payload: PayloadToken = { role: user.role as Role, sub: user.id }; // sub: identificador, role: permisos
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
