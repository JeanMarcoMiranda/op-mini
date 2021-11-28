import { Injectable } from '@nestjs/common';

import { ActivityRepository } from './activity.repository';
import { CreateActivityDto, UpdateActivityDto } from './dto/activity.dto';
import { Activity } from './entities/activity.entity';

@Injectable()
export class ActivityService {
  constructor(
    private readonly activityRepository: ActivityRepository,
  ) {}

  public async createActivity(data: CreateActivityDto): Promise<Activity> {
    return this.activityRepository.createActivity(data);
  }

  public async findAllActivity(): Promise<Activity[]> {
    return this.activityRepository.findAllActivity();
  }

  public async findOneActivity(id: string): Promise<Activity> {
    return this.activityRepository.findOneActivity(id);
  }

  public async findNameActivity(name: string): Promise<Activity[]> {
    return this.activityRepository.findNameActivity(name);
  }

  public async updateActivity(
    id: string,
    documentUpdate: UpdateActivityDto,
  ): Promise<Activity> {
    return await this.activityRepository.updateActivity(id, documentUpdate);
  }

  public async removeActivity(id: string): Promise<Activity> {
    return await this.activityRepository.removeActivity(id);
  }
}
