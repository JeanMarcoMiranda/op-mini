import { Role } from '../../modules/Users/entities/role.entity';

export interface PayloadToken {
  role: Role
  sub: number;
}
