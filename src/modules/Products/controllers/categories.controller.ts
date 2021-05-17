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
  
  import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/categories.dto';
  import { Category } from '../entities/categories.entity';
  import { CategoryService } from '../services/categories.service';
  
  @ApiTags('Categories')
  @Controller('categories')
  export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}
  
    @Post()
    public async createCategory(@Body() data: CreateCategoryDto): Promise<Category> {
      return this.categoryService.create(data);
    }
  
    @Get()
    public async getAllCategories(): Promise<Category[]> {
      return this.categoryService.findAll();
    }
  
    @Get(':id')
    public async getOneCategory(
      @Param('id') id: string,
    ): Promise<Category> {
      return this.categoryService.findOne(id);
    }
  
    @Put(':id')
    public async updateCategory(
      @Param('id') id: string,
      @Body() data: UpdateCategoryDto
    ): Promise<Category>{
      return this.categoryService.update(id, data)
    }
  
    @Delete(':id')
    public async deleteCategory(
      @Param('id') id: string
    ) {
      return this.categoryService.delete(id)
    }
  }
  