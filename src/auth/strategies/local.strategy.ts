import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport'; // - Paquete con la estructura base de un strategy

import { AuthService } from '../service/auth.service';
import { Strategy } from "passport-local"; // - Estrategia especifica a utilizar

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordFields: 'password'
    });
  }

  async validate(email: string, password: string) {
    const user = this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Not allowed');
    }

    return user;
  }
}
