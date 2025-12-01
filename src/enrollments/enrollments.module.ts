import { Module } from '@nestjs/common';
import { EnrollmentsController } from './enrollments.controller';
import { EnrollmentsService } from './enrollments.service';
import { Enrollment } from './enrollments.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from 'src/students/student.entity';

@Module({

   imports: [
   
    TypeOrmModule.forFeature([Student,Enrollment])],

  controllers: [EnrollmentsController],
  providers: [EnrollmentsService],
  exports: [TypeOrmModule],
})
export class EnrollmentsModule {}
