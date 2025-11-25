import { Controller, Post, Body, UseInterceptors, UploadedFiles, UsePipes, ValidationPipe } from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { StudentsServices } from './newstudent.service';
import { StudentDto } from '../dto/student.dto';

@Controller('students')
export class StudentsControllers {
  constructor(private readonly studentsServices: StudentsServices) {}

  @Post()
  @UseInterceptors(AnyFilesInterceptor())
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  create(
    @Body() createStudentDto: StudentDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    console.log('Received DTO:', createStudentDto); 
    console.log('Received files:', files);         
    return this.studentsServices.create(createStudentDto);
  }
}
