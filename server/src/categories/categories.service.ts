import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) { }
  async create(createCategoryDto: CreateCategoryDto) {
    const createCategory = this.categoryRepository.create(createCategoryDto);
    return await this.categoryRepository.save(createCategory)
  }
  1
  async findAll() {
    const listAllCategory = await this.categoryRepository.find({
      relations: ["forms"],
    });
    return listAllCategory;
  }

  async findOne(id: number) {
    const findCategory = await this.categoryRepository.find({
      where: { id: id },
    });
    return findCategory;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const updateCategory = await this.categoryRepository.update(id, updateCategoryDto);
    return updateCategory;
  }

  async remove(id: number) {
    const removeCategory = await this.findOne(id);
    await this.categoryRepository.delete(id);
    return { status: 'Success', deleted: removeCategory };
  }
}
