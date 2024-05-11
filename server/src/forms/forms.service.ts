import { Injectable } from '@nestjs/common';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Form } from './entities/form.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FormsService {
  constructor(
    @InjectRepository(Form)
    private formRepository: Repository<Form>,
  ) { }
  async create(createFormDto: CreateFormDto) {
    const createForm = this.formRepository.create(createFormDto);
    return await this.formRepository.save(createForm);
  }

  async findAll() {
    const listAllForms = await this.formRepository.find({ relations: ['category'] });
    return listAllForms;
  }

  async findOne(id: number) {
    const specificForm = await this.formRepository.findOne({
      where: { id: id },
      relations: ["category"],
    });
    await this.formRepository.update(id, {
      totalView: specificForm.totalView + 1
    })
    return specificForm;
  }

  async findByMostView(options: any) {
    const findMostView = await this.formRepository
      .createQueryBuilder('form')
      .leftJoinAndSelect('form.category', 'category')
      .where('category.criterion IS NULL')
      .orWhere('category.criterion = :deptName', { deptName: options?.dept })
      .orWhere('category.criterion = :scholarName', { scholarName: options?.scholar })
      .orWhere('category.criterion = :dormDetail', { dormDetail: options?.dormDetail })
      .orderBy('form.totalView', 'DESC')
      .limit(7)
      .getMany();
    return findMostView;
  }

  async findByMostViewGuest() {
    const findMostView = await this.formRepository
      .createQueryBuilder('form')
      .leftJoinAndSelect('form.category', 'category')
      .orderBy('form.totalView', 'DESC')
      .limit(7)
      .getMany();
    return findMostView;
  }

  async findByLastUpdated(options: any) {
    const findMostView = await this.formRepository
      .createQueryBuilder('form')
      .leftJoinAndSelect('form.category', 'category')
      .where('category.criterion IS NULL')
      .orWhere('category.criterion = :deptName', { deptName: options?.dept })
      .orWhere('category.criterion = :scholarName', { scholarName: options?.scholar })
      .orWhere('category.criterion = :dormDetail', { dormDetail: options?.dormDetail })
      .orderBy('form.updateDate', 'DESC')
      .limit(7)
      .getMany();
    return findMostView;
  }

  async findByName(name: string) {
    const findForm = await this.formRepository.find({
      where: {
        name: name
      }
    });
    return findForm;
  }

  async update(id: number, updateFormDto: UpdateFormDto) {
    const updateBook = await this.formRepository.update(id, updateFormDto);
    return updateBook;
  }

  async remove(id: number) {
    const removeForm = await this.findOne(id);
    await this.formRepository.delete(id);
    return { status: 'Success', deleted: removeForm };
  }
}
