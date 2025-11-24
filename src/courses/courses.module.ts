import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Enrollment } from 'src/enrollments/enrollments.entity';
import { Student } from 'src/students/student.entity';
import { Course } from './courses.entity';

@Module({

imports: [
   
    TypeOrmModule.forFeature([Student,Enrollment,Course])],

  controllers: [CoursesController],
  providers: [CoursesService]
})
export class CoursesModule {}
