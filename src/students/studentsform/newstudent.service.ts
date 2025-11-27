import { stddto } from './std.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from '../student.entity';



@Injectable()
export class stdservice {
  constructor(
    @InjectRepository(Student)
    private stdrepo: Repository<Student>,
  ) {}
  
  async create(createStudentDto: stddto) {
  const student = this.stdrepo.create(createStudentDto);
  return this.stdrepo.save(student);
}
findAll() {
    return this.stdrepo.find();
  }

}





