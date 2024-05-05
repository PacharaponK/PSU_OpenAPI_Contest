import { Injectable } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { Member } from './entities/member.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MembersService {
  constructor(
    @InjectRepository(Member)
    private memberRepository: Repository<Member>,
  ) { }

  async create(createMemberDto: CreateMemberDto) {
    const createMember = this.memberRepository.create(createMemberDto);
    return await this.memberRepository.save(createMember);
  }

  async findByEmail(email: string): Promise<Member> {
    const findMember = await this.memberRepository.find({
      where: { email: email }
    });
    return findMember[0];
  }

  async delete(id: string) {
    return await this.memberRepository.delete(id);
  }
}
