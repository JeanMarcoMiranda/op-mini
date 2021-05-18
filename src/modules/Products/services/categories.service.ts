import { Injectable, } from '@nestjs/common';

import { CategoryRepository } from '../repositories/categories.repository';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/categories.dto';
import { Category } from '../entities/categories.entity';

@Injectable()
export class CategoryService {
  constructor(
    private readonly categoriesRespository: CategoryRepository,
  ) {}

  public async createCategory(data: CreateCategoryDto): Promise<Category> {
    return this.categoriesRespository.createCategory(data)
  }

  public async findAllCategories(): Promise<Category[]> {
    return await this.categoriesRespository.findAllCategories();
  }

  public async findOneCategory(id: string): Promise<Category> {
    return await this.categoriesRespository.findOneCategory(id);
  }

  public async updateCategory(
    id: string, 
    documentUpdate: UpdateCategoryDto
  ): Promise<Category> {
    return await this.categoriesRespository.updateCategory(id, documentUpdate)
  }

  public async removeCategory(id: string): Promise<Category> {
    return await this.categoriesRespository.removeCategory(id)
  }
}
