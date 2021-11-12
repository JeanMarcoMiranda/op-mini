import { Injectable } from '@nestjs/common';
import { ShiftRepository } from './shifts.repository';
import { CreateShiftDto, UpdateShiftDto } from './dto/shift.dto';
import { Shift } from './entities/shift.entity';

@Injectable()
export class ShiftService {
  constructor(
    private readonly shiftRepository: ShiftRepository,
  ) {}

  public async createShift(data: CreateShiftDto): Promise<Shift> {
    return this.shiftRepository.createShift(data);
  }

  public async findAllShift(): Promise<Shift[]> {
    return this.shiftRepository.findAllShift();
  }

  public async findOneShift(id:string): Promise<Shift> {
    return this.shiftRepository.findOneShift(id);
  }

  public async findUserShift(name: string): Promise<Shift[]> {
    return this.shiftRepository.findUserShift(name);
  }

  public async updateShift(id: string, documentUpdate: UpdateShiftDto,): Promise<Shift> {
    return await this.shiftRepository.updateShift(id, documentUpdate)
  }

  public async removeShift(id: string): Promise<Shift> {
    return await this.shiftRepository.removeShift(id);
  }
}
