/* import { Injectable } from '@nestjs/common';
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
 */

/* 
import { Injectable } from '@nestjs/common';
import { userDto } from './user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from 'src/students/student.entity';
import { Enrollment } from 'src/enrollments/enrollments.entity';
import { Course } from 'src/courses/courses.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Student) private userrepo: Repository<Student>,
    @InjectRepository(Enrollment) private epo: Repository<Enrollment>,
   @InjectRepository(Course) private cro:Repository<Course>,
  ) {}

  async createUser(input: userDto, files: Express.Multer.File[]) {
    const fileNames = files?.map(f => f.filename) ?? [];

  
    const student = this.userrepo.create({
      ...input,
      files: fileNames,
    });

    const savedStudent = await this.userrepo.save(student);

    
    const courseIds = Array.isArray(input.course_id) ? input.course_id : [input.course_id];
    
    
    const courses = await this.cro.findByIds(courseIds);

    console.log('Fetched Courses:', courses); 

   
    if (input.marks && courses.length > 0) {
      const enrollments = courses.map(course => {
        console.log('Creating Enrollment with course:', course); 
        return this.epo.create({
          marks: input.marks,  
          students: savedStudent,  
          courses: course,  
        });
      });

      
      await this.epo.save(enrollments);
      console.log('Saved Enrollments:', enrollments);
    }
    
    const studentWithEnrollments = await this.userrepo.findOne({
      where: { student_id: savedStudent.student_id },
      relations: ['enrollments', 'enrollments.courses'],  
    });

    return studentWithEnrollments;
  }
}
 */



import { Injectable } from '@nestjs/common';
import { userDto } from './user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from 'src/students/student.entity';
import { Enrollment } from 'src/enrollments/enrollments.entity';
import { Course } from 'src/courses/courses.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Student) private userrepo: Repository<Student>,
    @InjectRepository(Enrollment) private epo: Repository<Enrollment>,
    @InjectRepository(Course) private cro: Repository<Course>,
  ) {}

  async createUser(input: userDto, files: Express.Multer.File[]) {
    const fileNames = files?.map(f => f.filename) ?? [];

   
    const student = this.userrepo.create({
      ...input,
      files: fileNames,
    });

 
    const savedStudent = await this.userrepo.save(student);

   
    const courseIds = Array.isArray(input.course_id) ? input.course_id : [input.course_id];
    const courses = await this.cro.findByIds(courseIds);

    
    if (courses.length > 0 && input.marks) {
      const enrollments = courses.map(course => {
        return this.epo.create({
          marks: input.marks,
          students: savedStudent,
          courses: course,
        });
      });

      await this.epo.save(enrollments);
    }

  
    const studentWithEnrollments = await this.userrepo.findOne({
      where: { student_id: savedStudent.student_id },
      relations: ['enrollments', 'enrollments.courses'],
    });

    return studentWithEnrollments;
  }
}
