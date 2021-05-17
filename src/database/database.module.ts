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
      
      if(host === "localhost"){
        return {
          uri: `${connection}://${host}:${port}`,
          user,
          pass: password,
          dbName
        }
      }
      return {
        uri: `${connection}+srv://${user}:${password}@${host}/${dbName}?retryWrites=true&w=majority`
      }      
    },
    inject: [config.KEY]
  })],
  providers: [
    {
      provide: 'MONGO_CONNECTION',
      useFactory: async (configService: ConfigType<typeof config>) => {
        let uri:string;
        const { connection, user, password, host, port, dbName } =
          configService.mongo;
        if(host === "localhost"){
          uri = `${connection}://${user}:${password}@${host}:${port}/?authSource=admin&readPreference=primary`;
        }
        uri = `${connection}+srv://${user}:${password}@${host}/${dbName}?retryWrites=true&w=majority`;
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
