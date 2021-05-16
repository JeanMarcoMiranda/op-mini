import { Inject, Injectable } from '@nestjs/common';
import { Db } from 'mongodb';

@Injectable()
export class AppService {
  constructor(
    @Inject('MONGO_CONNECTION') private database: Db
  ){}

  getHello(): string {
    return 'Hello World!';
  }

  getUsers() {
    const userCollection = this.database.collection('users')
    return userCollection.find().toArray()
  }
}
