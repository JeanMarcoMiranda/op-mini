import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'

import { Cash, CashSchema } from './entities/cash.entity';
import { CashController } from './cash.controller';
import { CashRepository } from './cash.repository';
import { CashService } from './cash.service';

@Module({
  imports: [MongooseModule.forFeature([{
    name: Cash.name,
    schema: CashSchema,
  }])],
  controllers: [CashController],
  providers: [CashService, CashRepository],
  exports: [CashService, CashRepository],
})
export class CashModule {}
