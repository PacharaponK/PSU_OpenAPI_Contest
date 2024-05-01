import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }
  async create(createUserDto: CreateUserDto) {
    console.log(createUserDto);
    
    const createUser = this.userRepository.create(createUserDto);
    return await this.userRepository.save(createUser);
  }

  async findAll() {
      const listUsers = await this.userRepository.find();
      return listUsers;
  }

  async findByStudentId(studentId: string) {
    const findByStudent = await this.userRepository.findOne({
      where: { studentId: studentId }
    });
    return findByStudent;
  }

  async findOne(id: number) {
    const findUser = await this.userRepository.findOne({
      where: { id: id }
    });
    return findUser
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const updateBook = await this.userRepository.update(id, updateUserDto);
    return updateBook;
  }

  async remove(id: number) {
    const removeUser = await this.findOne(id);
    await this.userRepository.delete(id);
    return { status: 'Success', deleted: removeUser };
  }
}
