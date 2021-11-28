import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'

import { Activity, ActivitySchema } from './entities/activity.entity';
import { ActivityController } from './activity.controller';
import { ActivityRepository } from './activity.repository';
import { ActivityService } from './activity.service';

@Module({
  imports: [MongooseModule.forFeature([{
    name: Activity.name,
    schema: ActivitySchema,
  }])],
  controllers: [ActivityController],
  providers: [ActivityService, ActivityRepository],
  exports: [ActivityService, ActivityRepository],
})
export class ActivityModule {}
