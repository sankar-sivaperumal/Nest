import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from '../student.entity';
import { stddto } from '../studentsform/std.dto';

@Injectable()
export class fileservice {
  constructor(
    @InjectRepository(Student)
    private stdrepo: Repository<Student>,
  ) {}

   async updateFiles(Id: number, files: Express.Multer.File[]) {
  const student = await this.stdrepo.findOne({ where: { student_id: Id } });
  if (!student) {
    throw new Error('Student not found');
  }
  // if (files && files.length > 0) {
  //   student.files = files.map(file => file.path);
  // }
  student.files = files.map(file => file.filename);
  console.log(files)
  return this.stdrepo.save(student);
}


  findAll() {
    return this.stdrepo.find();
  }
}




