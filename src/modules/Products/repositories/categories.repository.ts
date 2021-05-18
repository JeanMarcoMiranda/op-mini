import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/categories.dto';
import { Category } from '../entities/categories.entity';

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}


  public async createCategory(category: CreateCategoryDto): Promise<Category> {
    const createdCategory = new this.categoryModel(category);
    return createdCategory.save();
  }


  public async findAllCategories(): Promise<Category[]> {
    return this.categoryModel.find().exec();
  }
  

  public async findOneCategory(id: string): Promise<Category> {
    const category = this.categoryModel.findById(id).exec();
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }
  

  public async updateCategory(
    id: string,
    updateDocument: UpdateCategoryDto,
  ): Promise<Category> {
    const updatedCategory = await this.categoryModel.findByIdAndUpdate(
      id,
      { $set: updateDocument },
      { new: true },
    );

    if (!updatedCategory) {
      throw new NotFoundException(`Category not found`);
    }

    return updatedCategory;
  }


  public async removeCategory(id: string): Promise<Category> {
    return this.categoryModel.findByIdAndDelete(id)
  }
}
