import { Injectable } from '@nestjs/common';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Feedback } from './entities/feedback.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FeedbacksService {
  constructor(
    @InjectRepository(Feedback)
    private feedbackRepository: Repository<Feedback>,
  ) { }
  async create(createFeedbackDto: CreateFeedbackDto) {
    const createFeedback = this.feedbackRepository.create(createFeedbackDto);
    return await this.feedbackRepository.save(createFeedback);;
  }

  async findAll() {
    return await this.feedbackRepository.find({ relations: ["user","form"] });
  }

  async findOne(id: number) {
    const findFeedback = await this.feedbackRepository.find({
      where: { id: id },
      relations: ["user","form"]
    });
    return findFeedback;
  }

  async update(id: number, updateFeedbackDto: UpdateFeedbackDto) {
    const updateCategory = await this.feedbackRepository.update(id, updateFeedbackDto);
    return updateCategory;
  }

  async remove(id: number) {
    const removeFeedback = await this.findOne(id);
    await this.feedbackRepository.delete(id);
    return { status: 'Success', deleted: removeFeedback };
  }
}
