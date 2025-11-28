import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from '../student.entity';
import { stddto } from './std.dto';

@Injectable()
export class stdservice {
  constructor(
    @InjectRepository(Student)
    private stdrepo: Repository<Student>,
  ) {}

  async create(createStudentDto: stddto, files?: Express.Multer.File[]) {
    const student = this.stdrepo.create({
      ...createStudentDto,
      files: files?.map(file => file.filename) || [],
    });
    return this.stdrepo.save(student);
  }

  findAll() {
    return this.stdrepo.find();
  }
}




