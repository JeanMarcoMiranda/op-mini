import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path';
import { UsersModule } from './modules/Users/users.module';

const myModules = []
if(process.env.NODE_ENV === "production") {
  myModules.push(ServeStaticModule.forRoot({
    rootPath: join(__dirname, "..", "client", "build"),
    renderPath: "/app"
  }))
}

@Module({
  imports: [...myModules, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
