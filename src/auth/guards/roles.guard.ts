import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '../models/roles.model';
import { PayloadToken } from '../models/token.model';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<Role[]>(ROLES_KEY, context.getHandler());
    // ['admin', 'customer']
    if(!roles) {
      return true
    }
    console.log("this is the role array", roles)
    const request = context.switchToHttp().getRequest();
    const userData = request.user as PayloadToken;
    // {role: 'admin', sub: 1423}
    const isAuth = roles.some(role => role === userData.role.name)
    if (!isAuth) {
      throw new UnauthorizedException("Your role doesn't have access");
    }

    return isAuth;
  }
}
