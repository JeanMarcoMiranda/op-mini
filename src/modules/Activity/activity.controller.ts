import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ActivityService } from './activity.service';
import { CreateActivityDto, UpdateActivityDto } from './dto/activity.dto';
import { Activity } from './entities/activity.entity';

@ApiTags('Activities')
@Controller('activities')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Post()
  public async postActivity(
    @Body() data: CreateActivityDto
  ): Promise<Activity> {
    return this.activityService.createActivity(data);
  }

  @Get()
  public async getAllActivities(): Promise<Activity[]> {
    return this.activityService.findAllActivity();
  }

  @Get(':id')
  public async getOneActivity(
    @Param('id') id: string
  ): Promise<Activity> {
    return this.activityService.findOneActivity(id);
  }

  @Get('search/:name')
  public async getNameSupplier(@Param('name') name: string): Promise<Activity[]> {
    return this.activityService.findNameActivity(name);
  }

  @Put(':id')
  public async putActivity(
    @Param('id') id: string,
    @Body() data: UpdateActivityDto,
  ): Promise<Activity> {
    return this.activityService.updateActivity(id, data);
  }

  @Delete(':id')
  public async deleteActivity(
    @Param('id') id: string
  ) {
    return this.activityService.removeActivity(id);
  }
}
