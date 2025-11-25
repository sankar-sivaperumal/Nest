import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from '../student.entity';
import { StudentDto } from '../dto/student.dto';
@Injectable()
export class StudentsServices {
  constructor(
    @InjectRepository(Student)
    private stdrepo: Repository<Student>,
  ) {}

  create(createStudentDto: StudentDto) {
    const students = this.stdrepo.create(createStudentDto);
    return this.stdrepo.save(students);
  }

  
  findAll() {
    return this.stdrepo.find();
  }
}
