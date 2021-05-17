import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';

import { UsersModule } from './modules/Users/users.module';
import { ProductsModule } from './modules/Products/products.module';
import { enviroments } from './enviroments';
import { DatabaseModule } from './database/database.module';
import config from './config'


const myModules = [
  ConfigModule.forRoot({
    envFilePath: enviroments[process.env.NODE_ENV] || '.env',
    load: [config],
    isGlobal: true
  }),
  UsersModule,
  ProductsModule,
  DatabaseModule
];

if (process.env.NODE_ENV === 'production') {
  myModules.push(
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client', 'build'),
      renderPath: '/app',
    }),
  );
}

@Module({
  imports: myModules,
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
