import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { Student } from './student.entity';
import { Course } from 'src/courses/courses.entity';
import { Enrollment } from 'src/enrollments/enrollments.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Student,Enrollment,Course])],
  providers: [StudentsService],
  controllers: [StudentsController],
  exports: [StudentsService],
})
export class StudentsModule {}
