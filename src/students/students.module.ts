import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { Student } from './student.entity';
import { Course } from 'src/courses/courses.entity';
import { Enrollment } from 'src/enrollments/enrollments.entity';
import { stdservice } from './studentsform/newstudent.service';
import { stdcontroller } from './studentsform/newstudents.controller';
import { fileservice } from './uploads/file.service';
import { filecontroller } from './uploads/file.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Student,Enrollment,Course])],
  providers: [StudentsService,stdservice,fileservice],
  controllers: [StudentsController,stdcontroller,filecontroller],
  exports: [StudentsService],
})
  
export class StudentsModule {}
