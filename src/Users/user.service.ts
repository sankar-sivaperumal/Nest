import { Injectable } from '@nestjs/common';
import { userDto } from './user.dto';
import { StudentDto } from 'src/students/dto/student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from 'src/students/student.entity';
import { Enrollment } from 'src/enrollments/enrollments.entity';

 @Injectable()
export class UserService {
  constructor(
    @InjectRepository(Student)
  
    private userrepo: Repository<Student>,
      @InjectRepository(Enrollment) private epo: Repository<Enrollment>,
  ) {}


async createUser(input: userDto, files: Express.Multer.File[]) {
  const fileNames = files?.map(f => f.filename) ?? [];

  const student = this.userrepo.create({
    ...input,
    files: fileNames,
  });

  const savedStudent = await this.userrepo.save(student);

   if (input.marks) {
    const enrollment = this.epo.create({
      marks: input.marks,
      students: savedStudent 
    });

    await this.epo.save(enrollment);
  }


  return this.userrepo.findOne({
    where: { student_id: savedStudent.student_id },
    relations: ['enrollments']
  });
}
}
