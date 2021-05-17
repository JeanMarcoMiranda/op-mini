import { Inject, Injectable } from '@nestjs/common';
import { Db } from 'mongodb';

@Injectable()
export class AppService {
  constructor(){}

  getHello(): string {
    return 'Hello World!';
  }

}
