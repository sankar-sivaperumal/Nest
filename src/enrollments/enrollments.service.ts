 import { Injectable, NotFoundException } from '@nestjs/common';
 import { Enrollment } from './enrollments.entity';
 import { InjectRepository } from '@nestjs/typeorm';
 import { Repository } from 'typeorm';
 import { Student } from '../students/student.entity';

 @Injectable()
 export class EnrollmentsService {
       constructor(
      @InjectRepository(Enrollment) private epo: Repository<Enrollment>,
      @InjectRepository(Student) private readonly repo: Repository<Student>,
   ) {}

    
    async create(enrollment: Partial<Enrollment>): Promise<Student> {
     const { students } = enrollment;
    
    return new  Student;
 
    }

   findAll() {
     return this.epo.find({ relations: ['students'] });
   }

   findOne(id: number) {
     return this.epo.findOne({ where: { enrollment_id: id }, relations: ['students'] });
   }

   update(id: number, patch: Partial<Enrollment>) {
     return this.epo.save({ ...patch, student_id: id });
   }

   remove(id: number) {
     return this.epo.delete({ enrollment_id: id });
   }
 }

