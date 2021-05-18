import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger'

import { CategoryService } from '../services/categories.service';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/categories.dto';
import { Category } from '../entities/categories.entity';

@ApiTags('Categories')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  public async postCategory(
    @Body() data: CreateCategoryDto
  ): Promise<Category> {
    return this.categoryService.createCategory(data);
  }

  @Get()
  public async getAllCategories(): Promise<Category[]> {
    return this.categoryService.findAllCategories();
  }

  @Get(':id')
  public async getOneCategory(
    @Param('id') id: string,
  ): Promise<Category> {
    return this.categoryService.findOneCategory(id);
  }

  @Put(':id')
  public async putCategory(
    @Param('id') id: string,
    @Body() data: UpdateCategoryDto
  ): Promise<Category>{
    return this.categoryService.updateCategory(id, data)
  }

  @Delete(':id')
  public async deleteCategory(
    @Param('id') id: string
  ) {
    return this.categoryService.removeCategory(id)
  }
}
  