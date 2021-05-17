import { Module, Global } from '@nestjs/common';
import { MongoClient } from 'mongodb';
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigType } from '@nestjs/config';

import config from '../common/config';

@Global()
@Module({
  imports: [MongooseModule.forRootAsync({
    useFactory: (configService: ConfigType<typeof config>) => {
      const { connection, user, password, host, port, dbName } =
          configService.mongo;
      return {
        uri: `${connection}://${user}:${password}@${host}/${dbName}`
      }
      /* en revision por chaqueton
      return {
        uri: `${connection}://${host}:${port}`,
        user,
        pass: password,
        dbName
      } */
    },
    inject: [config.KEY]
  })],
})
export class DatabaseModule {}
