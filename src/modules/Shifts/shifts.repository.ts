import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateShiftDto, UpdateShiftDto } from './dto/shift.dto';
import { Shift } from './entities/shift.entity';

@Injectable()
export class ShiftRepository {
  constructor(
    @InjectModel(Shift.name) private shiftModel: Model<Shift>,
  ) {}

  public async createShift(shift: CreateShiftDto): Promise<Shift> {
    const createShift = new this.shiftModel(shift);
    return createShift.save()
  }

  public async findAllShift(): Promise<Shift[]> {
    return this.shiftModel.find().exec();
  }

  public async findOneShift(id: string): Promise<Shift> {
    const shift = this.shiftModel.findById(id).exec();
    if(!shift) {
      throw new NotFoundException('Shift not found');
    }
    return shift;
  }

  public async findUserShift(name: string): Promise<Shift[]> {
    let regex = new RegExp(["^.*", name, ".*$"].join(""), "i");
    const shift = await this.shiftModel.find({$or:[{'user': regex}]}).exec()
    return shift
  }

  public async updateShift(id: string, updateDocument: UpdateShiftDto,): Promise<Shift> {
    const updateShift = await this.shiftModel.findByIdAndUpdate(
      id,
      { $set: updateDocument},
      { new: true},
    );

    if(!updateShift) {
      throw new NotFoundException('Shift not found');
    }
    return updateShift;
  }

  public async removeShift(id: string): Promise<Shift> {
    return this.shiftModel.findByIdAndDelete(id);
  }
}
