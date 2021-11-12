import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';

// - Modules
import { UsersModule } from './modules/Users/users.module';
import { ProductsModule } from './modules/Products/products.module';
import { SuppliersModule } from './modules/Suppliers/suppliers.module';
import { OrdersModule } from './modules/Orders/orders.module';
import { SalesModule } from './modules/Sales/sales.module'
import { ShiftsModule } from './modules/Shifts/shifts.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
// - Config files
import { enviroments } from './common/enviroments';
import config from './common/config'

const myModules = [
  ConfigModule.forRoot({
    envFilePath: enviroments[process.env.NODE_ENV] || '.env',
    load: [config],
    isGlobal: true
  }),
  DatabaseModule,
  UsersModule,
  ProductsModule,
  SuppliersModule,
  OrdersModule,
  SalesModule,
  ShiftsModule,
  AuthModule
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
  controllers: [],
  providers: [],
})
export class AppModule {}
