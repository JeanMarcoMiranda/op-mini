import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CategoryRepository } from '../repositories/categories.repository';
import { Category } from '../entities/categories.entity';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/categories.dto';

@Injectable()
export class CategoryService {
  constructor(
    private readonly categoriesRespository: CategoryRepository,
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  public async create(data: CreateCategoryDto): Promise<Category> {
    return this.categoriesRespository.saveCategory(data)
  }

  public async findAll(): Promise<Category[]> {
    return await this.categoriesRespository.getAllCategories();
  }

  public async findOne(id: string): Promise<Category> {
    return await this.categoriesRespository.getOneCategory(id);
  }

  public async update(id: string, documentUpdate: UpdateCategoryDto): Promise<Category> {
    return await this.categoriesRespository.editCategory(id, documentUpdate)
  }

  public async delete(id: string): Promise<Category> {
    return await this.categoriesRespository.removeCategory(id)
  }
}
