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

  findAll() {
    const listAllForms = this.formRepository.find({relations: ['category']});
    return listAllForms;
  }

  findOne(id: number) {
    const specificForm = this.formRepository.findOne({
      where: { id: id },
    });
    return specificForm;
  }

  async update(id: number, updateFormDto: UpdateFormDto) {
    const updateBook = this.formRepository.update(id, updateFormDto);
    return updateBook;
  }

  async remove(id: number) {
    const removeForm = await this.findOne(id);
    await this.formRepository.delete(id);
    return { status: 'Success', deleted: removeForm };
  }
}
