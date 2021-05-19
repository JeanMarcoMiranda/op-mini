import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Request } from 'express';

import { IS_PUBLIC_KEY } from '../decorators/public.decorator'

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private reflector: Reflector) {} // - Reflector allows us to get the metadata sended from the endpoint

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler())
    if(isPublic){
      return true
    }

    const request = context.switchToHttp().getRequest<Request>(); // - getting the request from the current process in execution
    const authHeader = request.header('Auth'); // - looking for the Auth header into the header params

    const isAuth = authHeader === '1234';
    if (!isAuth) {
      throw new UnauthorizedException('Not allowed');
    }

    return isAuth; // - this will grant access depending on the boolean return
  }
}
