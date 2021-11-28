import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateActivityDto, UpdateActivityDto } from './dto/activity.dto';
import { Activity } from './entities/activity.entity';

@Injectable()
export class ActivityRepository {
  constructor(
    @InjectModel(Activity.name) private activityModel: Model<Activity>,
  ) {}


  public async createActivity(activity: CreateActivityDto): Promise<Activity> {
    const createProduct = new this.activityModel(activity);
    return createProduct.save()
  }


  public async findAllActivity(): Promise<Activity[]> {
    return this.activityModel.find().populate('createdby', 'name').exec();
  }


  public async findOneActivity(id: string): Promise<Activity> {
    const supplier = this.activityModel.findById(id).populate('createdby', 'name').exec();
    if (!supplier) {
      throw new NotFoundException('Supplier not found');
    }
    return supplier;
  }


  public async findNameActivity(name:string): Promise<Activity[]> {
    let regex = new RegExp(["^.*", name, ".*$"].join(""), "i");
    const product = await this.activityModel.find()
      .populate({path: 'createdby', match: { name: regex }, select: 'name'}).exec()

    let sale = product.filter(function(sal){
      if (sal.createdby) {
        return true
      } else {
        return false
      }
    })

    return sale
  }


  public async updateActivity(
    id: string,
    updateDocument: UpdateActivityDto,
  ): Promise<Activity> {
    const updateSupplier = await this.activityModel.findByIdAndUpdate(
      id,
      { $set: updateDocument },
      { new: true },
    );

    if (!updateSupplier) {
      throw new NotFoundException('Activity no found');
    }

    return updateSupplier;
  }


  public async removeActivity(id: string): Promise<Activity> {
    return this.activityModel.findByIdAndDelete(id);
  }
}
