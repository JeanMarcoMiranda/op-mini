import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Db } from 'mongodb';
import { Model } from 'mongoose';

import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/categories.dto';
import { Category } from '../entities/categories.entity';

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}


  public async saveCategory(category: CreateCategoryDto): Promise<Category> {
    const createdCategory = new this.categoryModel(category);
    return createdCategory.save();
  }


  public async getAllCategories(): Promise<Category[]> {
    return this.categoryModel.find().exec();
  }
  

  public async getOneCategory(id: string): Promise<Category> {
    const category = this.categoryModel.findById(id).exec();
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }
  

  public async editCategory(
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
