import { Module, Global } from '@nestjs/common';
import { MongoClient } from 'mongodb';
import {MongooseModule} from '@nestjs/mongoose'
import { ConfigType } from '@nestjs/config';

import config from '../config';

@Global()
@Module({
  imports: [MongooseModule.forRootAsync({
    useFactory: (configService: ConfigType<typeof config>) => {
      const { connection, user, password, host, port, dbName } =
          configService.mongo;
      
      return {
        uri: `${connection}://${host}:${port}`,
        user,
        pass: password,
        dbName
      }
    },
    inject: [config.KEY]
  })],
  providers: [
    {
      provide: 'MONGO_CONNECTION',
      useFactory: async (configService: ConfigType<typeof config>) => {
        const { connection, user, password, host, port, dbName } =
          configService.mongo;
        const uri = `${connection}://${user}:${password}@${host}:${port}/?authSource=admin&readPreference=primary`;
        const client = new MongoClient(uri, {useUnifiedTopology: true});
        await client.connect();
        const database = client.db(dbName);
        return database;
      },
      inject: [config.KEY],
    },
  ],
  exports: ['MONGO_CONNECTION'],
})
export class DatabaseModule {}
