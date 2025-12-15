import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Enrollment } from 'src/enrollments/enrollments.entity';
import { Student } from 'src/students/student.entity';
import { Repository } from 'typeorm';
import { Course } from './courses.entity';
 @Injectable()
export class CoursesService {
    
    constructor(
      @InjectRepository(Course) private cro: Repository<Course>,
      @InjectRepository(Enrollment) private epo: Repository<Enrollment>,
      @InjectRepository(Student) private readonly repo: Repository<Student>,
   ) {}

   async create(course: Partial<Course>): Promise<Course> {
   
     const newCourse = this.cro.create(course);
     return this.cro.save(newCourse);
   }

 
   async findAll() {
     return this.cro.find({
       relations: ['enrollments', 'enrollments.students'],
     });
   }

  
   async findOne(id: number) {
     return this.cro.findOne({
       where: { course_id: id },
       relations: ['enrollments', 'enrollments.students'], 
     });
   }

   async update(id: number, patch: Partial<Course>) {
     return this.cro.save({ ...patch, course_id: id });
   }

   async remove(id: number) {
     return this.cro.delete({ course_id: id });
   }
}
