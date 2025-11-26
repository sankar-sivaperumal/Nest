import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { Student } from './student.entity';
import { Course } from 'src/courses/courses.entity';
import { Enrollment } from 'src/enrollments/enrollments.entity';
import { stdservice } from './students form/newstudent.service';
import { stdcontroller } from './students form/new students.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Student,Enrollment,Course])],
  providers: [StudentsService,stdservice],
  controllers: [StudentsController,stdcontroller],
  exports: [StudentsService],
})
  
export class StudentsModule {}
