import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ShiftService } from './shifts.service';
import { CreateShiftDto, UpdateShiftDto } from './dto/shift.dto';
import { Shift } from './entities/shift.entity';
import { Public } from 'src/auth/decorators/public.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('Shifts')
@UseGuards(JwtAuthGuard)
@Controller('shifts')
export class ShiftController {
  constructor(private readonly shiftService: ShiftService) {}

  @Post()
  public async postShift(
    @Body() data: CreateShiftDto
  ): Promise<Shift> {
    return this.shiftService.createShift(data);
  }

  @Get()
  public async getAllShift(): Promise<Shift[]> {
    return this.shiftService.findAllShift();
  }

  @Get(':id')
  @Public()
  public async getOneShift(
    @Param('id') id: string
  ): Promise<Shift> {
    return this.shiftService.findOneShift(id);
  }

  @Get('serach/:name')
  public async getNameShift(@Param('name') name: string): Promise<Shift[]> {
    return this.shiftService.findUserShift(name);
  }

  @Put(':id')
  public async putShift(
    @Param('id') id: string,
    @Body() data: UpdateShiftDto,
  ): Promise<Shift> {
    return this.shiftService.updateShift(id, data);
  }

  @Delete(':id')
  public async deleteShift(@Param('id') id: string) {
    return this.shiftService.removeShift(id);
  }
}


